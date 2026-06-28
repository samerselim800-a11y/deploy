import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ArrowDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { HERO_SLIDES } from "../../../lib/content";
import { Link } from "react-router-dom";
import mascot from "@/assets/mascot.png";
import styles from "./HeroScrollLock.module.css";

const HERO_SLIDE_KEYS = {
  strategy: "home.hero.slides.strategy",
  social: "home.hero.slides.social",
};

export function HeroScrollLock() {
  const [active, setActive] = useState(0);
  const [locked, setLocked] = useState(true);
  const { t } = useTranslation();
  const lastTrigger = useRef(0);
  const touchStartY = useRef(null);
  const sectionRef = useRef(null);
  const total = HERO_SLIDES.length;

  const advance = useCallback(
    (dir) => {
      const now = Date.now();
      if (now - lastTrigger.current < 850) return; // سرعة تبديل متناسقة مع سرعة الأنيميشن الجديد
      lastTrigger.current = now;
      setActive((curr) => {
        const next = curr + dir;
        if (next < 0) return 0;
        if (next > total - 1) {
          setLocked(false);
          setTimeout(() => {
            window.scrollBy({ top: 1, behavior: "smooth" });
          }, 900);
          return total - 1;
        }
        return next;
      });
    },
    [total],
  );

  useEffect(() => {
    if (!locked) return;
    document.body.style.overflow = "hidden";
    const onWheel = (e) => {
      if (Math.abs(e.deltaY) < 8) return;
      e.preventDefault();
      advance(e.deltaY > 0 ? 1 : -1);
    };
    const onKey = (e) => {
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        advance(1);
      }
      if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        advance(-1);
      }
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
    };
  }, [locked, advance]);

  const onTouchStart = (e) => { touchStartY.current = e.touches[0].clientY; };
  const onTouchEnd = (e) => {
    if (touchStartY.current == null) return;
    const dy = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(dy) >= 50) advance(dy > 0 ? 1 : -1);
    touchStartY.current = null;
  };
  const onTouchMove = (e) => { if (locked) e.preventDefault(); };

  const slide = HERO_SLIDES[active] || HERO_SLIDES[0];
  const slideKey = HERO_SLIDE_KEYS[slide.id];

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onTouchMove={onTouchMove}
      aria-roledescription="carousel"
    >
      {/* Background with Professional Zoom Reveal */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className={styles.bgWrapper}
        >
          <img
            src={slide.image}
            alt=""
            className={styles.bgImage}
            width={1920}
            height={1280}
          />
          <div className={styles.bgOverlayGradient} />
          <div className={styles.bgOverlayColor} />
        </motion.div>
      </AnimatePresence>

      <div className={styles.shapes}>
        <div className={styles.shapeLeft} />
        <div className={styles.shapeRight} />
      </div>

      {/* Mascot Cinematic Blur Slide */}
      <AnimatePresence mode="popLayout">
        <motion.img
          key={`mascot-${active}`}
          src={mascot}
          alt="The Ego Studio mascot"
          initial={{ 
            opacity: 0, 
            x: active === 0 ? 150 : -150, 
            scale: 0.9,
          }}
          animate={{ 
            opacity: 1, 
            x: 0, 
            scale: 1,
          }}
          exit={{ 
            opacity: 0, 
            x: active === 0 ? 80 : -80, 
            scale: 0.95,
          }}
          transition={{ duration: 0.85, ease: [0.25, 1, 0.5, 1] }}
          className={`${styles.mascot} ${active === 1 ? styles.mascotLeft : ""}`}
        />
      </AnimatePresence>

      {/* Content Side Entrance and Alignment */}
      <div className={`${styles.content} ${active === 1 ? styles.contentRight : ""}`}>
        <AnimatePresence mode="popLayout">
          <motion.div
            key={slide.id}
            initial={{ 
              opacity: 0, 
              x: active === 0 ? -120 : 120,
            }}
            animate={{ 
              opacity: 1, 
              x: 0,
            }}
            exit={{ 
              opacity: 0, 
              x: active === 0 ? -60 : 60,
            }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className={styles.slideInner}
          >
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowLine} />
              {t(`${slideKey}.badge`)}
            </div>
            <h1 className={styles.heading}>{t(`${slideKey}.title`)}</h1>
            <p className={styles.desc}>{t(`${slideKey}.description`)}</p>
            <div className={styles.ctaRow}>
              <Link to="/contact" className={styles.ctaPrimary}>
                {t("home.hero.primaryButton")}
                <ArrowRight className={styles.ctaPrimaryIcon} />
              </Link>
              <Link to="/services" className={styles.ctaSecondary}>
                {t("home.hero.secondaryButton")}
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination Layout */}
      <div className={styles.pagination}>
        {HERO_SLIDES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => {
              lastTrigger.current = Date.now();
              setActive(i);
            }}
            aria-label={`Go to slide ${i + 1}`}
            className={styles.pageBtn}
          >
            <span className={i === active ? styles.pageNumActive : styles.pageNumInactive}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className={i === active ? styles.pageLineActive : styles.pageLineInactive} />
          </button>
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        className={styles.scrollHint}
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ArrowDown className={styles.scrollIcon} />
        <p className={styles.scrollText}>
          {active < total - 1 ? t("home.hero.scrollSwipe") : t("home.hero.continue")}
        </p>
      </motion.div>
    </section>
  );
}
