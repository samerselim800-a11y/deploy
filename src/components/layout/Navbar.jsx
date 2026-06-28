import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { SITE } from "../../lib/site";
import logo from "../../assets/logo.png";
import LanguageSwitcher from "./LanguageSwitcher";
import styles from "./Navbar.module.css";

const NAV = [
  { to: "/", labelKey: "navbar.home" },
  { to: "/about", labelKey: "navbar.about" },
  { to: "/services", labelKey: "navbar.services" },
  { to: "/portfolio", labelKey: "navbar.portfolio" },
  { to: "/contact", labelKey: "navbar.contact" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setOpen(false);

  // تعديل بناء الكلاس البرمجي للهيدر لضمان السلاسة مع الأنيميشن المفتوح
  const headerClass = [
    styles.header,
    scrolled || open ? styles.headerScrolled : styles.headerTransparent,
  ].join(" ");

  return (
    <header className={headerClass}>
      <div className={styles.container}>
        <Link to="/" className={styles.brand} onClick={closeMenu}>
          <img src={logo} alt={SITE.name} className={styles.logo} />
        </Link>

        {/* روابط الديسكتوب مع التحقق الذكي من المسار الحالي للرابط النشط */}
        <nav className={styles.desktopNav}>
          {NAV.map((n) => {
            const isActive = location.pathname === n.to;
            return (
                  <Link 
                    key={n.to} 
                    to={n.to} 
                    onClick={closeMenu}
                    className={`${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
                  >
                {t(n.labelKey)}
              </Link>
            );
          })}
        </nav>

        <div className={styles.actions}>
          <LanguageSwitcher className={styles.langBtn} />

          <Link to="/contact" className={styles.ctaBtn} onClick={closeMenu}>
            {t("buttons.bookConsultation")}
          </Link>

          <button
            className={styles.menuBtn}
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle Menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* منيو استجابة الهواتف المحمولة الفاخر */}
      <AnimatePresence>
        {open && (
          <motion.nav
            className={styles.mobileNav}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className={styles.mobileInner}>
              {NAV.map((n) => {
                const isActive = location.pathname === n.to;
                return (
                  <Link
                    key={n.to}
                    to={n.to}
                    onClick={closeMenu}
                    className={`${styles.mobileLink} ${isActive ? styles.mobileLinkActive : ""}`}
                  >
                    {t(n.labelKey)}
                  </Link>
                );
              })}

              <Link to="/contact" className={styles.mobileCtaBtn} onClick={closeMenu}>
                {t("buttons.bookConsultation")}
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
