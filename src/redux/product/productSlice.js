import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import productService from "../../services/productServices";
import { useSelector } from "react-redux";

const initialState = {
  product: null,
  products: [],
  //   category: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: null,
  // totalStoreValue: 0,
  // outOfStock: 0,
};

export const createProduct = createAsyncThunk(
  "product/create",
  async (formData, thunkApi) => {
    try {
      console.log({ formData });
      return await productService.createProduct(formData);
    } catch (error) {
      const message =
        (error.response, error.response.data, error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const getProducts = createAsyncThunk(
  "product/getAll",
  async (_, thunkApi) => {
    try {
      return await productService.getProducts();
    } catch (error) {
      const message =
        (error.response, error.response.data, error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const getProduct = createAsyncThunk(
  "product/getSingle",
  async (id, thunkApi) => {
    try {
      return await productService.getProduct(id);
    } catch (error) {
      const message =
        (error.response, error.response.data, error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/delete",
  async (id, thunkApi) => {
    try {
      return await productService.deleteProduct(id);
    } catch (error) {
      const message =
        (error.response, error.response.data, error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/update",
  async ({ formData, id }, thunkApi) => {
    try {
      return await productService.updateProduct(formData, id);
    } catch (error) {
      const message =
        (error.response, error.response.data, error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
      return thunkApi.rejectWithValue(message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.errorMessage = null;
        toast.success("Product successfully created");
        state.products.push(action.payload);
        console.log(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.errorMessage = action.payload;
        toast.error(action.payload);
        console.log(action.payload);
      })
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.errorMessage = null;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.errorMessage = action.payload;
        toast.error(action.payload);
        console.log(action.payload);
      })
      .addCase(getProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.errorMessage = null;
        state.product = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.errorMessage = action.payload;
        toast.error(action.payload);
        console.log(action.payload);
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.errorMessage = null;
        toast.success("Product deleted successfully");
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.errorMessage = action.payload;
        toast.error(action.payload);
        console.log(action.payload);
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.errorMessage = null;
        state.product = action.payload;
        toast.success("Product updated successfully");
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.errorMessage = action.payload;
        toast.error(action.payload);
        console.log(action.payload);
      });
  },
});

export default productSlice.reducer;

export function useIsLoading() {
  return useSelector((state) => state.product.isLoading);
}

export function useGetProduct() {
  return useSelector((state) => state.product.product);
}

export function useGetProducts() {
  return useSelector((state) => state.product.products);
}

export function useIsError() {
  return useSelector((state) => state.product.isError);
}
