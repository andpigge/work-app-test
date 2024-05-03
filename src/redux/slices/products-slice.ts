import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductItem } from "@src/shared/types/product";

type UserState = {
  products: ProductItem[] | null;
};

const initialState: UserState = {
  products: null,
};

export const productsSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    setProducts: (state, action: PayloadAction<ProductItem[]>) => {
      state.products = action.payload;
    },
  },
});

export const { setProducts } = productsSlice.actions;

export const productsReducer = productsSlice.reducer;
