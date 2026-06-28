import styles from "./OurClients.module.css";
import { useTranslation } from "react-i18next";

import { Building2 } from "lucide-react";

import logo1 from "@/assets/loooo1.webp"; // Integrated Growth System
import logo2 from "@/assets/loooo2.webp"; // Nibras 360
import logo3 from "@/assets/loooo3.webp"; // Belt & Road Trading
import logo4 from "@/assets/loooo4.webp"; // Panda Host
import logo5 from "@/assets/loooo5.webp"; // Al Aswar Al Sameda

const logoSources = [logo1, logo2, logo3, logo4, logo5];

// أسماء حقيقية للبراندات والعملاء الموثقين داخل ملفاتك لرفع دقة الـ SEO والـ Accessibility
const clientNames = [
  "Integrated Growth System",
  "Nibras 360",
  "Belt & Road Trading",
  "Panda Host",
  "Al Aswar Al Sameda"
];

const LOGO_COUNT = 20;

const LOGOS = Array.from({ length: LOGO_COUNT }, (_, i) => ({
  src: logoSources[i % logoSources.length],
  alt: `${clientNames[i % clientNames.length]} - EGO STUDIO Client`,
}));

function MarqueeRow({ reverse = false }) {
  return (
    <div className={styles.marqueeContainer}>
      <div
        className={`${styles.marquee}
        ${reverse ? styles.reverse : ""}`}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className={styles.marqueeContent}>
            {LOGOS.map((logo, i) => (
              <div key={i} className={styles.logoWrap}>
                <img src={logo.src} alt={logo.alt} className={styles.logo} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function OurClients() {
  const { t } = useTranslation();

  return (
    <section id="our-clients" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.titleSection}>
            <Building2 size={23} />
            <span>{t("home.clients.badge")}</span>
          </div>

          <h2 className={styles.heading}>
            {t("home.clients.title")}{" "}
            <span className={styles.highlight}>{t("home.clients.titleHighlight")}</span>
          </h2>

          <p className={styles.subheading}>
            {t("home.clients.description")}
          </p>
        </div>

        <MarqueeRow />
        <MarqueeRow reverse />
      </div>
    </section>
  );
}
