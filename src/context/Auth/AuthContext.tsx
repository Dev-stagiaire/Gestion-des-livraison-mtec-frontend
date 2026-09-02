import { createContext, useEffect, useState } from "react";
import type { AuthProviderProps } from "./interfaces/AuthProviderProps";
import type { User } from "../../api/Auth/interfaces/user.interface";
import type { LoginData } from "../../api/Auth/interfaces/loginData.interface";
import { loginApi } from "../../api/Auth/auth.api";
import type { AuthContextType } from "./interfaces/AuthContextType.interface";
import { AuthMe } from "../../hooks/authMe";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}: AuthProviderProps){


    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(
        localStorage.getItem("Token")
    );

    const login = async (data: LoginData) => {
        const response = await loginApi(data);
        localStorage.setItem("Token", response.access_token);

        setUser(response.user);
        setToken(response.access_token);
    }

    const logout = async () => {
        localStorage.removeItem("Token");
        setUser(null);
        setToken(null);
    }


    useEffect(() => {

        const token = localStorage.getItem("Token");

        if (!token) {
            setLoading(false);
            return;
        }

        setToken(token);

        AuthMe()
            .then((user) => {
                setUser(user);
            })
            .catch(() => {
                localStorage.removeItem("Token");
                setToken(null);
                setUser(null);
            })
            .finally(() => {
                setLoading(false);
            })

    }, []);

    return(
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthenticated: !!token,
                loading,
                login,
                logout,

            }}
        >
            {children}
        </AuthContext.Provider>
    );

}