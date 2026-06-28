import strategy from "@/assets/hero-strategy.jpg";
import social from "@/assets/hero-social.jpg";
import w1 from "@/assets/work-1.jpg";
import w2 from "@/assets/work-2.jpg";
import w3 from "@/assets/work-3.jpg";
import w4 from "@/assets/work-4.jpg";
import w5 from "@/assets/work-5.jpg";
import w6 from "@/assets/work-6.jpg";

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

export const PORTFOLIO = [
  {
    id: 1, title: "Nibras 360 Visual Identity", category: "Branding", image: w1,
    client: "Nibras 360", year: "2024",
    description: "A complete visual identity system built from the ground up — logo, color palette, typography, and brand guidelines that communicate precision and trust across all touchpoints.",
    services: ["Brand Strategy", "Logo Design", "Visual Identity System", "Brand Guidelines"],
    results: [
      { label: "Brand consistency", value: "100%" },
      { label: "Assets delivered", value: "40+" },
      { label: "Turnaround", value: "3 weeks" },
    ],
  },
  {
    id: 2, title: "Nurture Nature's Touch", category: "Identity Guide", image: w2,
    client: "Nurture Nature", year: "2024",
    description: "A comprehensive identity guide that documented every aspect of the brand — voice, tone, visual rules, and usage standards to ensure consistency across all team members and channels.",
    services: ["Identity Guidelines", "Brand Voice", "Typography System", "Color Usage Rules"],
    results: [
      { label: "Pages delivered", value: "28" },
      { label: "Brand elements", value: "60+" },
      { label: "Team adoption", value: "Full" },
    ],
  },
  {
    id: 3, title: "Ippo Child Foot Branding", category: "Branding", image: w3,
    client: "Ippo", year: "2023",
    description: "A playful yet professional branding system for a children's footwear brand — crafted to appeal to both parents and kids while building strong shelf and digital presence.",
    services: ["Brand Identity", "Packaging Direction", "Social Media Visual Style", "Brand Story"],
    results: [
      { label: "Market reception", value: "Positive" },
      { label: "SKUs branded", value: "12+" },
      { label: "Launch timeline", value: "4 weeks" },
    ],
  },
  {
    id: 4, title: "PACKGO Social Campaign", category: "Social Media", image: w4,
    client: "PACKGO", year: "2024",
    description: "A structured social media campaign designed to build awareness, drive engagement, and convert followers into paying customers — combining content pillars with a clear posting strategy.",
    services: ["Content Strategy", "Caption Writing", "Creative Direction", "Campaign Planning"],
    results: [
      { label: "Engagement rate", value: "+180%" },
      { label: "Posts delivered", value: "60/mo" },
      { label: "Follower growth", value: "+3,200" },
    ],
  },
  {
    id: 5, title: "Aqua Cool Paid Ads", category: "Paid Ads", image: w5,
    client: "Aqua Cool", year: "2024",
    description: "A full Meta ads system built from scratch — from campaign architecture and audience segmentation to creative testing and ongoing optimization that turned ad spend into measurable monthly revenue.",
    services: ["Meta Ads Management", "Campaign Structure", "Audience Targeting", "Performance Optimization"],
    results: [
      { label: "ROAS achieved", value: "14x" },
      { label: "Monthly sales", value: "170K+ SAR" },
      { label: "Growth period", value: "3 months" },
    ],
  },
  {
    id: 6, title: "Belt & Road Company Profile", category: "Company Profiles", image: w6,
    client: "Belt & Road Trading", year: "2023",
    description: "A professional company profile that transformed raw business data into a persuasive sales document — designed to open doors with corporate clients and communicate credibility at first glance.",
    services: ["Copywriting", "Profile Design Direction", "Case Study Writing", "Service Presentation"],
    results: [
      { label: "Pages designed", value: "24" },
      { label: "Client feedback", value: "Excellent" },
      { label: "Deals influenced", value: "3 major" },
    ],
  },
];

export const PORTFOLIO_CATEGORIES = [
  "All",
  "Branding",
  "Identity Guide",
  "Social Media",
  "Paid Ads",
  "Company Profiles",
];

export const STATS = [
  { value: 14, suffix: "+", label: "Core services built" },
  { value: 12, suffix: "x", label: "Avg. ROAS uplift" },
  { value: 26, suffix: "M+", label: "Trackable Sales (SAR)" },
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
    image: w2,
    excerpt: "Discover how connecting content pillars, ad messaging, and sales paths turns marketing from a random reaction into a scalable acquisition machine.",
  },
  {
    slug: "optimizing-sales-communication",
    title: "How slow sales replies are quietly burning your ad budget",
    date: "Apr 29, 2026",
    category: "Sales Support",
    image: w3,
    excerpt: "Stop wasting money on traffic. Learn the exact welcome flows, qualification frameworks, and common objection templates to protect your lead quality.",
  },
];