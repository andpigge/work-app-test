import { apiSlice } from "./api-slice";

const authApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<{id: number}, void>({
      query: (data) => ({
        url: "/users?limit=5",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLazyGetUsersQuery } = authApi;
