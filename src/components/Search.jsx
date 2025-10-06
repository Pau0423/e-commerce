import { useState } from "react";
import styles from "./Search.module.css";

const Search = ({ products }) => {
  const [query, setQuery] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className={styles.search}>
      <input
        type="text"
        placeholder="Buscar producto"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {query && (
        <ul className={styles.searchResults}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <li key={product.id}>{product.name}</li>
            ))
          ) : (
            <li>No se encontraron productos</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Search;
