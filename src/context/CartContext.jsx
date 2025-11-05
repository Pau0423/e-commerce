import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

const CartContext = createContext(null);
const initialState = { items: [] };

function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const { item, qty } = action.payload;
      const exist = state.items.find((i) => i.id === item.id);
      const items = exist
        ? state.items.map((i) =>
            i.id === item.id ? { ...i, qty: Math.min(i.qty + qty, 99) } : i
          )
        : [...state.items, { ...item, qty }];
      return { ...state, items };
    }
    case "INC":
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.payload ? { ...i, qty: Math.min(i.qty + 1, 99) } : i
        ),
      };
    case "DEC":
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.payload ? { ...i, qty: Math.max(i.qty - 1, 1) } : i
        ),
      };
    case "REMOVE":
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.payload),
      };
    case "CLEAR":
      return { ...state, items: [] };
    case "LOAD":
      return action.payload ?? state;
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) dispatch({ type: "LOAD", payload: JSON.parse(saved) });
  }, []);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  const totalQty = state.items.reduce((a, i) => a + i.qty, 0);
  const totalPrice = state.items.reduce((a, i) => a + i.qty * i.price, 0);

  const value = useMemo(
    () => ({
      items: state.items,
      totalQty,
      totalPrice,
      add: (item, qty) => dispatch({ type: "ADD", payload: { item, qty } }),
      inc: (id) => dispatch({ type: "INC", payload: id }),
      dec: (id) => dispatch({ type: "DEC", payload: id }),
      remove: (id) => dispatch({ type: "REMOVE", payload: id }),
      clear: () => dispatch({ type: "CLEAR" }),
    }),
    [state.items, totalQty, totalPrice]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
