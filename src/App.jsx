import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBarT.jsx";
import ItemListContainer from "./components/ItemListContainer.jsx";
import ItemDetailContainer from "./components/ItemDetailContainer.jsx";
import CartPage from "./components/CartPage.jsx"; // ✅ Importar el carrito

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <ItemListContainer greeting="Bienvenido a MontevideoImport" />
          }
        />
        <Route path="/category/:categoryId" element={<ItemListContainer />} />
        <Route path="/item/:itemId" element={<ItemDetailContainer />} />
        <Route path="/cart" element={<CartPage />} /> {/* ✅ Nueva ruta */}
        <Route
          path="*"
          element={<p style={{ padding: 16 }}>404 · Página no encontrada</p>}
        />
      </Routes>
    </>
  );
}
export default App;
