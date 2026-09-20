// src/lib/content.js
import strategy from "@/assets/hero-strategy.webp";
import social from "@/assets/hero-social.webp";
import w2 from "@/assets/work-2.webp";
import w3 from "@/assets/work-3.webp";

function loadFolderGallery(globRecord, prefix) {
  return Object.entries(globRecord)
    .sort(([pathA], [pathB]) => {
      const numA = parseInt(pathA.match(/(\d+)(?=\.[a-zA-Z]+$)/)?.[1] || "0", 10);
      const numB = parseInt(pathB.match(/(\d+)(?=\.[a-zA-Z]+$)/)?.[1] || "0", 10);
      if (numA !== numB) return numA - numB;
      return pathA.localeCompare(pathB, undefined, { numeric: true });
    })
    .map(([_, src], index) => ({
      id: `${prefix}-${index + 1}`,
      src,
    }));
}

// ─── 1. Branding Folders ───
const sadanahImages = loadFolderGallery(
  import.meta.glob("@/assets/Branding/Sadanah/*.{jpg,png,webp,jpeg}", { eager: true, import: "default" }),
  "sadanah"
);
const brandingCard1 = loadFolderGallery(
  import.meta.glob("@/assets/Branding/Branding/card-1/*.{jpg,png,webp,jpeg}", { eager: true, import: "default" }),
  "myherb"
);
const brandingCard2 = loadFolderGallery(
  import.meta.glob("@/assets/Branding/Branding/card-2/*.{jpg,png,webp,jpeg}", { eager: true, import: "default" }),
  "novo"
);
const brandingCard3 = loadFolderGallery(
  import.meta.glob("@/assets/Branding/Branding/card-3/*.{jpg,png,webp,jpeg}", { eager: true, import: "default" }),
  "ippo"
);
const brandingCard4 = loadFolderGallery(
  import.meta.glob("@/assets/Branding/Branding/card-4/*.{jpg,png,webp,jpeg}", { eager: true, import: "default" }),
  "seven-territory"
);

// ─── 2. Social Media Folders ───
const socialCard5 = loadFolderGallery(
  import.meta.glob("@/assets/Social Media/Social Media/card-5/*.{jpg,png,webp,jpeg}", { eager: true, import: "default" }),
  "khususi"
);
const socialCard6 = loadFolderGallery(
  import.meta.glob("@/assets/Social Media/Social Media/card-6/*.{jpg,png,webp,jpeg}", { eager: true, import: "default" }),
  "kedaelshamal"
);
const socialCard7 = loadFolderGallery(
  import.meta.glob("@/assets/Social Media/Social Media/card-7/*.{jpg,png,webp,jpeg}", { eager: true, import: "default" }),
  "traventure"
);
const socialCard8 = loadFolderGallery(
  import.meta.glob("@/assets/Social Media/Social Media/card-8/*.{jpg,png,webp,jpeg}", { eager: true, import: "default" }),
  "pandahost"
);

// ─── 3. Profile Folders ───
const profileCard9 = loadFolderGallery(
  import.meta.glob("@/assets/Profile/Profile/card-9/*.{jpg,png,webp,jpeg}", { eager: true, import: "default" }),
  "qita"
);
const profileCard10 = loadFolderGallery(
  import.meta.glob("@/assets/Profile/Profile/card-10/*.{jpg,png,webp,jpeg}", { eager: true, import: "default" }),
  "akwan"
);
const profileCard11 = loadFolderGallery(
  import.meta.glob("@/assets/Profile/Profile/card-11/*.{jpg,png,webp,jpeg}", { eager: true, import: "default" }),
  "qudrah"
);
const profileCard12 = loadFolderGallery(
  import.meta.glob("@/assets/Profile/Profile/card-12/*.{jpg,png,webp,jpeg}", { eager: true, import: "default" }),
  "elitestones"
);

