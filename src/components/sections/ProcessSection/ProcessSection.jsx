import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./ProcessSection.module.css";

export function ProcessSection({ translationPrefix }) {
  const { t } = useTranslation();

  const steps = [
    {
      number: "01",
      title: t(`${translationPrefix}.steps.step1.title`, "Strategy Before Execution"),
      desc: t(`${translationPrefix}.steps.step1.description`, "We don't start any project without studying the market and the business goal."),
    },
    {
      number: "02",
      title: t(`${translationPrefix}.steps.step2.title`, "Data Before Assumptions"),
      desc: t(`${translationPrefix}.steps.step2.description`, "Our decisions are based on analysis, not guesswork."),
    },
    {
      number: "03",
      title: t(`${translationPrefix}.steps.step3.title`, "Quality Before Quantity"),
      desc: t(`${translationPrefix}.steps.step3.description`, "We believe the right creative idea is stronger than dozens of posts."),
    },
    {
      number: "04",
      title: t(`${translationPrefix}.steps.step4.title`, "Growth Above All"),
      desc: t(`${translationPrefix}.steps.step4.description`, "Our success is measured by our clients' results and business growth, not by the number of campaigns we run."),
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        
        {/* الهيدر العلوي */}
        <div className={styles.header}>
          <p className={styles.eyebrow}>
            <span className={styles.line} />
            {t(`${translationPrefix}.badge`, "WHAT MAKES OUR THINKING DIFFERENT?")}
            <span className={styles.line} />
          </p>

          <h2 className={styles.heading}>
            {t(`${translationPrefix}.title`, "A process built on momentum.")}
          </h2>
        </div>

        {/* شبكة الخطوات الأربعة */}
        <div className={styles.timeline}>
          {steps.map((step) => (
            <div key={step.number} className={styles.stepItem}>
              <div className={styles.stepNumber}>{step.number}</div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}