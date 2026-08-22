import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./ProcessSection.module.css";

export function ProcessSection({ translationPrefix = "servicesPage.process" }) {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  // جلب مصفوفة الخطوات من ملف الترجمة
  const items = t(`${translationPrefix}.items`, { returnObjects: true });
  const steps = Array.isArray(items) ? items : [];

  return (
    <section className={styles.section} dir={isArabic ? "rtl" : "ltr"}>
      <div className={styles.container}>
        
        {/* الهيدر العلوي */}
        <div className={styles.header}>
          <p className={styles.eyebrow}>
            <span className={styles.line} />
            <span className={styles.eyebrowText}>{t(`${translationPrefix}.eyebrow`)}</span>
            <span className={styles.line} />
          </p>

          <h2 className={styles.heading}>
            {t(`${translationPrefix}.title`)}{" "}
            {t(`${translationPrefix}.titleSecondLine`) && (
              <span className={styles.headingSecondLine}>
                {t(`${translationPrefix}.titleSecondLine`)}
              </span>
            )}
          </h2>
        </div>

        {/* شبكة الخطوات الأربعة */}
        <div className={styles.timeline}>
          {steps.map((step, index) => (
            <div key={step.step || index} className={styles.stepItem}>
              <div className={styles.stepNumber}>{step.step || `0${index + 1}`}</div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}