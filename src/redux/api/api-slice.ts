import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "typescript-cookie";

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://fakestoreapi.com',
  prepareHeaders: (headers) => {
    const token = getCookie("access_token");

    if (token) {
      headers.set("Authorization", `JWT ${token}`);
    }

    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  endpoints: () => ({}),
});
