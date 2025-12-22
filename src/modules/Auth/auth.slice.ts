import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authState, LoginResponse, User } from "./model";



const initialState: authState = {
    user: null,
    token: localStorage.getItem("token"),
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<LoginResponse>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem('token', action.payload.token);
        },

        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload
        },

        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },

        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
        }
    }

})

export const { setCredentials, logout, setToken, setUser } = authSlice.actions;

export default authSlice.reducer;