export type NavItem = {
  label: string;
  href: string;
};

export type TemplateCategory = "corporate" | "creative" | "bold" | "minimal";

export type DigiCardTemplate = {
  id: string;
  name: string;
  description: string;
  accent: string;
  tone: string;
  category: TemplateCategory;
};

export type CardQrPreference = "auto" | "linkedin" | "website";

export type DigiCard = {
  id: string;
  label?: string;
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  linkedin: string;
  website: string;
  template: string;
  color: string;
  qrPreference?: CardQrPreference;
};

export const navigationItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "My Card", href: "/cards" },
  { label: "Templates", href: "/templates" },
  { label: "Settings", href: "/settings" },
];

export const featureItems = [
  {
    title: "QR code sharing",
    description:
      "Share a professional card in seconds with a QR code that works across phones, tablets, and desktops.",
  },
  {
    title: "Flexible templates",
    description:
      "Start from restrained templates that suit consulting, sales, recruiting, and client-facing teams.",
  },
  {
    title: "Instant updates",
    description:
      "Update one profile and keep every shared card current without reprinting or sending a new link.",
  },
];

export const templates: DigiCardTemplate[] = [
  {
    id: "executive",
    name: "Executive Slate",
    description: "Clean and structured for teams that want a formal, polished look.",
    accent: "from-slate-900 to-slate-700",
    tone: "bg-slate-100",
    category: "corporate",
  },
  {
    id: "studio",
    name: "Studio Ivory",
    description: "A softer editorial layout for creative professionals and consultants.",
    accent: "from-stone-800 to-stone-500",
    tone: "bg-stone-100",
    category: "creative",
  },
  {
    id: "blueprint",
    name: "Blueprint",
    description: "Balanced modern styling with a calm accent and clear information layout.",
    accent: "from-blue-700 to-cyan-500",
    tone: "bg-blue-50",
    category: "corporate",
  },
  {
    id: "signal",
    name: "Signal Mono",
    description: "Monochrome and understated for product, operations, and technical teams.",
    accent: "from-zinc-950 to-zinc-700",
    tone: "bg-zinc-100",
    category: "minimal",
  },
  {
    id: "crest",
    name: "Crest",
    description: "Neutral, spacious, and suited for professional service firms.",
    accent: "from-slate-800 to-slate-500",
    tone: "bg-slate-50",
    category: "minimal",
  },
  {
    id: "horizon",
    name: "Horizon",
    description: "A brighter option with controlled color for modern startup teams.",
    accent: "from-indigo-700 to-sky-500",
    tone: "bg-indigo-50",
    category: "creative",
  },
  {
    id: "ember",
    name: "Ember",
    description: "Warm and energetic for bold personalities, sales, and go-getters.",
    accent: "from-amber-600 to-orange-400",
    tone: "bg-amber-50",
    category: "bold",
  },
  {
    id: "forest",
    name: "Forest",
    description: "Deep and grounded for sustainability, consulting, and outdoor brands.",
    accent: "from-emerald-900 to-teal-600",
    tone: "bg-emerald-50",
    category: "corporate",
  },
  {
    id: "obsidian",
    name: "Obsidian",
    description: "Rich and dramatic for luxury, fintech, and premium-positioned teams.",
    accent: "from-violet-900 to-purple-600",
    tone: "bg-violet-50",
    category: "bold",
  },
  {
    id: "dawn",
    name: "Dawn",
    description: "Soft and expressive for lifestyle, wellness, and design-forward teams.",
    accent: "from-pink-500 to-purple-400",
    tone: "bg-pink-50",
    category: "creative",
  },
  {
    id: "classic",
    name: "Classic Night",
    description: "Your original dark DigiCard look with crisp dividers and a centered QR finish.",
    accent: "from-[#111827] via-[#0f172a] to-[#050814]",
    tone: "bg-slate-100",
    category: "corporate",
  },
];
