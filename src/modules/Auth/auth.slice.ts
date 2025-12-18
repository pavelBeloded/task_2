import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
}

export interface LoginResponseRaw {
    accessToken: string;
    refreshToken: string;
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
}

export interface LoginRequest {
    username: string;
    password: string;
    expiresInMins?: number;
}

export interface LoginResponse {
    user: User;
    token: string;
}

export interface authState {
    user: User | null;
    token: string | null;
}

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