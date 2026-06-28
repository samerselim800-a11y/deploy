import styles from "./WhyChooseUs.module.css";
import { useTranslation } from "react-i18next";

import {
  Award,
  Settings2,
  Handshake,
  Sparkles,
} from "lucide-react";

const ITEMS = [
  {
    icon: Award,
    title: "Integrated Growth System",
    description:
      "We do not treat marketing as disconnected posts and ads. We build an integrated system from market analysis to conversion paths that serves your commercial objectives.",
  },
  {
    icon: Settings2,
    title: "Measurable Performance",
    description:
      "We manage campaign planning, message testing, and budgets based on real data. Performance is measured by lead quality and revenue generation, not surface numbers.",
  },
  {
    icon: Handshake,
    title: "Continuous Optimization",
    description:
      "Our team stays by your side, delivering detailed performance reviews and actionable insights to turn continuous marketing spending into permanent business growth.",
  },
];

export default function WhyChoose({ translationPrefix }) {
  const { t } = useTranslation();
  const translatedItems = translationPrefix
    ? t(`${translationPrefix}.items`, { returnObjects: true })
    : [];
  const items = ITEMS.map((item, index) => ({
    ...item,
    ...(translationPrefix ? translatedItems[index] : {}),
  }));

  return (
    <section className={styles.section}>
      <div className={styles.overlay} />

      <div className={styles.container}>
        <div className={styles.header}>

          <div className={styles.titleSection}>
            <Sparkles size={23} style={{ color: "var(--primary)" }} />
            <span>{translationPrefix ? t(`${translationPrefix}.badge`) : "Why Choose Us"}</span>
          </div>

          <h2 className={styles.heading}>
            {translationPrefix ? t(`${translationPrefix}.title`) : "Partner With A Measurable Success Team"}
          </h2>

          <p className={styles.subheading}>
            {translationPrefix
              ? t(`${translationPrefix}.description`)
              : "Choosing EGO STUDIO means working with a growth partner that transforms marketing into a structured system, driving real and trackable commercial development."}
          </p>

        </div>

        <div className={styles.grid}>
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className={styles.card}
              >
                <div className={styles.iconWrap} style={{ color: "#fafafa" }}>
                  <Icon size={24} />
                </div>

                <h3 className={styles.cardTitle}>
                  {item.title}
                </h3>

                <div className={styles.underline} />

                <p className={styles.cardDesc}>
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
