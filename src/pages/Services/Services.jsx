import React from "react";
import { useTranslation } from "react-i18next";
import { ProcessSection } from "../../components/sections/ProcessSection/ProcessSection";
import { CTABanner } from "../../components/sections/CTABanner/CTABanner";
import { Reveal } from "@/components/sections/Reveal/Reveal";
import ServicesDetail from "./ServiceDetail";
import WhyChooseUs from "../../components/sections/WhyChooseUs/WhyChooseUs";
import { StatsCounter } from "../../components/sections/StatsCounter/StatsCounter";
import Testimonials from "../../components/sections/Testimonials/Testimonials";
import styles from "./Services.module.css";
import TeamCraftImg from "../../assets/What-we-do Icon.png";

function ServicesPage() {
  const { t } = useTranslation();

  React.useEffect(() => {
    document.title = t("servicesPage.meta.title");
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", t("servicesPage.meta.description"));
    }
  }, [t]);

  return (
    <>
      {/* Hero Section */}
      <section className={`position-relative overflow-hidden ${styles.heroSection}`}>
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-12 col-lg-6 d-flex align-items-center">
              <Reveal>
                <p className={`mb-3 text-uppercase ${styles.eyebrow}`}>
                  {t("servicesPage.hero.badge")}
                </p>
                <h1 className={`display-1 fw-normal mb-0 ${styles.fontDisplay}`}>
                  {t("servicesPage.hero.title")}
                  <br />
                  {t("servicesPage.hero.titleSecondLine")}
                </h1>
                <p className={`mt-4 text-muted fs-5 mb-0 ${styles.description}`}>
                  {t("servicesPage.hero.description")}
                </p>
              </Reveal>
            </div>

            <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center justify-content-lg-end">
              <Reveal>
                <div className={styles.imageWrapper}>
                  <img
                    src={TeamCraftImg}
                    alt={t("servicesPage.hero.imageAlt")}
                    className={styles.aboutImg}
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* All 14 Services */}
      <ServicesDetail />

      {/* Why Choose Us */}
      <WhyChooseUs translationPrefix="servicesPage.whyChooseUs" />

      {/* Stats / Social Proof */}
      <StatsCounter translationPrefix="servicesPage.stats" />

      {/* How We Work */}
      <ProcessSection translationPrefix="servicesPage.process" />

      {/* Client Testimonials */}
      <Testimonials translationPrefix="servicesPage.testimonials" />

      {/* FAQ */}

      {/* Call To Action */}
      <CTABanner translationPrefix="servicesPage.cta" />
    </>
  );
}

export default ServicesPage;