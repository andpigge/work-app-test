import { apiSlice } from "./api-slice";

const productsApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<{id: number}, void>({
      query: (data) => ({
        url: "/products?limit=5",
        method: "GET",
        body: data,
      }),
    }),
    createProduct: build.mutation<{id: number}, void>({
      query: (data) => ({
        url: "/products/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetProductsQuery, useCreateProductMutation } = productsApi;
