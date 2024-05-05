import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Product = {
  category: string;
  id: number;
  image: string;
  price: number;
  quantity: number;
  title: string;
}

type Total = {
  quantity: number;
  price: number
}

type UserState = {
  cartSuccess: boolean;
  cart: Product[] | null;
  total: Total | null;
  cartId: number | null;
};

const initialState: UserState = {
  cartSuccess: false,
  cart: null,
  total: null,
  cartId: null
};

const getTotal = (cart: Product[]) => {
  return cart.reduce((acc, features) => ({
    quantity: features.quantity + acc.quantity,
    price: acc.price + (features.price * features.quantity)
  }), { quantity: 0, price: 0 })
}

export const cartSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    setCart: (state, action: PayloadAction<Product[] | null>) => {
      state.cart = action.payload;
      state.total = state.cart ? getTotal(state.cart) : null
    },
    setCartId: (state, action: PayloadAction<number>) => {
      state.cartId = action.payload;
    },
    setCartSuccess: (state) => {
      state.cartSuccess = true;
    },
  },
});

export const { setCart, setCartId, setCartSuccess } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
