import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
    firstName: string;
    lastName: string;
    email: string;
    id: number;
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
    token: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<LoginResponse>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        }
    }
    
})

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;