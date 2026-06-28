import { PROCESS } from "@/lib/content";
import { useTranslation } from "react-i18next";
import { Reveal, SectionHeading } from "../Reveal/Reveal";
import styles from "./ProcessSection.module.css";

export function ProcessSection({ translationPrefix }) {
  const { t } = useTranslation();
  const processItems = translationPrefix
    ? t(`${translationPrefix}.items`, { returnObjects: true })
    : PROCESS;

  return (
    <section className={`position-relative ${styles.processSection}`}>
      <div className="container">
        <SectionHeading
          eyebrow={translationPrefix ? t(`${translationPrefix}.eyebrow`) : "How we work"}
          title={
            <>
              {translationPrefix ? t(`${translationPrefix}.title`) : "A process built"}
              <br />
              {translationPrefix ? t(`${translationPrefix}.titleSecondLine`) : "on momentum."}
            </>
          }
        />
        
        <div className="position-relative mt-5 pt-3">
          {/* Horizontal divider line visible only on desktop */}
          <div className={`position-absolute start-0 end-0 d-none d-md-block ${styles.dividerLine}`} />
          
          <div className="row g-4">
            {processItems.map((p, i) => (
              <div key={p.step} className="col-12 col-md-6 col-lg-3">
                <Reveal delay={i * 0.1}>
                  <div className="position-relative">
                    <div className={`d-grid place-items-center rounded-circle border font-display ${styles.stepCircle}`}>
                      {p.step}
                    </div>
                    <h3 className={`mt-4 fw-normal h4 ${styles.fontDisplay}`}>{p.title}</h3>
                    <p className={`mt-2  small ${styles.fontsmall}`}>{p.desc}</p>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
