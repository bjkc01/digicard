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
  { label: "My Cards", href: "/dashboard#cards" },
  { label: "Templates", href: "/templates" },
  { label: "Settings", href: "/dashboard#settings" },
];

export const featureItems = [
  {
    title: "QR code sharing",
    description:
      "Make in-person networking effortless with instant scans that open your professional card on any device.",
  },
  {
    title: "Polished templates",
    description:
      "Start from refined layouts designed for consultants, founders, recruiters, and modern teams.",
  },
  {
    title: "Instant updates",
    description:
      "Keep your contact details current across every share link without reprinting or resending.",
  },
];

export const templates: DigiCardTemplate[] = [
  {
    id: "executive",
    name: "Executive Slate",
    description: "Minimal contrast with a crisp professional hierarchy.",
    accent: "from-slate-900 to-slate-700",
    tone: "bg-slate-100",
  },
  {
    id: "studio",
    name: "Studio Ivory",
    description: "Editorial spacing with a warm, creative finish.",
    accent: "from-stone-800 to-stone-500",
    tone: "bg-stone-100",
  },
  {
    id: "blueprint",
    name: "Blueprint",
    description: "A refined SaaS-inspired card with a vivid accent edge.",
    accent: "from-blue-700 to-cyan-500",
    tone: "bg-blue-50",
  },
  {
    id: "signal",
    name: "Signal Mono",
    description: "Sharp monochrome styling for product and tech teams.",
    accent: "from-zinc-950 to-zinc-700",
    tone: "bg-zinc-100",
  },
  {
    id: "crest",
    name: "Crest",
    description: "Elegant spacing with calm neutrals and subtle depth.",
    accent: "from-slate-800 to-slate-500",
    tone: "bg-slate-50",
  },
  {
    id: "horizon",
    name: "Horizon",
    description: "Bright premium gradients tailored for modern operators.",
    accent: "from-indigo-700 to-sky-500",
    tone: "bg-indigo-50",
  },
];

export const cards: DigiCard[] = [
  {
    id: 1,
    name: "Avery Morgan",
    title: "Head of Partnerships",
    company: "Northstar Labs",
    email: "avery@northstarlabs.co",
    phone: "+1 (415) 555-0128",
    linkedin: "linkedin.com/in/averymorgan",
    website: "northstarlabs.co",
    template: "Executive Slate",
    color: "from-slate-900 to-slate-700",
  },
  {
    id: 2,
    name: "Mina Patel",
    title: "Product Designer",
    company: "Canvas House",
    email: "mina@canvashouse.com",
    phone: "+1 (646) 555-0162",
    linkedin: "linkedin.com/in/minapatel",
    website: "canvashouse.com",
    template: "Studio Ivory",
    color: "from-stone-900 to-stone-600",
  },
  {
    id: 3,
    name: "Jordan Lee",
    title: "Revenue Operations Lead",
    company: "SignalFlow",
    email: "jordan@signalflow.io",
    phone: "+1 (917) 555-0104",
    linkedin: "linkedin.com/in/jordanlee",
    website: "signalflow.io",
    template: "Blueprint",
    color: "from-blue-700 to-cyan-500",
  },
];

export const formDefaults = {
  name: "Sofia Bennett",
  title: "Founder & Growth Advisor",
  company: "DigiCard",
  email: "sofia@digicard.app",
  phone: "+1 (212) 555-0147",
  linkedin: "linkedin.com/in/sofiabennett",
  website: "digicard.app",
};
