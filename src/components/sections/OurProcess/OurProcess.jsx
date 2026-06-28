import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./OurProcess.module.css";

const TOTAL_FRAMES = 297; // match actual files in /public/frames-webp
const FRAME_BASE = "/frames-webp/ezgif-frame-";
const PX_PER_FRAME = 6; // pixels of scroll that advance one frame
const DESKTOP_FRAME_STRIDE = 3;
const MOBILE_FRAME_STRIDE = 5;
const PRELOAD_RADIUS = 4;

const STEPS = [
  {
    number: "1",
    key: "analysis",
    startFrame: 1,
    endFrame: 50,
  },
  {
    number: "2",
    key: "positioning",
    startFrame: 51,
    endFrame: 100,
  },
  {
    number: "3",
    key: "system",
    startFrame: 101,
    endFrame: 150,
  },
  {
    number: "4",
    key: "execution",
    startFrame: 151,
    endFrame: 199,
  },
  {
    number: "5",
    key: "review",
    startFrame: 200,
    endFrame: 248,
  },
  {
    number: "6",
    key: "optimization",
    startFrame: 249,
    endFrame: 297,
  },
];

function pad(n) {
  return String(n).padStart(3, "0");
}

function getFrameUrl(frame) {
  return `${FRAME_BASE}${pad(frame)}.webp`;
}

function getAlignedFrame(frame, stride) {
  const aligned = Math.round((frame - 1) / stride) * stride + 1;
  return Math.max(1, Math.min(TOTAL_FRAMES, aligned));
}

export default function OurProcess() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const frameRef = useRef(1);
  const activeStepRef = useRef(0);
  const rafRef = useRef(null);
  const imageCacheRef = useRef(new Set());
  const [currentFrame, setCurrentFrame] = useState(1);
  const [activeStep, setActiveStep] = useState(0);
  const [loaded, setLoaded] = useState(false);

  // Keep decoding work small: load the first frame, then only nearby frames as needed.
  useEffect(() => {
    const firstFrame = new Image();
    firstFrame.onload = firstFrame.onerror = () => setLoaded(true);
    imageCacheRef.current.add(1);
    firstFrame.src = getFrameUrl(1);
  }, []);

  const preloadNearbyFrames = useCallback((frame, stride) => {
    const cache = imageCacheRef.current;

    for (let offset = -PRELOAD_RADIUS; offset <= PRELOAD_RADIUS; offset += 1) {
      const nextFrame = getAlignedFrame(frame + offset * stride, stride);
      if (cache.has(nextFrame)) continue;

      cache.add(nextFrame);
      const img = new Image();
      img.decoding = "async";
      img.src = getFrameUrl(nextFrame);
    }
  }, []);

  // Scroll → frame
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const SCROLL_HEIGHT = TOTAL_FRAMES * PX_PER_FRAME;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const stride = isMobile ? MOBILE_FRAME_STRIDE : DESKTOP_FRAME_STRIDE;

    const updateFrame = () => {
      rafRef.current = null;
      const top = section.getBoundingClientRect().top;
      const scrolled = -top;
      const progress = Math.max(0, Math.min(1, scrolled / SCROLL_HEIGHT));
      const rawFrame = Math.max(
        1,
        Math.min(TOTAL_FRAMES, Math.round(progress * (TOTAL_FRAMES - 1)) + 1),
      );
      const frame = getAlignedFrame(rawFrame, stride);

      if (frame !== frameRef.current) {
        frameRef.current = frame;
        setCurrentFrame(frame);
        preloadNearbyFrames(frame, stride);

        const idx = STEPS.findIndex(
          (s) => frame >= s.startFrame && frame <= s.endFrame,
        );
        if (idx !== -1 && idx !== activeStepRef.current) {
          activeStepRef.current = idx;
          setActiveStep(idx);
        }
      }
    };

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(updateFrame);
    };

    preloadNearbyFrames(1, stride);
    updateFrame();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [preloadNearbyFrames]);

  const scrollHeight = TOTAL_FRAMES * PX_PER_FRAME;

  return (
    <section
      id="our-process"
      className={styles.section}
      ref={sectionRef}
      style={{ height: `calc(100vh + ${scrollHeight}px)` }}
    >
      <div className={styles.sticky}>
        <div className={styles.fadeTop} />
        <div className={styles.fadeBottom} />

        {!loaded && (
          <div className={styles.loading}>
            <div className={styles.spinner} />
            <span>{t("home.process.loading")}</span>
          </div>
        )}

        <img
          src={getFrameUrl(currentFrame)}
          alt="EGO STUDIO Process System"
          className={styles.frame}
          style={{ opacity: loaded ? 1 : 0 }}
        />

        {/* progress dots */}
        <div className={styles.dots}>
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`${styles.dot} ${i === activeStep ? styles.dotActive : ""} ${i < activeStep ? styles.dotDone : ""}`}
            />
          ))}
        </div>

        {/* step card */}
        <div className={styles.content}>
          {STEPS.map((step, i) => (
            <div
              key={step.number}
              className={`${styles.step} ${i === activeStep ? styles.stepActive : ""}`}
            >
              <div className={styles.stepNumber}>{step.number}</div>
              <h3 className={styles.stepTitle}>
                {t(`home.process.steps.${step.key}.title`)
                  .split(" ")
                  .slice(0, -1)
                  .join(" ")}{" "}
                <span>
                  {t(`home.process.steps.${step.key}.title`)
                    .split(" ")
                    .slice(-1)}
                </span>
              </h3>
              <div className={styles.underline} />
              <p className={styles.stepDesc}>
                {t(`home.process.steps.${step.key}.description`)}
              </p>
            </div>
          ))}
        </div>

        {/* scroll hint */}
        {activeStep === 0 && loaded && (
          <div className={styles.scrollHint}>
            <span>{t("home.process.scrollHint")}</span>
            <i className="fas fa-chevron-down" />
          </div>
        )}
      </div>
    </section>
  );
}
