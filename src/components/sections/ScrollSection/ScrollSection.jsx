import { useRef } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useTranslation } from "react-i18next";

import { Link } from "react-router-dom";
import styles from "./ScrollSection.module.css";
import work1 from "@/assets/SE1.png";
import work3 from "@/assets/SE3.png";
import work4 from "@/assets/SE4.png";
import work5 from "@/assets/SE5.png";
import work6 from "@/assets/SE6.png";
import work2 from "@/assets/Services2.png";

const SERVICES = [
  {
    number: "1",
    key: "marketingGrowth",
    image: work1,
    imageAlt: "Marketing Growth Strategy",
    panelClass: styles.panel1,
  },
  {
    number: "2",
    key: "contentStrategy",
    image: work2,
    imageAlt: "Content Strategy Copywriting",
    panelClass: styles.panel2,
  },
  {
    number: "3",
    key: "metaAds",
    image: work3,
    imageAlt: "Meta Paid Advertising",
    panelClass: styles.panel3,
  },
  {
    number: "4",
    key: "conversionPaths",
    image: work6,
    imageAlt: "Customer Journey Mapping",
    panelClass: styles.panel5,
  },
  {
    number: "5",
    key: "whatsappSales",
    image: work4,
    imageAlt: "WhatsApp Sales Support",
    panelClass: styles.panel4,
  },
  {
    number: "6",
    key: "webDev",
    image: work1,
    imageAlt: "Web Development  UI/UX",
    panelClass: styles.panel1,
  },
];

export default function ScrollSection() {
  const { t } = useTranslation();

  return (
    <section id="services" className={styles.section}>
      {SERVICES.map((service, i) => (
        <div
          key={service.number}
          className={`${styles.panel} ${service.panelClass}`}
          style={{
            zIndex: i + 1,
            top: `${i * 20}px`,
          }}
        >
          <div className={styles.inner}>
            <div className={styles.content}>
              <h1 className={styles.title}>
                <span className={styles.serviceNumber}>{service.number}</span>
                {t(`home.scrollSection.items.${service.key}.title`)}
                <br />
                <span className={styles.ampersand}>&</span>{" "}
                <span className={styles.titleAccent}>
                  {t(`home.scrollSection.items.${service.key}.accent`)}
                </span>
              </h1>

              <span className={styles.subtitle}>
                {t(`home.scrollSection.items.${service.key}.subtitle`)}
              </span>

              <div className={styles.underline} />

              <p className={styles.description}>
                {t(`home.scrollSection.items.${service.key}.description`)}
              </p>

              <ul className={styles.features}>
                {t(`home.scrollSection.items.${service.key}.features`, {
                  returnObjects: true,
                }).map((feat) => (
                  <li key={feat} className={styles.featureItem}>
                    <FaCheckCircle className={styles.checkIcon} size={18} />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <div className={styles.ctaContainer}>
                <Link to="/services" className={styles.ctaSecondary}>
                  {t("home.scrollSection.cta")}
                </Link>
              </div>
            </div>

            <div className={styles.imageContainer}>
              <img
                className={styles.image}
                src={service.image}
                alt={service.imageAlt}
                loading={i === 0 ? "eager" : "lazy"}
                draggable={false}
              />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
