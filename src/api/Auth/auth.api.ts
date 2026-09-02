import api from "../client";
import type { LoginData } from "./interfaces/loginData.interface";
import type { LoginResponse } from "./interfaces/loginResponse.interface";
import type { User } from "./interfaces/user.interface";

export async function loginApi({email, password}: LoginData): Promise<LoginResponse>{

    console.log({email, password})
    const response = await api.post("/auth/login", {email, password});

    if(!response){
        throw new Error("Email ou mot de passe incorrect");
    }
    return response.data;
} 

export async function getMe(): Promise<User>{
    
    const response = await api.get("auth/me");
    return response.data;
} 
