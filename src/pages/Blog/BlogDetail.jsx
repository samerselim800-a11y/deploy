import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { BLOG_POSTS } from "@/lib/content";
import { CTABanner } from "@/components/sections/CTABanner";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./BlogDetail.module.css";

function BlogDetail() {
  const { slug } = useParams();

  // جلب بيانات المقال المطابق للـ slug
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  // تحديث الـ Meta Tags عند تحميل المقال بنجاح
  React.useEffect(() => {
    if (post) {
      document.title = `${post.title} — Lumen & Co.`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute("content", post.excerpt);
      }
    }
  }, [post]);

  // في حال كان رابط المقال غير صحيح أو غير موجود (404)
  if (!post) {
    return (
      <div className="d-flex min-vh-screen align-items-center justify-content-center px-3 bg-dark text-white">
        <div className="text-center">
          <h1 className={`display-4 mb-4 ${styles.fontDisplay}`}>Article not found</h1>
          <Link to="/blog" className="text-decoration-none text-warning">
            &larr; Back to journal
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <article className={styles.articleContainer}>
        {/* رأس المقال وعنوانه */}
        <div className="container max-w-760">
          <Reveal>
            <Link
              to="/blog"
              className={`mb-4 d-inline-flex align-items-center gap-2 text-decoration-none text-uppercase ${styles.backLink}`}
            >
              <ArrowLeft className="h-3 w-3" /> Journal
            </Link>
            <p className={`text-uppercase mb-2 ${styles.postMeta}`}>
              {post.category} &middot; {post.date}
            </p>
            <h1 className={`display-4 fw-normal mb-0 ${styles.fontDisplay}`}>
              {post.title}
            </h1>
          </Reveal>
        </div>

        {/* الصورة البارزة للمقال */}
        <Reveal delay={0.1} className="container max-w-1000 mt-5">
          <img
            src={post.image}
            alt={post.title}
            className={`w-100 img-fluid ${styles.featuredImage}`}
            loading="lazy"
          />
        </Reveal>

        {/* متن وجسم المقال التنسيقي */}
        <div className={`container max-w-760 mt-5 ${styles.articleBody}`}>
          <p className="fs-5 text-light opacity-90">{post.excerpt}</p>
          <p>
            The marketing landscape is shifting under our feet. Privacy regulation, the death of the
            third-party cookie, AI-generated content at scale, and the fragmentation of attention
            have rewritten almost every playbook the industry took for granted just five years ago.
          </p>
          <p>
            What hasn't changed is the fundamentals: clear positioning, distinct creative, and the
            discipline to measure what actually drives growth. Here's how we're thinking about the
            year ahead — and what we're advising our clients to bet on.
          </p>
          
          <h2 className={`h3 pt-4 ${styles.fontDisplay}`}>First-party data is the new home field</h2>
          <p>
            The brands winning the next decade will be the ones treating their email list, their app
            users and their loyalty members as their most strategic asset. Build the relationship —
            the channel will follow.
          </p>
          
          <h2 className={`h3 pt-4 ${styles.fontDisplay}`}>Creative is the last unfair advantage</h2>
          <p>
            Algorithms have flattened almost every other lever. The brands that invest in
            distinctive, high-craft creative are the ones that will compound year over year.
          </p>
        </div>
      </article>

      {/* بنر الإجراء السفلي */}
      <CTABanner />
    </>
  );
}

export default BlogDetail;