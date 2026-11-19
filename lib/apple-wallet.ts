import crypto from "node:crypto";
import zlib from "node:zlib";
import * as forge from "node-forge";
import JSZip from "jszip";
import { getAbsoluteUrl } from "@/lib/site-config";

export type AppleWalletCardData = {
  serialNumber: string;
  name: string;
  title: string;
  company?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  website?: string;
};

type AppleWalletConfig = {
  passTypeIdentifier: string;
  teamIdentifier: string;
  signerCertPem: string;
  signerKeyPem: string;
  wwdrPem: string;
  signerKeyPassphrase?: string;
};

function getAppleWalletConfig(): AppleWalletConfig | null {
  const passTypeIdentifier = process.env.APPLE_PASS_TYPE_IDENTIFIER;
  const teamIdentifier = process.env.APPLE_TEAM_IDENTIFIER;
  const signerCertPem = process.env.APPLE_PASS_CERT_PEM;
  const signerKeyPem = process.env.APPLE_PASS_KEY_PEM;
  const wwdrPem = process.env.APPLE_WWDR_PEM;

  if (!passTypeIdentifier || !teamIdentifier || !signerCertPem || !signerKeyPem || !wwdrPem) {
    return null;
  }

  return {
    passTypeIdentifier,
    teamIdentifier,
    // Allow newlines encoded as \n in env vars
    signerCertPem: signerCertPem.replace(/\\n/g, "\n"),
    signerKeyPem: signerKeyPem.replace(/\\n/g, "\n"),
    wwdrPem: wwdrPem.replace(/\\n/g, "\n"),
    signerKeyPassphrase: process.env.APPLE_PASS_KEY_PASSPHRASE,
  };
}

export function isAppleWalletConfigured(): boolean {
  return getAppleWalletConfig() !== null;
}

// CRC32 table lookup for PNG chunk checksums
function crc32(buf: Buffer): number {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) {
      c = c & 1 ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c;
  }
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = (table[(crc ^ (buf[i] ?? 0)) & 0xff]! ^ (crc >>> 8)) >>> 0;
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function createPngChunk(type: string, data: Buffer): Buffer {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuffer = Buffer.from(type, "ascii");
  const crcInput = Buffer.concat([typeBuffer, data]);
  const crcValue = Buffer.alloc(4);
  crcValue.writeUInt32BE(crc32(crcInput), 0);
  return Buffer.concat([len, typeBuffer, data, crcValue]);
}

// Generates a solid-color RGB PNG at the given size with no external deps
function createSolidRgbPng(size: number, r: number, g: number, b: number): Buffer {
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // 8-bit depth
  ihdr[9] = 2; // RGB color type

  const rowSize = size * 3;
  const rawData = Buffer.alloc((rowSize + 1) * size);
  for (let y = 0; y < size; y++) {
    rawData[y * (rowSize + 1)] = 0; // filter: None
    for (let x = 0; x < size; x++) {
      const o = y * (rowSize + 1) + 1 + x * 3;
      rawData[o] = r;
      rawData[o + 1] = g;
      rawData[o + 2] = b;
    }
  }

  return Buffer.concat([
    signature,
    createPngChunk("IHDR", ihdr),
    createPngChunk("IDAT", zlib.deflateSync(rawData)),
    createPngChunk("IEND", Buffer.alloc(0)),
  ]);
}

function buildPassJson(card: AppleWalletCardData, config: AppleWalletConfig): object {
  const backFields: object[] = [];
  if (card.email) {
    backFields.push({ key: "email", label: "Email", value: card.email, textAlignment: "PKTextAlignmentLeft" });
  }
  if (card.phone) {
    backFields.push({ key: "phone", label: "Phone", value: card.phone, textAlignment: "PKTextAlignmentLeft" });
  }
  if (card.website) {
    backFields.push({ key: "website", label: "Website", value: card.website, textAlignment: "PKTextAlignmentLeft" });
  }
  if (card.linkedin) {
    backFields.push({ key: "linkedin", label: "LinkedIn", value: card.linkedin, textAlignment: "PKTextAlignmentLeft" });
  }
  backFields.push({ key: "powered", label: "Powered by", value: `DigiCard · ${getAbsoluteUrl("/")}`, textAlignment: "PKTextAlignmentLeft" });

  const secondaryFields: object[] = [];
  if (card.title) {
    secondaryFields.push({ key: "title", label: "Title", value: card.title });
  }

  const auxiliaryFields: object[] = [];
  if (card.company) {
    auxiliaryFields.push({ key: "company", label: "Company", value: card.company });
  }

  return {
    formatVersion: 1,
    passTypeIdentifier: config.passTypeIdentifier,
    serialNumber: card.serialNumber,
    teamIdentifier: config.teamIdentifier,
    organizationName: "DigiCard",
    description: `${card.name}'s DigiCard`,
    generic: {
      primaryFields: [{ key: "name", label: "Name", value: card.name }],
      secondaryFields,
      auxiliaryFields,
      backFields,
    },
    // DigiCard brand blue: #5267d9
    backgroundColor: "rgb(82, 103, 217)",
    foregroundColor: "rgb(255, 255, 255)",
    labelColor: "rgb(200, 210, 255)",
  };
}

