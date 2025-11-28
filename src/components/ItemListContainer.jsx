import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProducts, getProductsByCategory } from "../data/products";
import styles from "./ItemListContainer.module.css";

export default function ItemListContainer({ greeting, query = "" }) {
  const { categoryId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const money = (n) =>
    new Intl.NumberFormat("es-UY", {
      style: "currency",
      currency: "USD",
    }).format(n);

  useEffect(() => {
    setLoading(true);

    if (query.trim() !== "") {
      getProducts().then((all) => {
        const filtered = all.filter((p) =>
          p.title.toLowerCase().includes(query.toLowerCase())
        );
        setItems(filtered);
        setLoading(false);
      });
      return;
    }

    const promise = categoryId
      ? getProductsByCategory(categoryId)
      : getProducts();

    promise.then(setItems).finally(() => setLoading(false));
  }, [categoryId, query]);

  if (loading) return <p className={styles.loader}>Cargando productos…</p>;

  if (items.length === 0) {
    return (
      <section className={styles.wrapper}>
        {query ? (
          <p>No se encontraron resultados para “{query}”.</p>
        ) : categoryId ? (
          <p>No hay productos en la categoría “{categoryId}”.</p>
        ) : (
          <p>No hay productos para mostrar.</p>
        )}
      </section>
    );
  }

  return (
    <section className={styles.wrapper}>
      {greeting && !categoryId && !query && (
        <h2 className={styles.greeting}>{greeting}</h2>
      )}

      <ul className={styles.grid}>
        {items.map((prod) => (
          <li key={prod.id} className={styles.card}>
            <img className={styles.thumb} src={prod.image} alt={prod.title} />

            <div className={styles.body}>
              <h3 className={styles.title}>{prod.title}</h3>
              <p className={styles.price}>{money(prod.price)}</p>
              <Link to={`/item/${prod.id}`} className={styles.link}>
                Ver detalle
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
