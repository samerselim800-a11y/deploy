import { useEffect, useState, useCallback, useMemo } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar, FaQuoteLeft } from "react-icons/fa";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import styles from "./Testimonials.module.css";

const testimonials = [
  { text: "Aero Marketing transformed our online presence completely.", name: "Ahmed Mohammed", role: "CEO, PACKGO", stars: 5 },
  { text: "Working with Aero Marketing was the best decision.", name: "Sarah Al-Rashid", role: "Marketing Director, SHAHY", stars: 5 },
  { text: "The team's creativity and professionalism is unmatched.", name: "Khalid Al-Fahad", role: "Founder, LEATHER MATE", stars: 4.5 },
  { text: "Strategic approach boosted our visibility.", name: "Mohammed Al-Saud", role: "CEO, AQUA COOL", stars: 4.5 },
  { text: "Exceptional service and outstanding results.", name: "Fatima Al-Omar", role: "Director, SAMA ACADEMY", stars: 5 },
  { text: "They became true partners in growth.", name: "Omar Al-Harbi", role: "Business Owner, PACKGO", stars: 5 },
];

function useVisible() {
  const [visible, setVisible] = useState(3);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setVisible(1);
      else if (window.innerWidth < 1024) setVisible(2);
      else setVisible(3);
    };
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  return visible;
}

function StarRating({ count }) {
  return (
    <div className={styles.starRating}>
      {[1, 2, 3, 4, 5].map((i) => {
        const full = i <= Math.floor(count);
        const half = !full && i === Math.ceil(count) && count % 1 !== 0;
        if (full) return <FaStar key={i} className={styles.starActive} />;
        if (half) return <FaStarHalfAlt key={i} className={styles.starActive} />;
        return <FaRegStar key={i} className={styles.starEmpty} />;
      })}
    </div>
  );
}

export default function Testimonials({ translationPrefix }) {
  const { t } = useTranslation();
  const testimonialItems = useMemo(() => {
    if (!translationPrefix) return testimonials;
    const translatedTestimonials = t(`${translationPrefix}.items`, { returnObjects: true });
    return testimonials.map((item, index) => ({
      ...item,
      ...translatedTestimonials[index],
    }));
  }, [t, translationPrefix]);
  const visible = useVisible();
  const maxIndex = testimonialItems.length - visible;
  const [index, setIndex] = useState(0);

  // reset index when visible count changes to avoid out-of-bounds
  useEffect(() => {
    setIndex((prev) => Math.min(prev, Math.max(0, testimonialItems.length - visible)));
  }, [visible, testimonialItems.length]);

  const next = useCallback(() => setIndex((p) => (p >= maxIndex ? 0 : p + 1)), [maxIndex]);
  const prev = useCallback(() => setIndex((p) => (p <= 0 ? maxIndex : p - 1)), [maxIndex]);

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  const translateX = -(index * (100 / visible));

  return (
    <section id="testimonials" className={styles.testimonials}>
      <div className={styles.contenar}>

        {/* Header */}
        <div className={styles.contentTestimonials}>
          <div className={styles.titleSection}>
            <FaQuoteLeft className={styles.titIcon}  size={18}/>
            <span>{translationPrefix ? t(`${translationPrefix}.badge`) : " Testimonials"}</span>
            
          </div>
          <h3 className={styles.heading}>
            {translationPrefix ? t(`${translationPrefix}.title`) : "What Our Clients Say"}
          </h3>
        </div>

        {/* Slider */}
        <div className={styles.sliderWrap}>
          <button className={styles.arrow} onClick={prev} aria-label="Previous">
            <ChevronLeft size={18} />
          </button>

          <div className={styles.viewport}>
            <div
              className={styles.track}
              style={{ transform: `translateX(${translateX}%)` }}
            >
              {testimonialItems.map((t, i) => (
                <div key={i} className={styles.slide} style={{ flex: `0 0 ${100 / visible}%`, maxWidth: `${100 / visible}%` }}>
                  <div className={styles.testimonialCard}>
                    <FaQuoteLeft className={styles.quoteIcon} />
                    <p>"{t.text}"</p>
                    <div className={styles.testimonialAuthor}>
                      <div className={styles.authorInfo}>
                        <h4>{t.name}</h4>
                        <span>{t.role}</span>
                      </div>
                      <StarRating count={t.stars} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className={styles.arrow} onClick={next} aria-label="Next">
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Dots */}
        <div className={styles.dots}>
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === index ? styles.dotActive : ""}`}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
