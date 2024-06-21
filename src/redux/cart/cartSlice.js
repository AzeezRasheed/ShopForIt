import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import cartService from "../../services/cartService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: null,
  carts: sessionStorage.getItem("cartItems")
    ? JSON.parse(sessionStorage.getItem("cartItems"))
    : [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: null,
};

export const createCart = createAsyncThunk(
  "cart/create",
  async (formData, thunkApi) => {
    try {
      console.log({ formData });
      return await cartService.createCart(formData);
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

export const getCarts = createAsyncThunk("cart/getAll", async (_, thunkApi) => {
  try {
    return await cartService.getCarts();
  } catch (error) {
    const message =
      (error.response, error.response.data, error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
    return thunkApi.rejectWithValue(message);
  }
});

export const getCart = createAsyncThunk(
  "cart/getSingle",
  async (id, thunkApi) => {
    try {
      return await cartService.getCart(id);
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

export const deleteCart = createAsyncThunk(
  "cart/delete",
  async (id, thunkApi) => {
    try {
      return await cartService.deleteCart(id);
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

export const updateCart = createAsyncThunk(
  "cart/update",
  async ({ formData, id }, thunkApi) => {
    try {
      return await cartService.updateCart(formData, id);
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

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, quantity } = action.payload;
      const itemInCart = state.carts.find((item) => item.id === id);

      if (itemInCart) {
        itemInCart.quantity += quantity;
      } else {
        state.carts.push({ ...action.payload });
      }

      sessionStorage.setItem("cartItems", JSON.stringify(state.carts));
    },
    incrementQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.carts.find((item) => item.id === itemId);
      if (item) {
        item.quantity++;
      }

      sessionStorage.setItem("cartItems", JSON.stringify(state.carts));
    },
    decrementQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.carts.find((item) => item.id === itemId);
      if (item && item.quantity > 1) {
        item.quantity--;
      }

      sessionStorage.setItem("cartItems", JSON.stringify(state.carts));
    },
    removeItem: (state, action) => {
      const itemId = action.payload;

      const removeItem = state.carts.filter((item) => {
        console.log(itemId, item.id, state.carts, "removed item");

        return item.id !== itemId;
      });

      state.carts = removeItem;

      sessionStorage.setItem("cartItems", JSON.stringify(state.carts));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.errorMessage = null;
        state.carts.push(action.payload);
        toast.success("Cart successfully created");
        console.log(action.payload);
      })
      .addCase(createCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.errorMessage = action.payload;
        toast.error(action.payload);
        console.log(action.payload);
      })
      .addCase(getCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.errorMessage = null;
        state.cart = action.payload;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.errorMessage = action.payload;
        toast.error(action.payload);
        console.log(action.payload);
      })
      .addCase(getCarts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCarts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.errorMessage = null;
        state.products = action.payload;
      })
      .addCase(getCarts.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.errorMessage = action.payload;
        toast.error(action.payload);
        console.log(action.payload);
      })
      .addCase(deleteCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.errorMessage = null;
        toast.success("Cart deleted successfully");
      })
      .addCase(deleteCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.errorMessage = action.payload;
        toast.error(action.payload);
        console.log(action.payload);
      })
      .addCase(updateCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.errorMessage = null;
        state.product = action.payload;
        toast.success("Cart updated successfully");
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.errorMessage = action.payload;
        toast.error(action.payload);
        console.log(action.payload);
      });
  },
});

export default cartSlice.reducer;

export const { addToCart, incrementQuantity, decrementQuantity, removeItem } =
  cartSlice.actions;

export function useIsLoading() {
  return useSelector((state) => state.cart.isLoading);
}

export function useGetCart() {
  return useSelector((state) => state.cart.carts);
}

export function useIsError() {
  return useSelector((state) => state.cart.isError);
}
