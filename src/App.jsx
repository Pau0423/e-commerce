import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBarT from "./components/NavBarT.jsx";
import ItemListContainer from "./components/ItemListContainer.jsx";
import ItemDetailContainer from "./components/ItemDetailContainer.jsx";
import CartPage from "./components/CartPage.jsx";
import CheckoutForm from "./components/cart/CheckoutForm.jsx";

function App() {
  const [query, setQuery] = useState("");

  return (
    <>
      <NavBarT onSearch={setQuery} />

      <Routes>
        <Route
          path="/"
          element={
            <ItemListContainer
              greeting="Bienvenido a MontevideoImport"
              query={query}
            />
          }
        />
        <Route
          path="/category/:categoryId"
          element={<ItemListContainer query={query} />}
        />
        <Route path="/item/:itemId" element={<ItemDetailContainer />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutForm />} />
      </Routes>
    </>
  );
}

export default App;
