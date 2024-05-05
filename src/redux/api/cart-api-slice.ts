import { Cart, EditCart } from "@src/shared/types/cart";
import { apiSlice } from "./api-slice";

const cartApi = apiSlice.injectEndpoints({
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
    deleteCart: build.mutation<{ id: number }, number>({
      query: (cartId) => ({
        url: `/carts/${cartId}`,
        method: "DELETE"
      }),
    }),
  }),
});

export const { useGetCartUserQuery, useEditCartMutation, useDeleteCartMutation } = cartApi;
