import type { Role } from "../../Auth/interfaces/user.interface";

export interface CreateUserDate{
    firstname: string;
    email: string;
    phone: string;
    role?: Role;
}