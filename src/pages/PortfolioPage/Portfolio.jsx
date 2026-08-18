import React from "react";
import { useTranslation } from "react-i18next";
import { PortfolioShowcase } from "@/components/sections/PortfolioShowcase/PortfolioShowcase";
import { CTABanner } from "../../components/sections/CTABanner/CTABanner";
import { Reveal } from "@/components/sections/Reveal/Reveal";
import CaseStudies from "@/components/sections/CaseStudies/CaseStudies";
import { StatsCounter } from "../../components/sections/StatsCounter/StatsCounter";
import Testimonials from "../../components/sections/Testimonials/Testimonials";
import imgportfolio from "../../assets/Selected-work Icon.png";
import styles from "./Portfolio.module.css";

function PortfolioPage() {
  const { t } = useTranslation();

  React.useEffect(() => {
    document.title = t("portfolioPage.meta.title");
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", t("portfolioPage.meta.description"));
    }
  }, [t]);

  return (
    <div className={styles.portfolioPageWrapper}>
      {/* Hero Section */}
      <section
        className={`position-relative overflow-hidden ${styles.heroSection}`}
      >
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-12 col-lg-6 d-flex align-items-center">
              <Reveal>
                <p className={`mb-3 text-uppercase ${styles.eyebrow}`}>
                  {t("portfolioPage.hero.badge")}
                </p>
                <h1 className={`fw-normal mb-0 ${styles.fontDisplay}`}>
                  {t("portfolioPage.hero.title")}
                  <br />
                  <span className={styles.titleAccent}>
                    {t("portfolioPage.hero.titleSecondLine")}
                  </span>
                </h1>
                <p className={`mt-4 text-muted fs-5 mb-0 ${styles.description}`}>
                  {t("portfolioPage.hero.description")}
                </p>
              </Reveal>
            </div>

            <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center justify-content-lg-end">
              <Reveal>
                <div className={styles.imageWrapper}>
                  <img
                    src={imgportfolio}
                    alt={t("portfolioPage.hero.imageAlt")}
                    className={styles.aboutImg}
                  />
                  <div className={styles.glow} />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <PortfolioShowcase />

      {/* Detailed Case Studies */}
      <CaseStudies translationPrefix="portfolioPage.caseStudies" />

      {/* Client Testimonials */}
      <div dir="ltr">
        <Testimonials translationPrefix="home.testimonials" />
      </div>

      {/* Call To Action */}
      <CTABanner translationPrefix="portfolioPage.cta" />
    </div>
  );
}

export default PortfolioPage;