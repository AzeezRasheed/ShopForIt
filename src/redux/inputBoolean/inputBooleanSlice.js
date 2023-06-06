import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = {
  inputBoolean: [],
};

const inputBooleanSlice = createSlice({
  name: "inputBoolean",
  initialState,
  reducers: {
    SET_INPUT_BOOLEAN: (state, action) => {
      state.inputBoolean = action.payload;
    },
  },
});

export const { SET_INPUT_BOOLEAN } = inputBooleanSlice.actions;

export function useSelectInputBoolean() {
  return useSelector((state) => state.inputBoolean.inputBoolean);
}

export default inputBooleanSlice.reducer;
