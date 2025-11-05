import { useCart } from "../context/CartContext.jsx";

export default function CartPage() {
  const { items, totalPrice, inc, dec, remove, clear } = useCart();
  const money = (n) =>
    new Intl.NumberFormat("es-UY", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(n);

  if (items.length === 0)
    return <section style={{ padding: 24 }}>Tu carrito está vacío.</section>;

  return (
    <section style={{ padding: 24, display: "grid", gap: 16, maxWidth: 800 }}>
      <h2>Carrito</h2>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "grid",
          gap: 12,
        }}
      >
        {items.map((i) => (
          <li
            key={i.id}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto auto auto auto",
              gap: 12,
              alignItems: "center",
              border: "1px solid #f4f4f1",
              borderRadius: 10,
              padding: 12,
              background: "#f8f7f7",
            }}
          >
            <div>
              <strong>{i.title}</strong>
              <div style={{ color: "#555" }}>{money(i.price)}</div>
            </div>
            <button onClick={() => dec(i.id)}>-</button>
            <span style={{ textAlign: "center", minWidth: 24 }}>{i.qty}</span>
            <button onClick={() => inc(i.id)}>+</button>
            <button onClick={() => remove(i.id)} aria-label="Eliminar">
              🗑️
            </button>
          </li>
        ))}
      </ul>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 8,
        }}
      >
        <button onClick={clear}>Vaciar carrito</button>
        <h3>Total: {money(totalPrice)}</h3>
      </div>
    </section>
  );
}
