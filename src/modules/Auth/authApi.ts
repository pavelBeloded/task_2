import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../app/store";
import type { LoginRequest, LoginResponse } from "./auth.slice";


export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://dummyjson.com",

        prepareHeaders: (headers, { getState }) => {
                const token = (getState() as RootState).auth.token;
                if (token) {
                    headers.set("Authorization", `Bearer ${token}`);
                }
                return headers
        }
    }),
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: "/auth/login",
                method: "POST",
                body: credentials,
            })
        }),

    })
})

export const { useLoginMutation } = authApi;