import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import productSlice from "./product/productSlice";
import filterSlice from "./product/filterSlice";
import cartSlice from "./cart/cartSlice";
import orderSlice from "./order/orderSlice";
const store = configureStore({
  reducer: {
    auth: authSlice,
    product: productSlice,
    filter: filterSlice,
    cart: cartSlice,
    order: orderSlice,
  },
});

export default store;
