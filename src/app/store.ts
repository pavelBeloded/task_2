import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../modules/auth/api";
import authReducer from "../modules/auth/auth.slice";
import { recipesApi } from "../modules/recipe/api";
import {rtkQueryErrorLogger} from "../middleware/authMiddleware";
export const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [recipesApi.reducerPath]: recipesApi.reducer,
    },

    middleware: getDefaultMiddleware => getDefaultMiddleware()
    .concat(authApi.middleware)
    .concat(recipesApi.middleware)
    .concat(rtkQueryErrorLogger),
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch