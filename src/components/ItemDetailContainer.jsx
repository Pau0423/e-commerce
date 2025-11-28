import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById } from "../data/products";
import { useCart } from "../context/CartContext.jsx";
import styles from "./ItemDetailContainer.module.css";

function ItemCount({ stock = 0, onAdd }) {
  const [qty, setQty] = useState(1);

  if (stock === 0) {
    return <p className={styles.noStock}>Producto sin stock.</p>;
  }

  return (
    <div className={styles.countContainer}>
      <button
        className={styles.countBtn}
        onClick={() => setQty((q) => Math.max(1, q - 1))}
        disabled={qty <= 1}
      >
        -
      </button>

      <span className={styles.countNumber}>{qty}</span>

      <button
        className={styles.countBtn}
        onClick={() => setQty((q) => Math.min(stock, q + 1))}
        disabled={qty >= stock}
      >
        +
      </button>

      <button
        className={styles.addBtn}
        disabled={!stock}
        onClick={() => onAdd?.(qty)}
      >
        Agregar al carrito
      </button>
    </div>
  );
}

export default function ItemDetailContainer() {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const { add } = useCart();

  useEffect(() => {
    setLoading(true);
    setAdded(false);

    getProductById(itemId)
      .then(setItem)
      .finally(() => setLoading(false));
  }, [itemId]);

  const handleAdd = (q) => {
    add(item, q);
    setAdded(true);
  };

  if (loading) return <p className={styles.loading}>Cargando detalle…</p>;
  if (!item)
    return <p className={styles.notFound}>No se encontró el producto.</p>;

  return (
    <article className={styles.card}>
      <img src={item.image} alt={item.title} className={styles.image} />

      <h2 className={styles.title}>{item.title}</h2>
      <p className={styles.description}>{item.description}</p>
      <p className={styles.priceStock}>
        <strong>USD {item.price}</strong> · Stock: {item.stock}
      </p>

      {!added ? (
        <ItemCount stock={item.stock} onAdd={handleAdd} />
      ) : (
        <div className={styles.afterAdd}>
          <p>Producto agregado al carrito ✅</p>
          <div className={styles.links}>
            <Link to="/cart" className={styles.link}>
              Ir al carrito
            </Link>
            <Link to="/" className={styles.link}>
              Seguir comprando
            </Link>
          </div>
        </div>
      )}
    </article>
  );
}
