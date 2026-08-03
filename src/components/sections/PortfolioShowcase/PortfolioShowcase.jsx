import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PORTFOLIO } from "@/lib/content";
import { Reveal } from "@/components/sections/Reveal/Reveal";
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

// ─── Gallery placeholder helper ───
const GALLERY_COUNT = 7;
const GALLERY_HEIGHTS = [420, 560, 480, 640, 400, 520, 460];

function buildGallery(seed) {
  return Array.from({ length: GALLERY_COUNT }, (_, i) => ({
    id: `${seed}-${i}`,
    src: `https://picsum.photos/seed/${seed}-${i}/600/${GALLERY_HEIGHTS[i % GALLERY_HEIGHTS.length]}`,
  }));
}

// ─── Modal Component ───
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

  const gallery = project.gallery || buildGallery(project.id);

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label={labels.close}
        >
          <X size={18} />
        </button>

        <div className={styles.galleryHeader}>
          <span className={styles.modalCategoryTop}>
            {project.categoryLabel || project.category}
          </span>
          <h2 className={styles.modalTitle}>{project.title}</h2>
        </div>

        <div className={styles.galleryGrid}>
          {gallery.map((img) => (
            <div className={styles.galleryItem} key={img.id}>
              <img
                className={styles.galleryImg}
                src={img.src || img}
                alt={project.title}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Scroll Section Component ───
function ScrollSection({ title, projects, onSelect }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      e.preventDefault();
      const delta = (e.deltaX !== 0 ? e.deltaX : e.deltaY) * 1.5;
      container.scrollLeft -= delta;
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className="mb-5 pb-2">
      <h3
        className="h4 md:h3 mb-4 fw-bold"
        style={{ color: "var(--primary)", letterSpacing: "0.02em" }}
      >
        {title}
      </h3>

      <div
        ref={scrollRef}
        style={{
          display: "flex",
          flexWrap: "nowrap",
          gap: "1.25rem",
          overflowX: "auto",
          paddingBottom: "1.25rem",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {projects.map((p, i) => (
          <div
            key={p.id}
            className="portfolio-card-item"
            style={{
              flexShrink: 0,
              height: "380px",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="h-100"
            >
              <div
                className={`group d-block overflow-hidden rounded-4 h-100 cursor-pointer ${styles.portfolioCard}`}
                onClick={() => onSelect(p)}
                style={{ backgroundColor: "#121214", cursor: "pointer" }}
              >
                <div
                  className="position-relative h-100"
                  style={{ backgroundColor: "#0b0b0b" }}
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="w-100 h-100 object-fit-cover"
                    style={{
                      transition:
                        "transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  />
                  <div
                    className={`position-absolute inset-0 ${styles.cardOverlay}`}
                  />
                  <div className="position-absolute bottom-0 start-0 end-0 d-flex align-items-end justify-content-between p-4 z-10">
                    <div>
                      <p
                        className="text-uppercase mb-1"
                        style={{
                          fontSize: "0.75rem",
                          letterSpacing: "0.25em",
                          color: "var(--primary)",
                        }}
                      >
                        {p.categoryLabel || p.category}
                      </p>
                      <h3
                        className="h5 m-0 fw-normal text-white"
                        style={{ fontFamily: "var(--font-display, serif)" }}
                      >
                        {p.title}
                      </h3>
                    </div>
                    <div
                      className={`d-grid place-items-center rounded-circle flex-shrink-0 ${styles.arrowCircle}`}
                    >
                      <ArrowUpRight size={20} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ───
export function PortfolioShowcase({ limit }) {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(null);

  const translatedProjects = PORTFOLIO.map((project, index) => {
    const key = PROJECT_KEYS[index] || `project_${project.id}`;
    return {
      ...project,
      title: t(`portfolioPage.projects.items.${key}.title`, {
        defaultValue: project.title,
      }),
      categoryValue: project.category,
      categoryLabel: CATEGORY_KEYS[project.category]
        ? t(`portfolioPage.filters.${CATEGORY_KEYS[project.category]}`)
        : project.category,
      description: t(`portfolioPage.projects.items.${key}.description`, {
        defaultValue: project.description,
      }),
    };
  });

  const brandingProjects = translatedProjects.filter(
    (p) =>
      p.categoryValue === "Branding" || p.categoryValue === "Identity Guide",
  );
  const socialMediaProjects = translatedProjects.filter(
    (p) => p.categoryValue === "Social Media" || p.categoryValue === "Paid Ads",
  );
  const companyProfilesProjects = translatedProjects.filter(
    (p) => p.categoryValue === "Company Profiles",
  );

  const modalLabels = {
    close: t("portfolioPage.projects.modal.close", { defaultValue: "إغلاق" }),
    whatWeDid: t("portfolioPage.projects.modal.whatWeDid", {
      defaultValue: "ما الذي نفذناه",
    }),
  };

  return (
    <section
      className={`position-relative pt-5 pb-5`}
      style={{ backgroundColor: "#050505" }}
    >
      <div className="container">
        
        {/* 
          تم الاستغناء عن المكون SectionHeading هنا 
          وقمنا ببناء الهيدر بأنفسنا لضمان تلوين الخطوط باللون primary 100% 
        */}
        <Reveal>
          <div className="text-center mb-5 pb-3">
            
            {/* الكلمة والخطين (تم إعطاؤهم اللون المباشر var(--primary)) */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", marginBottom: "1.5rem" }}>
              <span style={{ display: "block", height: "1px", width: "40px", backgroundColor: "var(--primary)" }}></span>
              <span style={{ color: "var(--primary)", fontWeight: "600", fontSize: "0.85rem", letterSpacing: "0.15em" }}>
                {t("portfolioPage.projects.badge", { defaultValue: "أعمال مختارة" })}
              </span>
              <span style={{ display: "block", height: "1px", width: "40px", backgroundColor: "var(--primary)" }}></span>
            </div>

            {/* العنوان الرئيسي (أبيض ناصع) */}
            <h3 className="lh-base m-0 fw-bold">
              <span
                className="d-block mb-2"
                style={{
                  color: "#ffffff",
                  fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
                }}
              >
                {t("portfolioPage.projects.title", {
                  defaultValue: "لا نعرض ما صممناه",
                })}
              </span>

              <span
                className="d-block"
                style={{
                  lineHeight: "1.2",
                  color: "#ffffff",
                  fontSize: "clamp(1.75rem, 3vw, 2.1rem)",
                  fontWeight: "normal",
                }}
              >
                {t("portfolioPage.projects.titleSecondLine", {
                  defaultValue: "بل نعرض الأثر الحقيقي الذي صنعناه",
                })}
              </span>
            </h3>
          </div>
        </Reveal>

        <div className="mt-4 pt-2">
          <ScrollSection
            title={t(`portfolioPage.filters.branding`, {
              defaultValue: "الهوية التجارية",
            })}
            projects={brandingProjects}
            onSelect={setSelected}
          />

          <ScrollSection
            title={t(`portfolioPage.filters.socialMedia`, {
              defaultValue: "السوشيال ميديا",
            })}
            projects={socialMediaProjects}
            onSelect={setSelected}
          />

          <ScrollSection
            title={t(`portfolioPage.filters.companyProfiles`, {
              defaultValue: "بروفايلات الشركات",
            })}
            projects={companyProfilesProjects}
            onSelect={setSelected}
          />
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <ProjectModal
            project={selected}
            labels={modalLabels}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>

      <style jsx global>{`
        /* ضبط حجم الكروت بين الموبايل والشاشات الكبيرة */
        .portfolio-card-item {
          width: calc(50% - 0.625rem);
        }
        @media (max-width: 768px) {
          .portfolio-card-item {
            width: 85%;
          }
        }
        .group:hover img {
          transform: scale(1.08) !important;
        }
        .group:hover .cardOverlay {
          opacity: 0.95 !important;
        }
      `}</style>
    </section>
  );
}