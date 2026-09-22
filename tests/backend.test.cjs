const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const { createHmac } = require('node:crypto');

// Load the actual TS modules with isolated server dependencies, without touching
// a real database, sending email, or needing a running Next.js server.
function loader(overrides = {}) {
  const cache = new Map();
  const mocks = {
    'server-only': {},
    '@/lib/auth-env': { authSecret: 'test-only-secret-never-used-in-production' },
    '@/lib/supabase-env': { supabaseEnabled: false },
    ...overrides,
  };
  function load(id) {
    if (Object.hasOwn(mocks, id)) return mocks[id];
    if (!id.startsWith('@/')) return require(id);
    const file = path.resolve(id.slice(2) + '.ts');
    if (cache.has(file)) return cache.get(file).exports;
    const module = { exports: {} };
    cache.set(file, module);
    const { outputText } = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    });
    vm.runInThisContext(`(function(require,module,exports){${outputText}\n})`, { filename: file })(load, module, module.exports);
    return module.exports;
  }
  return load;
}

test('redirects allow local destinations and reject external or ambiguous URLs', () => {
  const { getSafeCallbackUrl, getSafeOriginPath } = loader()('@/lib/login-flow');
  for (const value of ['https://evil.test', '//evil.test', '/\\evil.test', '/\tevil.test', 'javascript:alert(1)', null, new File([], 'x')]) {
    assert.equal(getSafeCallbackUrl(value), '/dashboard');
    assert.equal(getSafeOriginPath(value), '/');
  }
  assert.equal(getSafeCallbackUrl('/create-card?cardId=new'), '/create-card?cardId=new');
});

test('email codes are signed, limited to five attempts, and single-use', async () => {
  const auth = loader()('@/lib/email-auth');
  const email = 'test@example.com';
  const pending = await auth.createPendingEmailCode(email);
  assert.equal((await auth.verifyPendingEmailCode(pending.cookieValue + '.extra', email, pending.code)).ok, false);
  assert.equal((await auth.verifyPendingEmailCode(pending.cookieValue, 'other@example.com', pending.code)).ok, false);
  assert.equal((await auth.verifyPendingEmailCode(pending.cookieValue, email, pending.code)).ok, true);
  assert.equal((await auth.verifyPendingEmailCode(pending.cookieValue, email, pending.code)).ok, false);
  const locked = await auth.createPendingEmailCode(email);
  for (let i = 0; i < 5; i++) assert.equal((await auth.verifyPendingEmailCode(locked.cookieValue, email, 'invalid')).ok, false);
  assert.equal((await auth.verifyPendingEmailCode(locked.cookieValue, email, locked.code)).ok, false);
});

test('login tokens reject replay, wrong email, and malformed expiry', async () => {
  const auth = loader()('@/lib/email-auth');
  const email = 'token@example.com';
  const token = await auth.createEmailLoginToken(email);
  assert.equal(await auth.verifyEmailLoginToken(token, 'wrong@example.com'), null);
  assert.equal((await auth.verifyEmailLoginToken(token, email)).email, email);
  assert.equal(await auth.verifyEmailLoginToken(token, email), null);
  const encoded = Buffer.from(JSON.stringify({ email, nonce: 'test', userId: 'test' })).toString('base64url');
  const signature = createHmac('sha256', 'test-only-secret-never-used-in-production').update(encoded).digest('base64url');
  assert.equal(await auth.verifyEmailLoginToken(`${encoded}.${signature}`, email), null);
});

test('concurrent requests cannot exceed a sign-in limit', async () => {
  const { consumeAuthLimit } = loader()('@/lib/auth-limits');
  const results = await Promise.all(Array.from({ length: 20 }, () => consumeAuthLimit('same-email', 3, 60)));
  assert.equal(results.filter(Boolean).length, 3);
});

function fakeDatabase() {
  const rows = new Map([['private-card', { id: 'private-card', profile_id: 'owner-b', name: 'Original' }]]);
  return { rows, client: { from() {
    let operation = 'read', input, filters = [];
    const query = {
      select() { return query; },
      eq(key, value) { filters.push([key, value]); return query; },
      update(value) { operation = 'update'; input = value; return query; },
      insert(value) { operation = 'insert'; input = value; return query; },
      delete() { operation = 'delete'; return query; },
      maybeSingle() { return Promise.resolve(execute()); },
      single() { return Promise.resolve(execute()); },
      then(resolve, reject) { return Promise.resolve(execute()).then(resolve, reject); },
    };
    function execute() {
      const row = [...rows.values()].find(r => filters.every(([key, value]) => r[key] === value));
      if (operation === 'insert') {
        if (rows.has(input.id)) return { error: { message: 'duplicate key' }, data: null };
        rows.set(input.id, input); return { data: input, error: null };
      }
      if (operation === 'update' && row) { Object.assign(row, input); }
      if (operation === 'delete' && row) rows.delete(row.id);
      return { data: row ?? null, error: null };
    }
    return query;
  } } };
}

