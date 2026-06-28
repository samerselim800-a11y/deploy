import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { useTranslation } from "react-i18next";
import { STATS } from "@/lib/content";
import styles from "./StatsCounter.module.css";

function Counter({ to, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1600;
    let raf = 0;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur);
      setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

export function StatsCounter({ translationPrefix }) {
  const { t } = useTranslation();

  return (
    <section className={styles.statsSection}>
      {/* استخدام حاويات بوتستراب القياسية للتخطيط السلس */}
      <div className="container">
        <div className="row g-4 justify-content-center">
          {STATS.map((s, i) => (
            <div key={s.label} className="col-6 col-md-3 text-center">
              <div className={styles.counterValue}>
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <p className={styles.counterLabel}>
                {translationPrefix ? t(`${translationPrefix}.items.${i}.label`) : s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
