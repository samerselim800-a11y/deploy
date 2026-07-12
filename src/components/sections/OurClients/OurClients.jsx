
import styles from "./OurClients.module.css";
import { useTranslation } from "react-i18next";
import { Building2 } from "lucide-react";

// تحميل كل الصور تلقائياً من الفولدر
const images = import.meta.glob(
  "../../../assets/OurClints/*.{webp,png,jpg,jpeg}",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);

const logoSources = Object.values(images);

const LOGO_COUNT = logoSources.length;

const LOGOS = Array.from({ length: LOGO_COUNT }, (_, i) => ({
  src: logoSources[i],
  alt: `EGO STUDIO Client Logo ${i + 1}`,
}));

function MarqueeRow({ reverse = false }) {
  return (
    <div className={styles.marqueeContainer}>
      <div
        className={`${styles.marquee} ${
          reverse ? styles.reverse : ""
        }`}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className={styles.marqueeContent}>
            {LOGOS.map((logo, i) => (
              <div key={i} className={styles.logoWrap}>
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className={styles.logo}
                  loading="lazy"
                />
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
            <span className={styles.highlight}>
              {t("home.clients.titleHighlight")}
            </span>
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

