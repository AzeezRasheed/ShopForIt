import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = {
  cart: [],
  //   items: productData,
  //   totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, quantity } = action.payload;
      const itemInCart = state.cart.find((item) => item.id === id);
      if (itemInCart) {
        itemInCart.quantity += quantity;
      } else {
        state.cart.push({ ...action.payload });
      }
    },
    incrementQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.cart.find((item) => item.id === itemId);
      if (item) {
        item.quantity++;
      }
    },
    decrementQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.cart.find((item) => item.id === itemId);
      if (item && item.quantity > 1) {
        item.quantity--;
      }
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cart = state.cart.filter((item) => item.id !== itemId);
    },
  },
});

export default cartSlice.reducer;
export const { addToCart, incrementQuantity, decrementQuantity, removeItem } =
  cartSlice.actions;

export function useGetCart() {
  return useSelector((state) => state.cart.cart);
}
