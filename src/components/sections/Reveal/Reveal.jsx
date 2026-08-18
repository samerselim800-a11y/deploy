import { motion } from "motion/react";
import styles from "./Reveal.module.css";

const revealVariants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export function Reveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      variants={revealVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({ eyebrow, title, desc }) {
  return (
    <Reveal className={styles.headingWrapper}>
      <p className={styles.eyebrow}>
        <span className={styles.line} />
        <span className={styles.eyebrowText}>{eyebrow}</span>
        <span className={styles.line} />
      </p>

      <h2 className={styles.fontDisplay}>{title}</h2>

      {desc && <p className={styles.descriptionText}>{desc}</p>}
    </Reveal>
  );
}