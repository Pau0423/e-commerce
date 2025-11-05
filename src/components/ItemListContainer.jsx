import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProducts, getProductsByCategory } from "../data/products";
import styles from "./ItemListContainer.module.css";

const ItemListContainer = ({ greeting }) => {
  const { categoryId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const money = (n) =>
    new Intl.NumberFormat("es-UY", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(n);

  useEffect(() => {
    setLoading(true);
    const p = categoryId ? getProductsByCategory(categoryId) : getProducts();
    p.then(setItems).finally(() => setLoading(false));
  }, [categoryId]);

  if (loading) return <p className={styles.loader}>Cargando productos…</p>;

  if (!loading && items.length === 0) {
    return (
      <section className={styles.wrapper}>
        {categoryId ? (
          <p>No hay productos en la categoría “{categoryId}”.</p>
        ) : (
          <p>No hay productos para mostrar.</p>
        )}
      </section>
    );
  }

  return (
    <section className={styles.wrapper}>
      {greeting && <h2 className={styles.greeting}>{greeting}</h2>}
      {categoryId && <h4>Categoría: {categoryId}</h4>}

      <ul className={styles.grid}>
        {items.map((prod) => (
          <li key={prod.id} className={styles.card}>
            <h3>{prod.title}</h3>
            <p>{money(prod.price)}</p>
            <Link to={`/item/${prod.id}`}>Ver detalle</Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ItemListContainer;
