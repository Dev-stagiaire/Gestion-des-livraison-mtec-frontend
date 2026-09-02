import type { User } from "./user.interface";

export interface LoginResponse{
    access_token: string;
    user: User;
}