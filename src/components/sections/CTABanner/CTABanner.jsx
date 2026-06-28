import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Reveal } from "../Reveal/Reveal";
import styles from "./CTABanner.module.css";

export function CTABanner({ translationPrefix }) {
  const { t } = useTranslation();

  return (
    <section className={`position-relative overflow-hidden ${styles.ctaSection}`}>
      {/* Background Gradients */}
      <div className={`position-absolute inset-0 pe-none ${styles.bgHero}`} />
      <div className={`position-absolute top-50 start-50 translate-middle rounded-circle pe-none ${styles.glowBlur}`} />

      <div className="position-relative container text-center">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <Reveal>
              <p className={`mb-4 d-inline-flex align-items-center gap-3 text-uppercase ${styles.eyebrow}`}>
                <span className={styles.line} /> {translationPrefix ? t(`${translationPrefix}.eyebrow`) : "Ready when you are"}
              </p>

              <h2 className={`display-2 fw-normal ${styles.fontDisplay}`}>
                {translationPrefix ? t(`${translationPrefix}.title`) : "Your next chapter"}{" "}
                <span className={`${styles.gradientGold} fst-italic`}>
                  {translationPrefix ? t(`${translationPrefix}.titleHighlight`) : "starts here."}
                </span>
              </h2>

              <p className={`mx-auto mt-4   fs-5 max-w-600 ${styles.fontsmall}`}>
                {translationPrefix
                  ? t(`${translationPrefix}.description`)
                  : "Tell us what you're building. We'll bring strategy, creative and a clear path to growth."}
              </p>

              <Link
                to="/contact"
                className={`d-inline-flex align-items-center gap-3 rounded-pill border-0 text-decoration-none ${styles.btnGold}`}
              >
                {translationPrefix ? t(`${translationPrefix}.button`) : "Book your consultation"}
                <ArrowRight className={`h-5 w-5 ${styles.arrowIcon}`} />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
