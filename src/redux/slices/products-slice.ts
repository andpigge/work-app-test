import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetProductItem } from "@src/shared/types/product";

type UserState = {
  productsSuccess: boolean;
  products: GetProductItem[] | null;
};

const initialState: UserState = {
  productsSuccess: false,
  products: null,
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
  },
});

export const { setProducts, setProductsSuccess } = productsSlice.actions;

export const productsReducer = productsSlice.reducer;
