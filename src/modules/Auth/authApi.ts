import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../app/store";
import type { User, LoginRequest, LoginResponse, LoginResponseRaw, } from "./auth.slice";


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
            }),

            transformResponse: (response: LoginResponseRaw): LoginResponse => {
                return {
                    user: {
                        firstName: response.firstName,
                        lastName: response.lastName,
                        email: response.email,
                        id: response.id,
                        username: response.username,
                        gender: response.gender,
                        image: response.image
                    },
                    token: response.accessToken
                }
            }
        }),

        getMe: builder.query<User, void>({
            query: (credentials) => ({
                url: "auth/me",
                method: "GET",
            })
        })


    })
})

export const { useLoginMutation, useGetMeQuery } = authApi;