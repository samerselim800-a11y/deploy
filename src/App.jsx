import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Loader from "./components/Loader";
import FloatingActions from "./components/FloatingActions";
import Home from "./pages/Home";
import About from "./pages/AboutPage/About";
import Services from "./pages/Services/Services";
import Portfolio from "./pages/PortfolioPage/Portfolio";
// import Blog from "./pages/Blog/Blog";
import Contact from "./pages/ContactUS/Contact";
import FAQPage from "./pages/FAQ/FAQPage";
import NotFound from "./pages/NotFound";

function App() {
  const [loading, setLoading] = useState(true);
  const { i18n } = useTranslation();
  const currentLanguage = i18n.resolvedLanguage || i18n.language;

  useEffect(() => {
    const language = currentLanguage === "en" ? "en" : "ar";

    document.documentElement.lang = language;
    document.documentElement.dir = "ltr";
  }, [currentLanguage]);

  return (
    <>
      {loading && <Loader onDone={() => setLoading(false)} />}

      {!loading && (
        <>
          <ScrollToTop />
          <FloatingActions />
          <Navbar />

          <Routes>
            <Route path="/"          element={<Home />} />
            <Route path="/about"     element={<About />} />
            <Route path="/services"  element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            {/* <Route path="/blog" element={<Blog />} /> */}
            <Route path="/contact"   element={<Contact />} />
            <Route path="/FAQ"       element={<FAQPage />} />
            <Route path="*"          element={<NotFound />} />

          </Routes>

          <Footer />
        </>
      )}
    </>
  );
}

export default App;
