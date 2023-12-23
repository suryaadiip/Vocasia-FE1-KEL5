import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import CONFIG from "../config/config";

const initialState = {
  isLoading: false,
  errorMessage: '',
  products: [],
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const response = await axios.get(`${CONFIG.baseURL}/products`);
      const updatedProducts = response.data.map((res) => ({
        ...res,
        stock: 20,
      }));
      return updatedProducts;
    }catch (error) {
      throw(error);
    }
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    updateStock: (state, action) => {
      const {id, stock } = action.payload;
      state.products.filter((product) => product.id === id)
      .map((product) => product.stock = stock);
    },
    checkoutProducts: (state, action) => {
      const { productId, quantity } = action.payload;
      
      const product = state.products.find((product) => product.id === productId);
      if (product.stock < quantity) return;

      product.stock -= quantity;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true;
      state.errorMessage = '';
    })
    .addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.errorMessage = '';

      if (!state.products.length) {
        state.products = action.payload;
      }
    })
    .addCase(fetchProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.error.message
    })
  },
});

export const getProductById = (state, productId) => {
  const products = state.products.products;

  if (Array.isArray(products)) {
    return products.find((product) => product.id === Number(productId));
  }

  return null;
};

export const { updateStock, checkoutProducts } = productSlice.actions;
export const getAllProduct = (state) => state.products.products;
export default productSlice.reducer;
