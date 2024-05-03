import { apiSlice } from "./api-slice";

const usersApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<{id: number}, void>({
      query: (data) => ({
        url: "/users?limit=6",
        method: "GET",
        body: data,
      }),
    }),
  }),
});

export const { useLazyGetUsersQuery } = usersApi;
