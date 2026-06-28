import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Reveal } from "@/components/sections/Reveal/Reveal";
import { ContactSection } from "@/components/sections/ContactSection/ContactSection";
import styles from "./Contact.module.css";
import ContactImg from "../../assets/Contact Icon.png";

function ContactPage() {
  const [sent, setSent] = useState(false);
  const { t } = useTranslation();

  React.useEffect(() => {
    document.title = t("contactPage.meta.title");
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", t("contactPage.meta.description"));
    }
  }, [t]);

  const onSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      {/* Hero Section */}
      <section className={`position-relative overflow-hidden ${styles.heroSection}`}>
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-12 col-lg-6 d-flex align-items-center">
              <Reveal>
                <p className={`mb-3 text-uppercase ${styles.eyebrow}`}>
                  {t("contactPage.hero.badge")}
                </p>
                <h1 className={`display-1 fw-normal mb-0 ${styles.fontDisplay}`}>
                  {t("contactPage.hero.title")}
                  <br />
                  {t("contactPage.hero.titleSecondLine")}
                </h1>
                <p className={`mt-4 text-muted fs-5 mb-0 ${styles.description}`}>
                  {t("contactPage.hero.description")}
                </p>
              </Reveal>
            </div>

            <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center justify-content-lg-end">
              <Reveal>
                <div className={styles.imageWrapper}>
                  <img
                    src={ContactImg}
                    alt={t("contactPage.hero.imageAlt")}
                    className={styles.aboutImg}
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <ContactSection sent={sent} onSubmit={onSubmit} />
    </>
  );
}

export default ContactPage;