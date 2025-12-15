import { baseApi } from "../../shared/api";

export const authApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<void, { username: string; password: string }>({
            query: ({ username, password }) => ({
                url: "/auth/login",
                method: "POST",
                body: { username, password },
            }),
        }),
    }),
    overrideExisting: true,
});