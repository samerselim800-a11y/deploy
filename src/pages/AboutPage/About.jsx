import React from "react";
import { useTranslation } from "react-i18next";
import { StatsCounter } from "../../components/sections/StatsCounter/StatsCounter";
import { ProcessSection } from "../../components/sections/ProcessSection/ProcessSection";
import { CTABanner } from "../../components/sections/CTABanner/CTABanner";
import { AboutUs } from "../../components/sections/AboutUS/AboutUS";
import ServicesGrid from "../../components/sections/ServicesGrid/ServicesGrid";

function AboutPage() {
  const { t } = useTranslation();

  React.useEffect(() => {
    document.title = t("aboutPage.meta.title");

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", t("aboutPage.meta.description"));
    }
  }, [t]);

  return (
    <>
      <AboutUs translationPrefix="aboutPage.intro" />
      <ServicesGrid translationPrefix="aboutPage.values" />
      <StatsCounter translationPrefix="aboutPage.stats" />
      <ProcessSection translationPrefix="aboutPage.process" />
      <CTABanner translationPrefix="aboutPage.cta" />
    </>
  );
}

export default AboutPage;
