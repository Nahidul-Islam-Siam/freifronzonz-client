// redux/slices/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ✅ Product interface (matches your actual data)
export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  description: string;
  discount: string | null;
  category: string;
  bottleSize: string;
  brand: string;
}

// ✅ CartItem interface - NO productId needed, use product id directly
export interface CartItem extends Omit<Product, 'rating' | 'reviews' | 'discount'> {
  quantity: number;
}

// ✅ Cart state
export interface CartState {
  items: CartItem[];
  total: number;
  count: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
  count: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // ✅ Add to cart - expects Product data (without rating/reviews/discount)
    addToCart: (state, action: PayloadAction<Omit<Product, 'rating' | 'reviews' | 'discount'>>) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...newItem,
          quantity: 1,
        });
      }

      state.total = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      state.count = state.items.reduce((sum, item) => sum + item.quantity, 0);
    },

    // ✅ Remove by product ID (string)
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.total = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      state.count = state.items.reduce((sum, item) => sum + item.quantity, 0);
    },

    // ✅ Update quantity by product ID (number)
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (item && quantity > 0) {
        item.quantity = quantity;
        state.total = state.items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        state.count = state.items.reduce((sum, item) => sum + item.quantity, 0);
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.count = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;