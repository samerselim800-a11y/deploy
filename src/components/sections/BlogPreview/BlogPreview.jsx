import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { BLOG_POSTS } from "@/lib/content";
import { Reveal, SectionHeading } from "@/components/sections/Reveal/Reveal";
import styles from "./BlogPreview.module.css";

export function BlogPreview({ limit }) {
  const posts = limit ? BLOG_POSTS.slice(0, limit) : BLOG_POSTS;

  return (
    <section className={`position-relative ${styles.blogSection}`}>
      <div className="container">
        <SectionHeading
          eyebrow="Journal"
          title={
            <>
              Ideas from
              <br />
              the studio.
            </>
          }
        />

        {/* شبكة المقالات المتجاوبة */}
        <div className="row g-5 mt-5">
          {posts.map((p, i) => (
            <div key={p.slug} className="col-12 col-md-6 col-lg-4">
              <Reveal delay={i * 0.08}>
                <Link to={`/blog/${p.slug}`} className={`group d-block text-decoration-none ${styles.blogLink}`}>
                  
                  {/* حاوية الصورة */}
                  <div className={`overflow-hidden rounded-4 ${styles.imageContainer}`}>
                    <img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      className={`w-100 ${styles.blogImg}`}
                    />
                  </div>

                  {/* تفاصيل المقال (التاريخ والقسم) */}
                  <div className={`mt-4 d-flex align-items-center gap-2 text-uppercase ${styles.postMeta}`}>
                    <span className={styles.category}>{p.category}</span>
                    <span className="text-muted">&middot;</span>
                    <span className="text-muted">{p.date}</span>
                  </div>

                  {/* عنوان المقال */}
                  <h3 className={`h4 mt-3 fw-normal ${styles.fontDisplay}`}>
                    {p.title}
                  </h3>

                  {/* المقتطف أو الوصف المختصر */}
                  <p className="mt-2 text-muted small lh-base">{p.excerpt}</p>

                  {/* زر القراءة */}
                  <span className={`mt-3 d-inline-flex align-items-center gap-1 small ${styles.readMore}`}>
                    Read article
                    <ArrowUpRight size={16} className={styles.arrowIcon} />
                  </span>

                </Link>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}