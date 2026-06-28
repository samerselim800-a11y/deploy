import { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./FAQSection.module.css";

const faqs = [
  {
    question: "What makes EGO STUDIO different from traditional agencies?",
    answer:
      "We are not just an execution agency; we are a growth partner. We do not treat marketing as disconnected posts and ads. Instead, we build a complete, integrated system where content supports ads, ads drive communication, and communication directly secures sales.",
  },
  {
    question: "What core areas does your integrated system cover?",
    answer:
      "Our system bridges three main disciplines under one roof: Business Strategy (market and competitor analysis, brand positioning), Content Matrix (copywriting, video scripts, profile designs), and Paid Media & Performance (Meta ads management, customer journeys, and WhatsApp sales flow optimization).",
  },
  {
    question: "How do you measure campaign and business success?",
    answer:
      "We focus entirely on metrics that impact your business commercial objectives. While we track standard data like CTR, CPC, and CPM, our primary indicator of success is lead quality, trackable conversion paths, and actual sales opportunities created.",
  },
  {
    question: "What commercial sectors do you specialize in?",
    answer:
      "We custom-scope our systems to serve high-intent sectors including private medical services and clinics, real estate and architectural design, digital products and applications, premium local brands, and business providers looking for trackable market expansion.",
  },
  {
    question: "Do you help with existing corporate profiles and materials?",
    answer:
      "Yes, absolutely. One of our specialized services is converting raw business metrics and delivered projects into active corporate sales tools. We restructure portfolios, design professional company profiles, and build simplified case studies that attract high-budget clients.",
  },
  {
    question: "How do your WhatsApp and sales communication services work?",
    answer:
      "We map the customer path right from the ad click down to the closing chat. We improve early conversation structures by writing professional welcome flows, short qualification sequences, and objection reply matrices to help your sales team close deals uniformly.",
  },
  {
    question: "What is your working philosophy on content creation?",
    answer:
      "We believe that effective marketing never starts with a random post. Every piece of creative content must serve a clear objective. We split assets strategically into educational, sales, and conversion content mapped precisely across different stages of the customer decision journey.",
  },
  {
    question: "How do we get started with EGO STUDIO?",
    answer:
      "It starts with a direct consultation call. We analyze your current business situation, identify growth opportunities, and recommend the exact system integration or project setup required to achieve your commercial scaling goals.",
  },
];

const ChevronIcon = () => (
  <svg
    className={styles.chevron}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const QuestionMarkIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#fafafa"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" strokeWidth="3" />
  </svg>
);

const FAQItem = ({ question, answer, isOpen, onClick }) => (
  <div
    className={`${styles.faqItem} ${isOpen ? styles.open : ""}`}
    onClick={onClick}
  >
    <div className={styles.question}>
      <h4 className={styles.questionText}>{question}</h4>
      <ChevronIcon />
    </div>

    <div className={styles.answer}>
      <p className={styles.answerText}>{answer}</p>
    </div>
  </div>
);

export default function FAQSection({ translationPrefix }) {
  const [openIndex, setOpenIndex] = useState(null);
  const { t } = useTranslation();
  const faqItems = translationPrefix
    ? t(`${translationPrefix}.items`, { returnObjects: true })
    : faqs;

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="faq" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>

          {/* Left: Info */}
          <div className={styles.info}>
            <div className={styles.titleSection}>
                <QuestionMarkIcon className={styles.badgeIcon} />
              <span className={styles.badgeText}>
                {translationPrefix ? t(`${translationPrefix}.badge`) : "Frequent Questions"}
              </span>
            </div>

            <h2 className={styles.title}>
              {translationPrefix ? t(`${translationPrefix}.title`) : "Frequently Asked Questions"}
            </h2>

            <p className={styles.description}>
              {translationPrefix
                ? t(`${translationPrefix}.description`)
                : "Find detailed answers about our integrated growth systems, performance tracking, and how we deliver measurable commercial outcomes."}
            </p>

            <div className={styles.accentLine} />
          </div>

          {/* Right: FAQ Items */}
          <div className={styles.faqList}>
            {faqItems.map((faq, i) => (
              <FAQItem
                key={i}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === i}
                onClick={() => toggle(i)}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
