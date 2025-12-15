import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = "https://dummyjson.com";

export const baseApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: () => ({}),
})