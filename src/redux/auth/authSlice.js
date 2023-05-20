import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const firstname = localStorage.getItem("firstname");
const parsedFirstname = firstname ? JSON.parse(firstname) : null;
const initialState = {
  isLoggedIn: false,
  firstname: parsedFirstname ? parsedFirstname : "",
  user: {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    isAdmin: null,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_LOGIN: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    SET_FIRSTNAME: (state, action) => {
      localStorage.setItem("firstname", JSON.stringify(action.payload));
      state.name = action.payload;
    },
    SET_USER: (state, action) => {
      const data = action.payload;
      state.user.firstname = data.firstname;
      state.user.lastname = data.lastname;
      state.user.email = data.email;
      state.user.phone = data.phone;
      state.user.isAdmin = data.isAdmin;
    },
  },
});

export default authSlice.reducer;
export const { SET_LOGIN, SET_USER, SET_FIRSTNAME } = authSlice.actions;

export function useFistname() {
  return useSelector((state) => state.auth.firstname);
}

export function useIsUserLoggedIn() {
  return useSelector((state) => state.auth.isLoggedIn);
}

export function useUserData() {
  return useSelector((state) => state.auth.user);
}
