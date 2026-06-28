import { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import styles from "./Loader.module.css";

export default function Loader({ onDone }) {
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setHiding(true), 1800);
    const t2 = setTimeout(() => onDone(), 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  return (
    <div className={`${styles.loader} ${hiding ? styles.hide : ""}`}>
      <div className={styles.inner}>
        <img src={logo} alt="logo" className={styles.logo} />
        <div className={styles.bar}>
          <div className={styles.progress} />
        </div>
      </div>
    </div>
  );
}
