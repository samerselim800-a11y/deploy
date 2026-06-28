import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import style from "./buttonMain.module.css";

const ButtonMain = () => {
  const { pathname } = useLocation();
  const { t } = useTranslation();

  if (pathname === "/about") return null;

  return (
    <Link to="/about" className={style.ctaButton}>
      {t("buttons.learnMore")}
    </Link>
  );
};

export default ButtonMain;
