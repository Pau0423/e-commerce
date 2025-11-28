import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import styles from "./CartPage.module.css";

export default function CartPage() {
  const { items, totalPrice, inc, dec, remove, clear } = useCart();

  const money = (n) =>
    new Intl.NumberFormat("es-UY", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(n);

  if (items.length === 0) {
    return (
      <section className={styles.empty}>
        <h2>Tu carrito está vacío</h2>
        <p>Cuando agregues productos, los vas a ver acá.</p>
        <Link to="/" className={styles.backLink}>
          Ir al catálogo
        </Link>
      </section>
    );
  }

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>Carrito</h2>

      <ul className={styles.list}>
        {items.map((i) => (
          <li key={i.id} className={styles.item}>
            <div className={styles.info}>
              <strong>{i.title}</strong>
              <div className={styles.sub}>Precio: {money(i.price)}</div>
              <div className={styles.sub}>
                Subtotal: {money(i.price * i.qty)}
              </div>
            </div>

            <button
              className={styles.qtyBtn}
              onClick={() => dec(i.id)}
              aria-label="Disminuir cantidad"
            >
              -
            </button>

            <span className={styles.qty}>{i.qty}</span>

            <button
              className={styles.qtyBtn}
              onClick={() => inc(i.id)}
              aria-label="Aumentar cantidad"
            >
              +
            </button>

            <button
              className={styles.deleteBtn}
              onClick={() => remove(i.id)}
              aria-label="Eliminar"
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>

      <div className={styles.footer}>
        <button className={styles.clearBtn} onClick={clear}>
          Vaciar carrito
        </button>

        <div className={styles.summary}>
          <span className={styles.totalLabel}>Total:</span>
          <span className={styles.totalValue}>{money(totalPrice)}</span>

          <Link to="/checkout" className={styles.checkoutBtn}>
            Finalizar compra
          </Link>
        </div>
      </div>
    </section>
  );
}