export const PORTFOLIO = [
  // ─── قسم الهوية التجارية ───
  {
    id: 1,
    key: "sadanah",
    category: "Branding",
    image: sadanahImages[0]?.src,
    gallery: sadanahImages,
  },
  {
    id: 2,
    key: "myHerb",
    category: "Branding",
    image: brandingCard1[0]?.src,
    gallery: brandingCard1,
  },
  {
    id: 3,
    key: "novo",
    category: "Branding",
    image: brandingCard2[0]?.src,
    gallery: brandingCard2,
  },
  {
    id: 4,
    key: "ippo",
    category: "Branding",
    image: brandingCard3[0]?.src,
    gallery: brandingCard3,
  },
  {
    id: 5,
    key: "sevenTerritory",
    category: "Branding",
    image: brandingCard4[0]?.src,
    gallery: brandingCard4,
  },

  // ─── قسم السوشيال ميديا ───
  {
    id: 6,
    key: "khususiTeacher",
    category: "Social Media",
    image: socialCard5[0]?.src,
    gallery: socialCard5,
  },
  {
    id: 7,
    key: "kedaElShamal",
    category: "Social Media",
    image: socialCard6[0]?.src,
    gallery: socialCard6,
  },
  {
    id: 8,
    key: "traventure",
    category: "Social Media",
    image: socialCard7[0]?.src,
    gallery: socialCard7,
  },
  {
    id: 9,
    key: "pandaHost",
    category: "Social Media",
    image: socialCard8[0]?.src,
    gallery: socialCard8,
  },

  // ─── قسم بروفايلات الشركات ───
  {
    id: 10,
    key: "qitaProfile",
    category: "Company Profiles",
    image: profileCard9[0]?.src,
    gallery: profileCard9,
  },
  {
    id: 11,
    key: "akwanProfile",
    category: "Company Profiles",
    image: profileCard10[0]?.src,
    gallery: profileCard10,
  },
  {
    id: 12,
    key: "qudrahProfile",
    category: "Company Profiles",
    image: profileCard11[0]?.src,
    gallery: profileCard11,
  },
  {
    id: 13,
    key: "eliteStonesProfile",
    category: "Company Profiles",
    image: profileCard12[0]?.src,
    gallery: profileCard12,
  },
];

export const PORTFOLIO_CATEGORIES = [
  "All",
  "Branding",
  "Social Media",
  "Company Profiles",
];

export const HERO_SLIDES = [
  {
    id: "strategy",
    eyebrow: "01 — Strategy",
    title: "Integrated System for\nMarketing & Growth",
    desc: "We build a core services reference from market analysis to conversion paths.",
    image: strategy,
  },
  {
    id: "social",
    eyebrow: "02 — Social",
    title: "We Design Brands\nThat Stand Out",
    desc: "Branding · Content Strategy · Meta Ads · Company Profiles",
    image: social,
  },
];

export const SERVICES = [
  {
    slug: "brand-identity",
    title: "Brand Identity & Positioning",
    short: "Logo, guidelines & full visual system.",
    icon: "Sparkles",
    long: "Clear positioning statement development, core messaging, suitable tone of voice, and turning features into customer-relevant benefits without exaggeration.",
  },
  {
    slug: "company-profile",
    title: "Company Profile Design",
    short: "Custom profile with professional descriptions.",
    icon: "FileText",
    long: "Professional description of delivered services, writing simplified case studies, and turning previous work into a sales tool to build trust quickly.",
  },
  {
    slug: "social-media-design",
    title: "Social Media Design",
    short: "Impactful posts, stories & dynamic highlights.",
    icon: "Image",
    long: "Bio and CTA optimization, highlight organization, and content scheduling to turn the profile into a trust-building environment for new visitors.",
  },
  {
    slug: "content-strategy",
    title: "Content & Creative Strategy",
    short: "Content pillars, hook generation & video scripting.",
    icon: "PenLine",
    long: "Separation between educational and sales content based on customer stages, writing captions, strong hook development, and video script writing.",
  },
  {
    slug: "media-buying",
    title: "Meta Ads & Performance",
    short: "Complete campaign management & optimization.",
    icon: "Target",
    long: "Management of Awareness, Traffic, Messages, and Leads campaigns. Custom audience setup and optimization based on data to turn spend into growth.",
  },
  {
    slug: "sales-communication",
    title: "WhatsApp & Sales Support",
    short: "Qualification flows & reply alignment.",
    icon: "MessageCircle",
    long: "Professional welcome message writing, short qualification flows, and reply development for common objections to reduce lost customers from slow replies.",
  },
  {
    slug: "customer-journey",
    title: "Customer Journey & Conversion",
    short: "Landing paths & conversion optimization.",
    icon: "Code",
    long: "Mapping paths from first exposure to inquiry. Landing path recommendations and qualification improvements to increase the chance of turning interest into sales.",
  },
  {
    slug: "business-development",
    title: "Business Development & Growth",
    short: "Service packages & commercial optimization.",
    icon: "Compass",
    long: "Service and package presentation development, commercial messaging improvement, and aligning marketing with your real business objectives.",
  },
];