test('service-role card writes cannot overwrite or delete another owner’s card', async () => {
  const db = fakeDatabase();
  const cards = loader({ '@/lib/supabase/server': { createSupabaseAdminClient: () => db.client } })('@/lib/supabase/workspace-cards');
  await assert.rejects(cards.upsertSupabaseWorkspaceCard({ id: 'private-card', profile_id: 'owner-a', name: 'Attacker' }));
  await cards.deleteSupabaseWorkspaceCard('private-card', 'owner-a');
  assert.equal(db.rows.get('private-card').name, 'Original');
  await cards.upsertSupabaseWorkspaceCard({ id: 'private-card', profile_id: 'owner-b', name: 'Updated' });
  assert.equal(db.rows.get('private-card').name, 'Updated');
  await cards.deleteSupabaseWorkspaceCard('private-card', 'owner-b');
  assert.equal(db.rows.has('private-card'), false);
});

const user = { id: 'test-user', email: 'test@example.com', name: 'Test User', isPreview: false };
const validCard = { name: 'Test User', email: user.email, title: 'Engineer', website: 'example.com', linkedin: '', phone: '', company: '', qrPreference: 'website', defaultTemplateId: 'classic' };
function workspaceMocks(cloud = false) {
  const jar = new Map();
  return { jar, mocks: {
    'next/headers': { cookies: async () => ({ get: key => jar.has(key) ? { value: jar.get(key) } : undefined, set: (key, value) => jar.set(key, value) }) },
    '@/lib/supabase-env': { supabaseEnabled: cloud },
    '@/lib/supabase/profiles': {},
    '@/lib/supabase/workspace-cards': {},
  } };
}

test('browser saves survive reload, enforce ownership, and reject an empty QR destination', async () => {
  const { mocks } = workspaceMocks();
  const workspace = loader(mocks)('@/lib/workspace-settings');
  const templates = loader()('@/lib/data').templates;
  const input = { ...validCard, defaultTemplateId: templates[0].id };
  await workspace.saveWorkspaceCardSnapshot(user, input);
  assert.equal((await workspace.getWorkspaceSettings(user)).profile.title, 'Engineer');
  assert.equal((await workspace.getWorkspaceSettings({ ...user, email: 'other@example.com' })).profile.title, '');
  await assert.rejects(workspace.saveWorkspaceCardSnapshot(user, { ...input, website: '' }), /QR destination/);
});

test('browser storage rejects oversized saves without replacing the previous cookie', async () => {
  const { mocks, jar } = workspaceMocks();
  const load = loader(mocks), workspace = load('@/lib/workspace-settings');
  const input = { ...validCard, defaultTemplateId: load('@/lib/data').templates[0].id };
  await workspace.saveWorkspaceCardSnapshot(user, input);
  for (let i = 0; i < 20; i++) {
    const before = jar.get('digicard-workspace-settings');
    try { await workspace.saveWorkspaceExtraCard(user, { ...input, id: `extra-${i}`, label: 'Another card' }); }
    catch (error) {
      assert.equal(error.code, 'storage-full');
      assert.equal(jar.get('digicard-workspace-settings'), before);
      return;
    }
  }
  assert.fail('Oversized cookie was accepted');
});

test('cloud read failures propagate instead of presenting an empty workspace', async () => {
  const { mocks } = workspaceMocks(true);
  mocks['@/lib/supabase/profiles'] = { getSupabaseProfileByUserId: async () => { throw Error('database unavailable'); } };
  await assert.rejects(loader(mocks)('@/lib/workspace-settings').getWorkspaceSettings(user), /database unavailable/);
});

test('cloud write failures leave the existing browser snapshot intact', async () => {
  const { mocks, jar } = workspaceMocks(true);
  mocks['@/lib/supabase/profiles'] = {
    getSupabaseProfileByUserId: async () => null,
    getSupabaseProfileByOwnerEmail: async () => null,
    upsertSupabaseProfile: async () => { throw Error('write unavailable'); },
  };
  const load = loader(mocks), workspace = load('@/lib/workspace-settings');
  await assert.rejects(workspace.saveWorkspaceCardSnapshot(user, { ...validCard, defaultTemplateId: load('@/lib/data').templates[0].id }), /write unavailable/);
  assert.equal(jar.size, 0);
});

test('local preview never calls the cloud even when it is configured', async () => {
  const { mocks } = workspaceMocks(true);
  // Missing database methods would throw if preview accidentally accessed them.
  const load = loader(mocks), workspace = load('@/lib/workspace-settings');
  const preview = { ...user, isPreview: true };
  const result = await workspace.saveWorkspaceCardSnapshot(preview, { ...validCard, defaultTemplateId: load('@/lib/data').templates[0].id });
  assert.equal(result.storageStatus, 'browser');
  assert.equal((await workspace.getWorkspaceSettings(preview)).profile.title, 'Engineer');
});

test('parallel code submissions allow only one successful verification', async () => {
  const auth = loader()('@/lib/email-auth');
  const pending = await auth.createPendingEmailCode(user.email);
  const results = await Promise.all(Array.from({ length: 4 }, () => auth.verifyPendingEmailCode(pending.cookieValue, user.email, pending.code)));
  assert.equal(results.filter(result => result.ok).length, 1);
});
