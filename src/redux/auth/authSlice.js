import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";

const name = localStorage.getItem("first_name");
const token = localStorage.getItem("token");

const initialState = {
  isLoggedIn: token && token !== undefined ? true : false,
  first_name: name && name !== undefined ? JSON.parse(name) : null,
  user: {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    isAdmin: null,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_USER: (state, action) => {
      const data = action.payload;
      state.isLoggedIn = true;
      state.user.email = data.email;
      state.user.phone = data.phone;
      state.user.isAdmin = data.isAdmin;
      state.user.last_name = data.lastname;
      state.user.first_name = data.firstname;
      // Store the bearer token in local storage
      localStorage.setItem("token", JSON.stringify(data?.token));
      // Set the default Authorization header for Axios requests
      localStorage.setItem("first_name", JSON.stringify(data?.firstname));
      axios.defaults.headers.common["Authorization"] = `Bearer ${data?.token}`;
    },
  },
});

export default authSlice.reducer;
export const { SET_USER } = authSlice.actions;

export function useFistname() {
  return useSelector((state) => state.auth.firstname);
}

export function useIsUserLoggedIn() {
  return useSelector((state) => state.auth.isLoggedIn);
}

export function useUserData() {
  return useSelector((state) => state.auth.user);
}
