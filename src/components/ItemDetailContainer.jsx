import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../data/products";
import { useCart } from "../context/CartContext.jsx"; // ✅ Import del contexto

function ItemCount({ stock = 0, onAdd }) {
  const [qty, setQty] = useState(1);

  return (
    <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
      <button
        onClick={() => setQty((q) => Math.max(1, q - 1))}
        disabled={qty <= 1}
      >
        -
      </button>
      <span>{qty}</span>
      <button
        onClick={() => setQty((q) => Math.min(stock, q + 1))}
        disabled={qty >= stock}
      >
        +
      </button>
      <button
        disabled={!stock}
        onClick={() => onAdd?.(qty)}
        style={{
          background: "#bcd763",
          border: "none",
          padding: "6px 12px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
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
  const { add } = useCart(); // ✅ Usamos la función add del carrito

  useEffect(() => {
    setLoading(true);
    getProductById(itemId)
      .then(setItem)
      .finally(() => setLoading(false));
  }, [itemId]);

  if (loading) return <p style={{ padding: 16 }}>Cargando detalle…</p>;
  if (!item) return <p style={{ padding: 16 }}>No se encontró el producto.</p>;

  return (
    <article
      style={{
        padding: 24,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        background: "#f8f7f7",
        borderRadius: 12,
        border: "1px solid #f4f4f1",
        maxWidth: 600,
        margin: "0 auto",
      }}
    >
      <h2 style={{ color: "#1d1d1d" }}>{item.title}</h2>
      <p style={{ color: "#1d1d1d" }}>{item.description}</p>
      <p>
        <strong style={{ color: "#1d1d1d" }}>USD {item.price}</strong> · Stock:{" "}
        {item.stock}
      </p>
      <ItemCount stock={item.stock} onAdd={(q) => add(item, q)} />
    </article>
  );
}
