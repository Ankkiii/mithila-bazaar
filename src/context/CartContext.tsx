import React, { createContext, useContext, useReducer, useEffect } from "react";
import { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedWeight: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: "ADD_ITEM"; product: Product; weight?: string }
  | { type: "REMOVE_ITEM"; productId: string }
  | { type: "UPDATE_QUANTITY"; productId: string; quantity: number }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; items: CartItem[] };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  cartCount: number;
  cartTotal: number;
  addToCart: (product: Product, weight?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
} | null>(null);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find(i => i.product.id === action.product.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.product.id === action.product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { product: action.product, quantity: 1, selectedWeight: action.weight || action.product.weight }],
      };
    }
    case "REMOVE_ITEM":
      return { ...state, items: state.items.filter(i => i.product.id !== action.productId) };
    case "UPDATE_QUANTITY":
      if (action.quantity <= 0) {
        return { ...state, items: state.items.filter(i => i.product.id !== action.productId) };
      }
      return {
        ...state,
        items: state.items.map(i =>
          i.product.id === action.productId ? { ...i, quantity: action.quantity } : i
        ),
      };
    case "CLEAR_CART":
      return { ...state, items: [] };
    case "LOAD_CART":
      return { ...state, items: action.items };
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false });

  useEffect(() => {
    try {
      const saved = localStorage.getItem("mithila-cart");
      if (saved) dispatch({ type: "LOAD_CART", items: JSON.parse(saved) });
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem("mithila-cart", JSON.stringify(state.items));
  }, [state.items]);

  const cartCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = state.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  const addToCart = (product: Product, weight?: string) => dispatch({ type: "ADD_ITEM", product, weight });
  const removeFromCart = (productId: string) => dispatch({ type: "REMOVE_ITEM", productId });
  const updateQuantity = (productId: string, quantity: number) => dispatch({ type: "UPDATE_QUANTITY", productId, quantity });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  return (
    <CartContext.Provider value={{ state, dispatch, cartCount, cartTotal, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
