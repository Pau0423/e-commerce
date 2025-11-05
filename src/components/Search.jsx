import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { PRODUCTS } from "../data/products";
import styles from "./Search.module.css";

export default function Search({ placeholder = "Buscar producto..." }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return PRODUCTS.filter((p) => p.title.toLowerCase().includes(q)).slice(
      0,
      8
    );
  }, [query]);

  return (
    <div className={styles.search}>
      <input
        type="search"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Buscar productos"
      />

      {query && (
        <ul className={styles.searchResults}>
          {results.length > 0 ? (
            results.map((p) => (
              <li key={p.id}>
                <Link to={`/item/${p.id}`} onClick={() => setQuery("")}>
                  {p.title}
                </Link>
              </li>
            ))
          ) : (
            <li className={styles.empty}>No se encontraron productos</li>
          )}
        </ul>
      )}
    </div>
  );
}
