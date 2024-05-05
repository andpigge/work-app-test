import { Cart, EditCart } from "@src/shared/types/cart";
import { apiSlice } from "./api-slice";

const cartsApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getCartUser: build.query<Cart[], number>({
      query: (userId) => ({
        url: `/carts/user/${userId}`,
        method: "GET",
      }),
    }),
    editCart: build.mutation<{ id: number }, { cartId: number; data: EditCart }>({
      query: ({ cartId, data }) => ({
        url: `/carts/${cartId}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const { useGetCartUserQuery, useEditCartMutation } = cartsApi;
