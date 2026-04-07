export type NavItem = {
  label: string;
  href: string;
};

export type DigiCardTemplate = {
  id: string;
  name: string;
  description: string;
  accent: string;
  tone: string;
};

export type DigiCard = {
  id: number;
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  linkedin: string;
  website: string;
  template: string;
  color: string;
};

export const navigationItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "My Cards", href: "/cards" },
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
  },
  {
    id: "studio",
    name: "Studio Ivory",
    description: "A softer editorial layout for creative professionals and consultants.",
    accent: "from-stone-800 to-stone-500",
    tone: "bg-stone-100",
  },
  {
    id: "blueprint",
    name: "Blueprint",
    description: "Balanced modern styling with a calm accent and clear information layout.",
    accent: "from-blue-700 to-cyan-500",
    tone: "bg-blue-50",
  },
  {
    id: "signal",
    name: "Signal Mono",
    description: "Monochrome and understated for product, operations, and technical teams.",
    accent: "from-zinc-950 to-zinc-700",
    tone: "bg-zinc-100",
  },
  {
    id: "crest",
    name: "Crest",
    description: "Neutral, spacious, and suited for professional service firms.",
    accent: "from-slate-800 to-slate-500",
    tone: "bg-slate-50",
  },
  {
    id: "horizon",
    name: "Horizon",
    description: "A brighter option with controlled color for modern startup teams.",
    accent: "from-indigo-700 to-sky-500",
    tone: "bg-indigo-50",
  },
];
