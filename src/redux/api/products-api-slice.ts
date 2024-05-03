import { ProductItem } from "@src/shared/types/product";
import { apiSlice } from "./api-slice";

const productsApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<ProductItem[], void>({
      query: (data) => ({
        url: "/products?limit=6",
        method: "GET",
        body: data,
      }),
    }),
    createProduct: build.mutation<ProductItem, void>({
      query: (data) => ({
        url: "/products/",
        method: "POST",
        body: data,
      }),
    }),
    deleteProduct: build.mutation<ProductItem, number>({
      query: (id) => ({
        url: `/products/${id}/`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetProductsQuery, useCreateProductMutation, useDeleteProductMutation } = productsApi;
