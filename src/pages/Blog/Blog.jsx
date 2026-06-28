import React from "react";
import { BlogPreview } from "@/components/sections/BlogPreview/BlogPreview";
import { Reveal } from "@/components/sections/Reveal/Reveal";
import styles from "./Blog.module.css";

function BlogPage() {
  // إدارة الـ Meta Tags لعناوين الصفحة وجوجل
  React.useEffect(() => {
    document.title = "Journal — Lumen & Co.";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Essays, playbooks, and field notes from our strategists, designers and growth team."
      );
    }
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className={`position-relative overflow-hidden ${styles.heroSection}`}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <Reveal>
                <p className={`mb-3 text-uppercase ${styles.eyebrow}`}>Journal</p>
                <h1 className={`display-1 fw-normal ${styles.fontDisplay}`}>
                  Field notes
                  <br />& essays.
                </h1>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* مكون استعراض المقالات */}
      <BlogPreview />
    </>
  );
}

export default BlogPage;