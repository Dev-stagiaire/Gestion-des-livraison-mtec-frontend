import type { Role } from "../../Auth/interfaces/user.interface";

export interface CreateUserDate{
    first_name: string;
    email: string;
    phone: string;
    role?: Role;
}