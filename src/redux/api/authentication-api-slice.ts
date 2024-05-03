import { UserCreate } from "@src/shared/types/user";
import { apiSlice } from "./api-slice";

const authApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    registerUser: build.mutation<{id: number}, UserCreate>({
      query: (data) => ({
        url: "/users/",
        method: "POST",
        body: data,
      }),
    }),
    loginUser: build.mutation<{token: string}, { username: string, password: string }>({
      query: (data) => ({
        url: "/auth/login/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation } = authApi;
