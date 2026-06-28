// Centralized site config. Swap API_BASE_URL when wiring Laravel.
export const SITE = {
  name: "THE EGO STUDIO",
  logo: "THE EGO STUDIO",
  tagline: "Digital marketing systems for measurable growth.",
  email: "info@theegostudio.com",
  phone: "+20 101 074 7926",
  address: "Egypt",
  whatsapp: "201010747926",
  social: {
    instagram: "https://instagram.com/the.egostudio",
    twitter: "https://x.com/the_egostudio",
    tiktok: "https://tiktok.com/@the.egostudio",
  },
};
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api";
