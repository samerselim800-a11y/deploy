import styles from "./ServicesGrid.module.css";
import OptimizedVideo from "../../OptimizedVideo";
import { Flame, ChartLine, BarChart3, Rocket } from "lucide-react";
import { useTranslation } from "react-i18next";

export function ServicesGrid({ translationPrefix }) {
  const { t } = useTranslation();

  return (
    <section className={styles.howWeWork}>
      <div className={styles.container}>
        <div className={styles.contentHowWeWork}>
          <div className={styles.titleSection}>
            <Flame size={23} />
            <span>{translationPrefix ? t(`${translationPrefix}.badge`) : "How We Work"}</span>
          </div>

          <h2>
            {translationPrefix ? t(`${translationPrefix}.title`) : "Marketing That"}
            <br />
            {translationPrefix ? t(`${translationPrefix}.titleSecondLine`) : "Drives Revenue"}
          </h2>

          <p>
            {translationPrefix
              ? t(`${translationPrefix}.description`)
              : "We turn marketing into measurable growth through data-driven strategies and optimized funnels."}
          </p>
        </div>
        

        <div className={styles.featureGrid}>
          {/* Card 1 */}
          <div className={styles.featureCard}>
            <div className={styles.cardTop}>
              <div className={styles.iconBox}>
                <ChartLine size={22} />
              </div>

              <h3>
                {translationPrefix ? t(`${translationPrefix}.items.salesFirst.title`) : "Sales-First"}
                <br />
                {translationPrefix ? t(`${translationPrefix}.items.salesFirst.titleSecondLine`) : "Approach"}
              </h3>

              <div className={styles.line}></div>

              <p>
                {translationPrefix
                  ? t(`${translationPrefix}.items.salesFirst.description`)
                  : "We prioritize real revenue and profitability over vanity metrics like impressions or likes."}
              </p>
            </div>

            <div className={styles.videoWrapper}>
              <OptimizedVideo
                webmSrc="/videos/vid1.webm"
                mp4Src="/videos/vid1.mp4"
                poster="/videos/vid1-poster.webp"
                className={styles.cardVideo}
                ariaLabel="Sales-first marketing animation"
              />
              <div className={styles.videoOverlay}></div>
            </div>
          </div>

          {/* Card 2 */}
          <div className={styles.featureCard}>
            <div className={styles.cardTop}>
              <div className={styles.iconBox}>
                <BarChart3 size={22} />
              </div>

              <h3>
                {translationPrefix ? t(`${translationPrefix}.items.dataDriven.title`) : "Data-Driven"}
                <br />
                {translationPrefix ? t(`${translationPrefix}.items.dataDriven.titleSecondLine`) : "Decisions"}
              </h3>

              <div className={styles.line}></div>

              <p>
                {translationPrefix
                  ? t(`${translationPrefix}.items.dataDriven.description`)
                  : "All strategies rely on performance data and conversions."}
              </p>
            </div>

            <div className={styles.videoWrapper}>
              <OptimizedVideo
                webmSrc="/videos/vid2.webm"
                mp4Src="/videos/vid2.mp4"
                poster="/videos/vid2-poster.webp"
                className={`${styles.cardVideo} ${styles.globeVideo}`}
                ariaLabel="Data-driven decisions animation"
              />
              <div className={styles.videoOverlay}></div>
            </div>
          </div>

          {/* Card 3 */}
          <div className={styles.featureCard}>
            <div className={styles.cardTop}>
              <div className={styles.iconBox}>
                <Rocket size={22} />
              </div>

              <h3>
                {translationPrefix ? t(`${translationPrefix}.items.fastExecution.title`) : "Fast Execution"}
                <br />
                {translationPrefix ? t(`${translationPrefix}.items.fastExecution.titleSecondLine`) : "& Optimization"}
              </h3>

              <div className={styles.line}></div>

              <p>
                {translationPrefix
                  ? t(`${translationPrefix}.items.fastExecution.description`)
                  : "Campaigns launch fast and are continuously optimized."}
              </p>
            </div>

            <div className={styles.videoWrapper}>
              <OptimizedVideo
                webmSrc="/videos/vid3.webm"
                mp4Src="/videos/vid3.mp4"
                poster="/videos/vid3-poster.webp"
                className={styles.cardVideo}
                ariaLabel="Fast execution animation"
              />
              <div className={styles.videoOverlay}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServicesGrid;
