import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import styles from "./CartWidget.module.css";

export default function CartWidget() {
  const { totalQty } = useCart();

  return (
    <Link to="/cart" className={styles.cart} aria-label="Ir al carrito">
      <span role="img" aria-label="carrito" className={styles.icon}>
        🛒
      </span>

      {totalQty > 0 && <span className={styles.badge}>{totalQty}</span>}
    </Link>
  );
}
