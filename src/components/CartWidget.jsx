import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import styles from "./CartWidget.module.css";

export default function CartWidget() {
  const { totalQty } = useCart();
  return (
    <Link to="/cart" className={styles.cart} aria-label="Ir al carrito">
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <path
          fill="currentColor"
          d="M7 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm10 0a2 2 0 1 0 .001 4.001A2 2 0 0 0 17 18ZM3 3h2l2.68 10.39A3 3 0 0 0 10.6 15H18a3 3 0 0 0 2.9-2.17l1.6-5.6A1 1 0 0 0 21.6 6H6.28l-.5-2H3Z"
        />
      </svg>
      {totalQty > 0 && <span className={styles.badge}>{totalQty}</span>}
    </Link>
  );
}
