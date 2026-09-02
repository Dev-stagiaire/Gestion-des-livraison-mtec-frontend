import type { LoginData } from "../../../api/Auth/interfaces/loginData.interface";
import type { User } from "../../../api/Auth/interfaces/user.interface";

export interface AuthContextType{
    
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (data: LoginData) => Promise<void>;
    logout: () => void;
}