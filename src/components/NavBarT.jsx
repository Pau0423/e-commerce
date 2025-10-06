import { useState } from "react";
import CartWidget from "./cart/CartWidget";
import styles from "./NavBar.module.css";
import Logo from "./Logo";
import products from "./products";
import MenuNavLinks from "./MenuNavLinks";
import Search from "./Search";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <MenuNavLinks />
      <Logo />
      <Search products={products} />
      <CartWidget />
    </nav>
  );
};

export default NavBar;
