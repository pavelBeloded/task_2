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