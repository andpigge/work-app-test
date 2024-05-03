import { GetProductItem, PostProductItem } from "@src/shared/types/product";
import { apiSlice } from "./api-slice";

const productsApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<GetProductItem[], void>({
      query: () => ({
        url: "/products?limit=6",
        method: "GET",
      }),
    }),
    createProduct: build.mutation<GetProductItem, PostProductItem>({
      query: (data) => ({
        url: "/products/",
        method: "POST",
        body: data,
      }),
    }),
    deleteProduct: build.mutation<GetProductItem, number>({
      query: (id) => ({
        url: `/products/${id}/`,
        method: "DELETE",
      }),
    }),
    getProductById: build.query<GetProductItem, number>({
      query: (id) => ({
        url: `/products/${id}/`,
        method: "GET",
      }),
    }),
    editProduct: build.mutation<GetProductItem, {id: number, data: PostProductItem}>({
      query: ({ id, data }) => ({
        url: `/products/${id}/`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const { useGetProductsQuery, useCreateProductMutation, useDeleteProductMutation, useEditProductMutation, useGetProductByIdQuery } = productsApi;
