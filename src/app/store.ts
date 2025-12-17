import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../modules/Auth/authApi";
import authReducer from "../modules/Auth/auth.slice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
    },

    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authApi.middleware),
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch