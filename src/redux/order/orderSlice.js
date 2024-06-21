import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = {
  cartId: "",
  paymentMethod: "",
  billingDetails: {
    address: "",
    city: "",
    country: "",
    email: "",
    firstname: "",
    lastname: "",
    orderNotes: "",
    state: "",
    tel_whatsapp: "",
  },
  totalPrice: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    SET_STRETCHED_LENGTH: (state, action) => {
      const stretchedLenth = action.payload;
      state.stretchedLenth = stretchedLenth;
    },
    SET_BILLING_DETAILS: (state, action) => {
      const data = action.payload;

      state.billingDetails.address = data.address;
      state.billingDetails.city = data.city;
      state.billingDetails.country = data.country;
      state.billingDetails.email = data.email;
      state.billingDetails.firstname = data.firstname;
      state.billingDetails.lastname = data.lastname;
      state.billingDetails.orderNotes = data.orderNotes;
      state.billingDetails.state = data.state;
      state.billingDetails.tel_whatsapp = data.tel_whatsapp;
    },
    SET_PAYMENT_METHOD: (state, action) => {
      const data = action.payload;
      state.paymentMethod = data.paymentMethod;
    },
  },
});

export default orderSlice.reducer;
export const { SET_STRETCHED_LENGTH, SET_BILLING_DETAILS, SET_PAYMENT_METHOD } =
  orderSlice.actions;

export function useGetBillingDetails() {
  return useSelector((state) => state.order.billingDetails);
}
