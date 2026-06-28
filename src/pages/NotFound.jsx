import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <section
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #121212 0%, #080808 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#ffffff",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <div>
        {/* 404 number */}
        <p
          style={{
            fontSize: "clamp(7rem, 20vw, 14rem)",
            fontWeight: "700",
            lineHeight: "1",
            margin: "0",
            background: "linear-gradient(135deg, #ffc107, #d97706)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "-0.04em",
          }}
        >
          404
        </p>

        {/* Eyebrow */}
        <p
          style={{
            fontSize: "0.75rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#f59e0b",
            marginBottom: "1rem",
          }}
        >
          {t("notFound.badge")}
        </p>

        {/* Heading */}
        <h1
          style={{
            fontSize: "clamp(1.75rem, 4vw, 3rem)",
            fontWeight: "400",
            fontFamily: "var(--font-display, serif)",
            lineHeight: "1.15",
            marginBottom: "1.25rem",
          }}
        >
          {t("notFound.title")}
        </h1>

        {/* Description */}
        <p
          style={{
            color: "rgba(255,255,255,0.60)",
            fontSize: "1.05rem",
            maxWidth: "420px",
            margin: "0 auto 2.5rem",
            lineHeight: "1.7",
          }}
        >
          {t("notFound.description")}
        </p>

        {/* CTA */}
        <Link
          to="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.75rem 1.75rem",
            background: "linear-gradient(135deg, #ffc107, #d97706)",
            color: "#121416",
            fontWeight: "600",
            fontSize: "0.875rem",
            letterSpacing: "0.05em",
            textDecoration: "none",
            borderRadius: "100px",
            transition: "opacity 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          <ArrowLeft size={16} />
          {t("notFound.button")}
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