export const STATS = [
  { value: 14, suffix: "+", label: "Core services built" },
  { value: 23, suffix: "x", label: "Avg. ROAS uplift" },
  { value: 13.7, suffix: "M+", label: "Trackable Sales (SAR)" },
  { value: 8, suffix: "+yrs", label: "Team Experience" },
];

export const TESTIMONIALS = [
  {
    name: "Mohammed Alfi",
    role: "Founder, Belt & Road Trading",
    quote: "Ego Studio turned our business data into a strong, persuasive system. Their professional profile development completely elevated our corporate presence.",
  },
  {
    name: "Nibras Team",
    role: "Management, Nibras 360",
    quote: "The brand communication is incredibly distinct. They took our visual identity and built a precise, cohesive framework that makes our business easier to remember.",
  },
  {
    name: "Panda Host Admin",
    role: "Growth Lead, Panda Host",
    quote: "Our paid ad campaigns transformed from random spending into a reliable learning system. Lead quality improved dramatically within the first period.",
  },
];

export const PROCESS = [
  {
    step: "01",
    title: "Analyze",
    desc: "We analyze the business model, the market, the target priority audience segments, and competitor gaps.",
  },
  {
    step: "02",
    title: "Define",
    desc: "We define the positioning statement, core messaging matrix, and a clear campaign logic path.",
  },
  {
    step: "03",
    title: "Build",
    desc: "We build tailored content systems, professional creative direction, ads structure, and conversion paths.",
  },
  {
    step: "04",
    title: "Optimize",
    desc: "We execute with structure, review performance data indicators, and deliver ongoing optimizations to turn spend into growth.",
  },
];

export const FAQ = [
  {
    q: "Is Ego Studio just a social media execution agency?",
    a: "No. Ego Studio is a growth partner. We don't just execute standalone posts or ads; we build an integrated system where content, advertising, and communication work together to drive sales.",
  },
  {
    q: "When does a business need your strategy services?",
    a: "When launching a new service, entering a new priority segment or city, or when you are running campaigns but suffering from weak result quality or customer confusion.",
  },
  {
    q: "How do you measure campaign performance?",
    a: "We do not chase surface-level superficial numbers. We analyze lead quality, conversion closing rates, cost per result, and direct commercial sales opportunities.",
  },
  {
    q: "Do you provide customized packages?",
    a: "Yes. Our services can be delivered as standalone specialized page projects or as a fully integrated ongoing growth system, depending completely on your business stage and goals.",
  },
];

export const BLOG_POSTS = [
  {
    slug: "integrated-marketing-systems",
    title: "Why standalone posts fail to grow your business",
    date: "May 18, 2026",
    category: "Strategy",
    image: strategy,
    excerpt: "Discover how connecting content pillars, ad messaging, and sales paths turns marketing from a random reaction into a scalable acquisition machine.",
  },
  {
    slug: "optimizing-sales-communication",
    title: "How slow sales replies are quietly burning your ad budget",
    date: "Apr 29, 2026",
    category: "Sales Support",
    image: social,
    excerpt: "Stop wasting money on traffic. Learn the exact welcome flows, qualification frameworks, and common objection templates to protect your lead quality.",
  },
];