function signManifest(manifestJson: string, config: AppleWalletConfig): Buffer {
  const signerCert = forge.pki.certificateFromPem(config.signerCertPem);

  let signerKey: forge.pki.rsa.PrivateKey;
  if (config.signerKeyPassphrase) {
    const decrypted = forge.pki.decryptRsaPrivateKey(config.signerKeyPem, config.signerKeyPassphrase);
    if (!decrypted) throw new Error("Failed to decrypt Apple Wallet private key");
    signerKey = decrypted as forge.pki.rsa.PrivateKey;
  } else {
    signerKey = forge.pki.privateKeyFromPem(config.signerKeyPem) as forge.pki.rsa.PrivateKey;
  }

  const wwdrCert = forge.pki.certificateFromPem(config.wwdrPem);

  const p7 = forge.pkcs7.createSignedData();
  p7.content = forge.util.createBuffer(manifestJson, "utf8");
  p7.addCertificate(wwdrCert);
  p7.addCertificate(signerCert);
  p7.addSigner({
    key: signerKey,
    certificate: signerCert,
    digestAlgorithm: forge.pki.oids.sha1,
    authenticatedAttributes: [
      { type: forge.pki.oids.contentType, value: forge.pki.oids.data },
      { type: forge.pki.oids.messageDigest },
      { type: forge.pki.oids.signingTime, value: new Date().toISOString() },
    ],
  });
  p7.sign({ detached: true });

  const der = forge.asn1.toDer(p7.toAsn1()).getBytes();
  return Buffer.from(der, "binary");
}

type PassResult =
  | { buffer: Buffer; error?: never }
  | { buffer?: never; error: string };

export async function generateAppleWalletPass(card: AppleWalletCardData): Promise<PassResult> {
  const config = getAppleWalletConfig();
  if (!config) {
    return {
      error:
        "Apple Wallet is not configured. Set APPLE_PASS_TYPE_IDENTIFIER, APPLE_TEAM_IDENTIFIER, " +
        "APPLE_PASS_CERT_PEM, APPLE_PASS_KEY_PEM, and APPLE_WWDR_PEM environment variables.",
    };
  }

  try {
    // Brand color #5267d9 → rgb(82, 103, 217)
    const icon1x = createSolidRgbPng(29, 82, 103, 217);
    const icon2x = createSolidRgbPng(58, 82, 103, 217);
    const logo1x = createSolidRgbPng(80, 82, 103, 217);
    const logo2x = createSolidRgbPng(160, 82, 103, 217);

    const passJsonStr = JSON.stringify(buildPassJson(card, config), null, 2);

    const files: Record<string, Buffer | string> = {
      "pass.json": passJsonStr,
      "icon.png": icon1x,
      "icon@2x.png": icon2x,
      "logo.png": logo1x,
      "logo@2x.png": logo2x,
    };

    // Build manifest: SHA1 of each file
    const manifest: Record<string, string> = {};
    for (const [filename, content] of Object.entries(files)) {
      const data = typeof content === "string" ? Buffer.from(content, "utf8") : content;
      manifest[filename] = crypto.createHash("sha1").update(data).digest("hex");
    }
    const manifestJson = JSON.stringify(manifest);

    const signature = signManifest(manifestJson, config);

    const zip = new JSZip();
    for (const [filename, content] of Object.entries(files)) {
      zip.file(filename, content);
    }
    zip.file("manifest.json", manifestJson);
    zip.file("signature", signature);

    const buffer = await zip.generateAsync({ type: "nodebuffer", compression: "STORE" });
    return { buffer };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Unknown error generating pass" };
  }
}
