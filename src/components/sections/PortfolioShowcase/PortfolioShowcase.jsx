import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PORTFOLIO, PORTFOLIO_CATEGORIES } from "@/lib/content";
import { Reveal, SectionHeading } from "@/components/sections/Reveal/Reveal";
import styles from "./PortfolioShowcase.module.css";

const PROJECT_KEYS = [
  "nibras",
  "nurtureNature",
  "ippo",
  "packgo",
  "aquaCool",
  "beltRoad",
];

const CATEGORY_KEYS = {
  All: "all",
  Branding: "branding",
  "Identity Guide": "identityGuide",
  "Social Media": "socialMedia",
  "Paid Ads": "paidAds",
  "Company Profiles": "companyProfiles",
};

function ProjectModal({ project, onClose, labels }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button className={styles.closeBtn} onClick={onClose} aria-label={labels.close}>
          <X size={18} />
        </button>

        <div className={styles.modalImg}>
          <img src={project.image} alt={project.title} />
          <div className={styles.modalImgOverlay} />
          <span className={styles.modalCategory}>{project.categoryLabel}</span>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.modalMeta}>
            <span className={styles.modalClient}>{project.client}</span>
            <span className={styles.modalYear}>{project.year}</span>
          </div>

          <h2 className={styles.modalTitle}>{project.title}</h2>
          <p className={styles.modalDesc}>{project.description}</p>

          <div className={styles.modalDivider} />

          {project.results && (
            <div className={styles.resultsRow}>
              {project.results.map((r) => (
                <div key={r.label} className={styles.resultItem}>
                  <span className={styles.resultValue}>{r.value}</span>
                  <span className={styles.resultLabel}>{r.label}</span>
                </div>
              ))}
            </div>
          )}

          <div className={styles.modalDivider} />

          {project.services && (
            <div>
              <p className={styles.modalLabel}>{labels.whatWeDid}</p>
              <div className={styles.tags}>
                {project.services.map((s) => (
                  <span key={s} className={styles.tag}>{s}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function PortfolioShowcase({ limit }) {
  const { t } = useTranslation();
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);

  const translatedProjects = PORTFOLIO.map((project, index) => {
    const key = PROJECT_KEYS[index];
    return {
      ...project,
      title: t(`portfolioPage.projects.items.${key}.title`),
      categoryValue: project.category,
      categoryLabel: t(`portfolioPage.filters.${CATEGORY_KEYS[project.category]}`),
      category: t(`portfolioPage.filters.${CATEGORY_KEYS[project.category]}`),
      description: t(`portfolioPage.projects.items.${key}.description`),
      services: t(`portfolioPage.projects.items.${key}.services`, { returnObjects: true }),
      results: project.results.map((result, resultIndex) => ({
        ...result,
        label: t(`portfolioPage.projects.items.${key}.results.${resultIndex}.label`),
      })),
    };
  });

  const items = translatedProjects
    .filter((p) => filter === "All" || p.categoryValue === filter)
    .slice(0, limit);

  const modalLabels = {
    close: t("portfolioPage.projects.modal.close"),
    whatWeDid: t("portfolioPage.projects.modal.whatWeDid"),
  };

  return (
    <section className={`position-relative ${styles.portfolioSection}`}>
      <div className="container">
        <SectionHeading
          eyebrow={t("portfolioPage.projects.badge")}
          title={<>{t("portfolioPage.projects.title")}<br />{t("portfolioPage.projects.titleSecondLine")}</>}
        />

        <div className="mt-5 d-flex flex-wrap align-items-center justify-content-center gap-2">
          {PORTFOLIO_CATEGORIES.map((categoryValue) => (
            <button
              key={categoryValue}
              onClick={() => setFilter(categoryValue)}
              className={`btn rounded-pill text-uppercase ${styles.filterBtn} ${filter === categoryValue ? styles.activeFilter : ""}`}
            >
              {t(`portfolioPage.filters.${CATEGORY_KEYS[categoryValue]}`)}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-5 row g-4">
          <AnimatePresence mode="popLayout">
            {items.map((p, i) => (
              <div key={p.id} className="col-12 col-md-6 col-lg-4">
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: i * 0.04 }}
                >
                  <div
                    className={`group d-block overflow-hidden rounded-4 ${styles.portfolioCard}`}
                    onClick={() => setSelected(p)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && setSelected(p)}
                  >
                    <div className={`position-relative ${styles.imageWrapper}`}>
                      <img src={p.image} alt={p.title} loading="lazy" className={`w-100 h-100 ${styles.cardImg}`} />
                      <div className={`position-absolute inset-0 ${styles.cardOverlay}`} />
                      <div className="position-absolute bottom-0 start-0 end-0 d-flex align-items-end justify-content-between p-4">
                        <div>
                          <p className={`text-uppercase mb-1 ${styles.cardCategory}`}>{p.categoryLabel}</p>
                          <h3 className={`h4 m-0 fw-normal ${styles.fontDisplay}`}>{p.title}</h3>
                        </div>
                        <div className={`d-grid place-items-center rounded-circle flex-shrink-0 ${styles.arrowCircle}`}>
                          <ArrowUpRight size={20} />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </AnimatePresence>
        </motion.div>

        {limit && (
          <Reveal className="mt-5 text-center">
            <a href="/portfolio" className={`btn rounded-pill text-uppercase ${styles.seeAllBtn}`}>
              {t("portfolioPage.projects.seeAll")} <ArrowUpRight className="ms-1" size={16} />
            </a>
          </Reveal>
        )}
      </div>

      {selected && (
        <ProjectModal
          project={selected}
          labels={modalLabels}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}
