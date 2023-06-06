import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import productSlice from "./product/productSlice";
import filterSlice from "./product/filterSlice";
import cartSlice from "./cart/cartSlice";
import orderSlice from "./order/orderSlice";
import inputBooleanSlice from "./inputBoolean/inputBooleanSlice";
const store = configureStore({
  reducer: {
    auth: authSlice,
    product: productSlice,
    filter: filterSlice,
    cart: cartSlice,
    order: orderSlice,
    inputBoolean:inputBooleanSlice
  },
});

export default store;
