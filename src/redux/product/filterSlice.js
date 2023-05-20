import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = {
  filteredProducts: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_PRODUCTS: (state, action) => {
      const { products, search } = action.payload;
      const tempProducts = products.filter(
        (product) =>
          product.title.toLowerCase().includes(search.toLowerCase()) ||
          product.collections.toLowerCase().includes(search.toLowerCase())
        //   product.event.toLowerCase().includes(search.toLowerCase())
      );

      state.filteredProducts = tempProducts;
    },
  },
});

export const { FILTER_PRODUCTS } = filterSlice.actions;

export function useSelectFilteredProducts() {
  return useSelector((state) => state.filter.filteredProducts);
}

export default filterSlice.reducer;
