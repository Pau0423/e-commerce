import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { CATEGORIES } from "../data/products";
import Search from "./Search.jsx";
import styles from "./NavBar.module.css";
import logo from "../assets/img.png";
import CartWidget from "./CartWidget.jsx";

export default function NavBarT() {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);
  const close = () => setOpen(false);

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logo} onClick={close}>
        <img src={logo} alt="MontevideoImport" />
        <span>MontevideoImport</span>
      </Link>

      {/* Contenedor derecho: buscador + hamburguesa */}
      <div className={styles.rightSide}>
        <div className={styles.searchBox}>
          {/* Si no tenés Search.jsx, reemplazá por un input */}
          <Search placeholder="Buscar productos..." />
          {/* <input type="search" placeholder="Buscar productos..." /> */}
        </div>
        <CartWidget />
        <button
          className={styles.hamburger}
          onClick={toggle}
          aria-label="Abrir menú"
        >
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </button>
      </div>

      {/* Dropdown dentro del navbar */}
      <ul className={`${styles.navLinks} ${open ? styles.open : ""}`}>
        <li>
          <NavLink to="/" end onClick={close}>
            Todos
          </NavLink>
        </li>
        {CATEGORIES.map((cat) => (
          <li key={cat}>
            <NavLink to={`/category/${cat}`} onClick={close}>
              {cat}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
