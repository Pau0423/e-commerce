import { useState } from "react";
import styles from "./NavBar.module.css";

const MenuNavLinks = () => {
  const [isOpen, setIsOpen] = useState(false); // ✅ ahora está definido

  return (
    <nav className={styles.navbar}>
      <div className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </div>

      <ul className={`${styles.navLinks} ${isOpen ? styles.open : ""}`}>
        <li>Hogar</li>
        <li>Celulares y tablets</li>
        <li>Electrodomésticos</li>
        <li>Audiovisual</li>
        <li>Gaming</li>
      </ul>
    </nav>
  );
};

export default MenuNavLinks;
