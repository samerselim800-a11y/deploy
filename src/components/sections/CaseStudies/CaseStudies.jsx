import { Trophy, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import OptimizedVideo from "../../../assets/caseS.webp";
import styles from "./CaseStudies.module.css";

const CASES = [
  {
    id: 1,
    company: "Konoz Marshall",
    description:
      "We built a complete marketing ecosystem that strengthened brand trust and turned interest into real sales opportunities in the furniture and finishing sector.",
    before: { label: "Performance Improvement", value: "A strategy to turn interest into sales" },
    after: { label: "Sales Achieved", value: "AED 57,000+" },
    metrics: [
      { value: "AED 15,000", label: "Total Ad Spend" },
      { value: "3.8X", label: "Return on Ad Spend" },
      { value: "Qualified Sales Opportunities", label: "Lead Quality" },
    ],
  },
  {
    id: 2,
    company: "Saudi Contracting Company",
    description:
      "We built a complete lead generation ecosystem for a contracting company, establishing trust and delivering results within less than 10 days of launching the ad campaign.",
    before: { label: "Performance Improvement", value: "A qualified lead generation ecosystem" },
    after: { label: "Contract Value", value: "SAR 90,000+" },
    metrics: [
      { value: "SAR 2,600", label: "Total Ad Spend" },
      { value: "34X+", label: "Return on Ad Spend" },
      { value: "20+", label: "Qualified Sales Opportunities" },
    ],
  },
  {
    id: 3,
    company: "Aqua",
    description:
      "We rebuilt the marketing strategy and established a professional pricing system, which contributed to doubling monthly sales within a short period.",
    before: { label: "Campaign Testing", value: "Sustainable growth built on strategy" },
    after: { label: "Monthly Sales", value: "SAR 380,000" },
    metrics: [
      { value: "120K → 380K", label: "Monthly Sales Growth" },
      { value: "+216%", label: "Sales Growth Rate" },
      { value: "90 Days", label: "Time to Achieve Growth" },
    ],
  },
  {
    id: 4,
    company: "KINGSTR.EG",
    description:
      "We helped launch an entirely new brand from the ground up, starting with feasibility studies and pricing, through building the identity and strategy, all the way to launching the brand and achieving its first organic sales.",
    before: { label: "Brand Launch Ecosystem", value: "From an idea..to organic sales" },
    after: { label: "Sales Achieved", value: "EGP 30,000" },
    metrics: [
      { value: "100%", label: "Launched From Scratch" },
      { value: "Premium", label: "Sales Without Ad Spend" },
      { value: "EGP 30,000", label: "Sales Within One Month" },
    ],
  },
  {
    id: 5,
    company: "Restaurant Performance",
    description:
      "We rebuilt the restaurant's marketing ecosystem, connecting content, ads, and offers to achieve clear sales growth at the lowest possible cost.",
    before: { label: "Performance Improvement", value: "Increasing sales and improving efficiency" },
    after: { label: "Sales Achieved", value: "EGP 27,000+" },
    metrics: [
      { value: "EGP 1,900", label: "Total Ad Spend" },
      { value: "14.2X", label: "Return on Ad Spend" },
      { value: "67", label: "Conversations with Potential Customers" },
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
  }));

  return (
    <section id="case-studies" className={styles.section}>
      <div className={styles.container}>
        {/* Header متمركز بالكامل في المنتصف */}
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
          {/* Video / Sticky Image Column */}
          <div className={styles.videoCol}>
            <div className={styles.videoWrap}>
              <img
                src={OptimizedVideo}
                alt="Case studies overview"
                className={styles.video}
              />
              <div className={styles.videoGlow} />
            </div>
          </div>

          {/* Cards Column */}
          <div className={styles.cardsCol}>
            {cases.map((c) => (
              <article key={c.id} className={styles.card}>
                <div className={styles.cardText}>
                  <div className={styles.companyHeader}>
                    <h3 className={styles.companyName}>{c.company}</h3>
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
          </div>
        </div>
      </div>
    </section>
  );
}