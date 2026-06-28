import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";

const LANGUAGE_STORAGE_KEY = "i18nextLng";

function LanguageSwitcher({ className }) {
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.resolvedLanguage || i18n.language;
  const isArabic = currentLanguage?.startsWith("ar");
  const nextLanguage = isArabic ? "en" : "ar";

  const handleChangeLanguage = () => {
    i18n.changeLanguage(nextLanguage);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
    document.documentElement.lang = nextLanguage;
    document.documentElement.dir = "ltr";
  };

  return (
    <button
      type="button"
      className={className}
      onClick={handleChangeLanguage}
      aria-label={t("common.language")}
    >
      <Languages size={16} />
      <span>{isArabic ? "EN" : "AR"}</span>
    </button>
  );
}

export default LanguageSwitcher;
