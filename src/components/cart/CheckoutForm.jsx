import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useCart } from "../../context/CartContext.jsx";
import { Link } from "react-router-dom";
import styles from "./CheckoutForm.module.css";

export default function CheckoutForm() {
  const { items, totalPrice, clear } = useCart();

  const [buyer, setBuyer] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setBuyer({ ...buyer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!buyer.name || !buyer.email || !buyer.phone) {
      alert("Completa todos los campos");
      return;
    }

    const order = {
      buyer,
      items,
      total: totalPrice,
      date: serverTimestamp(),
    };

    try {
      setLoading(true);
      const ref = collection(db, "orders");
      const doc = await addDoc(ref, order);

      setOrderId(doc.id);
      clear();
    } catch (error) {
      console.error(error);
      alert("Hubo un error generando la orden.");
    } finally {
      setLoading(false);
    }
  };

  if (orderId) {
    return (
      <section className={styles.orderContainer}>
        <h2>¡Gracias por tu compra! 🎉</h2>
        <p>Tu código de orden es:</p>
        <div className={styles.orderId}>{orderId}</div>

        <Link to="/" className={styles.link}>
          Volver al inicio
        </Link>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className={styles.empty}>
        <p>Tu carrito está vacío.</p>
        <Link to="/" className={styles.link}>
          Volver a comprar
        </Link>
      </section>
    );
  }

  return (
    <section className={styles.checkoutCard}>
      <h2 className={styles.title}>Finalizar compra</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Tu nombre"
          value={buyer.name}
          onChange={handleChange}
          className={styles.input}
        />

        <input
          type="email"
          name="email"
          placeholder="Tu email"
          value={buyer.email}
          onChange={handleChange}
          className={styles.input}
        />

        <input
          type="text"
          name="phone"
          placeholder="Tu teléfono"
          value={buyer.phone}
          onChange={handleChange}
          className={styles.input}
        />

        <button disabled={loading} className={styles.button}>
          {loading ? "Procesando…" : "Generar orden"}
        </button>
      </form>
    </section>
  );
}
