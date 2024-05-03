import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetProductItem } from "@src/shared/types/product";

type UserState = {
  productsSuccess: boolean;
  products: GetProductItem[];
};

const initialState: UserState = {
  productsSuccess: false,
  products: [],
};

export const productsSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    setProducts: (state, action: PayloadAction<GetProductItem[]>) => {
      state.products = action.payload;
    },
    setProductsSuccess: (state) => {
      state.productsSuccess = true;
    },
    pushProducts: (state, action: PayloadAction<GetProductItem>) => {
      state.products.unshift(action.payload);
    },
  },
});

export const { setProducts, setProductsSuccess, pushProducts } = productsSlice.actions;

export const productsReducer = productsSlice.reducer;
