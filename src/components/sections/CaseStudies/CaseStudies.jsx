import { Trophy, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import OptimizedVideo from "../../../assets/caseS.webp";
import styles from "./CaseStudies.module.css";
import logo1 from "@/assets/loooo1.webp";
import logo2 from "@/assets/loooo2.webp";
import logo3 from "@/assets/loooo3.webp";
import logo4 from "@/assets/loooo4.webp";
import logo5 from "@/assets/loooo5.webp";

const CASES = [
  {
    id: 1,
    company: "INTEGRATED GROWTH SYSTEM",
    logo: logo1,
    description:
      "We engineered an integrated acquisition funnel across various commercial sectors, driving massive volume and capturing extensive business growth data.",
    before: { label: "Ad Optimization", value: "Data-Driven Funnels" },
    after: { label: "Trackable Sales", value: "13,700,000+ SAR" },
    metrics: [
      { value: "12x – 16x", label: "Avg. ROAS Uplift" },
      { value: "Multi-Sector", label: "System Scalability" },
      { value: "High-Intent", label: "Lead Quality" },
    ],
  },
  {
    id: 2,
    company: "NIBRAS 360",
    logo: logo2,
    description:
      "Developed a precise visual identity and structured a cohesive brand positioning statement, transforming their market presence into a distinct communication system.",
    before: { label: "Brand Presence", value: "Fragmented Identity" },
    after: { label: "Visual System", value: "100% Cohesive Guide" },
    metrics: [
      { value: "Unified", label: "Tone of Voice" },
      { value: "Premium", label: "Market Positioning" },
      { value: "Structured", label: "Core Messaging" },
    ],
  },
  {
    id: 3,
    company: "BELT & ROAD TRADING",
    logo: logo3,
    description:
      "Transformed raw business metrics and data into a highly persuasive 12-page company profile, turning their past delivered work into an active corporate sales tool.",
    before: { label: "Corporate Presence", value: "Generic Description" },
    after: { label: "Company Profile", value: "12-Page Sales Tool" },
    metrics: [
      { value: "Professional", label: "Service Copywriting" },
      { value: "Targeted", label: "B2B Credibility" },
      { value: "Print & Digital", label: "Ready Files" },
    ],
  },
  {
    id: 4,
    company: "PANDA HOST",
    logo: logo4,
    description:
      "Re-engineered their advertising funnels on Meta, transforming traditional random budget spending into a continuous digital learning and optimization system.",
    before: { label: "Campaign Testing", value: "Random Ad Spending" },
    after: { label: "Funnel Conversion", value: "Continuous Learning" },
    metrics: [
      { value: "Optimized", label: "Cost Per Lead" },
      { value: "Full-Funnel", label: "Meta Ad Setup" },
      { value: "Actionable", label: "Performance Data" },
    ],
  },
  {
    id: 5,
    company: "AL ASWAR AL SAMEDA CO.",
    logo: logo5,
    description:
      "Structured a high-end corporate identity and comprehensive profiling for a premium 7-branch fast-food chain and large infrastructure projects in Tabuk.",
    before: { label: "Visual System", value: "Standard Outlines" },
    after: { label: "Corporate Trust", value: "7-Branch Scale" },
    metrics: [
      { value: "Tabuk Sector", label: "Infrastructure" },
      { value: "Premium", label: "B2B Positioning" },
      { value: "100% Cohesive", label: "Brand Presence" },
    ],
  },
];

export default function CaseStudies({ translationPrefix }) {
  const { t } = useTranslation();
  const translatedCases = translationPrefix
    ? t(`${translationPrefix}.items`, { returnObjects: true })
    : [];
  const cases = CASES.map((caseItem, index) => ({
    ...caseItem,
    ...(translationPrefix ? translatedCases[index] : {}),
    logo: caseItem.logo,
  }));

  return (
    <section id="case-studies" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.titleSection}>
            <i>
              <Trophy size={23} />
            </i>
            <span>
              {translationPrefix
                ? t(`${translationPrefix}.badge`)
                : "Case Studies"}
            </span>
          </div>
          <h2 className={styles.heading}>
            {translationPrefix
              ? t(`${translationPrefix}.title`)
              : "Real Results, Real Success"}
          </h2>
          <p className={styles.subheading}>
            {translationPrefix
              ? t(`${translationPrefix}.description`)
              : "Explore how our performance-driven strategies helped brands increase revenue, generate qualified leads, and scale their digital growth."}
          </p>
        </div>

        <div className={styles.grid}>
          <div className={styles.videoCol}>
            <div className={styles.videoWrap}>
              {/* تم إصلاح الخطأ وإضافة قوس الفتح هنا < */}
              <img
                src={OptimizedVideo}
                alt="Case studies overview"
                className={styles.video}
              />
              <div className={styles.videoGlow} />
            </div>
          </div>

          <div className={styles.cardsCol}>
            {cases.map((c) => (
              <article key={c.id} className={styles.card}>
                <div className={styles.cardText}>
                  <div className={styles.companyHeader}>
                    <h3 className={styles.companyName}>{c.company}</h3>
                    <img
                      src={c.logo}
                      alt={`${c.company} logo`}
                      className={styles.logo}
                    />
                  </div>

                  <span className={styles.pill}>
                    {translationPrefix
                      ? t(`${translationPrefix}.pill`)
                      : "Performance Case Study"}
                  </span>

                  <p className={styles.desc}>{c.description}</p>

                  <div className={styles.comparison}>
                    <div className={styles.compBefore}>
                      <span className={styles.compLabel}>{c.before.label}</span>
                      <span className={styles.compValue}>{c.before.value}</span>
                    </div>

                    <div className={styles.arrow}>
                      <ArrowRight size={18} />
                    </div>

                    <div className={styles.compAfter}>
                      <span className={styles.compLabel}>{c.after.label}</span>
                      <span className={styles.compValue}>{c.after.value}</span>
                    </div>
                  </div>
                </div>

                <div className={styles.cardMetrics}>
                  {c.metrics.map((m) => (
                    <div key={m.label} className={styles.metric}>
                      <span className={styles.metricValue}>{m.value}</span>
                      <span className={styles.metricLabel}>{m.label}</span>
                    </div>
                  ))}
                </div>
              </article>
            ))}

            <div
              style={{
                marginTop: "2.5rem",
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <Link
                to="/portfolio"
                className="btn rounded-pill px-4 py-2 text-uppercase fw-semibold"
                style={{
                  letterSpacing: "0.08em",
                  fontSize: "0.85rem",
                  color: "#ffffff",
                  background: "#0081d0",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  boxShadow: "0 4px 15px rgba(41, 95, 153, 0.2)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#1a96e6";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 20px rgba(41, 95, 153, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    "#0081d0"; /* تم تعديل اللون ليرجع للأساسي عند خروج الماوس */
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 15px rgba(41, 95, 153, 0.2)";
                }}
              >
                {translationPrefix
                  ? t(`${translationPrefix}.button`)
                  : "See All Work"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
