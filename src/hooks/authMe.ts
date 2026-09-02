import { getMe } from "../api/Auth/auth.api";
import type { User } from "../api/Auth/interfaces/user.interface";

export async function AuthMe(): Promise<User>{
    return await getMe();
}