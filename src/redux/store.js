import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import productSlice from "./product/productSlice";
import filterSlice from "./product/filterSlice";
import cartSlice from "./cart/cartSlice";
const store = configureStore({
  reducer: {
    auth: authSlice,
    product: productSlice,
    filter: filterSlice,
    cart: cartSlice,
  },
});

export default store;
