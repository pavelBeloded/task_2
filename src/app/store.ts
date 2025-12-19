import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../modules/Auth/authApi";
import authReducer from "../modules/Auth/auth.slice";
import { recipesApi } from "../modules/Recipes/recipesApi";
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