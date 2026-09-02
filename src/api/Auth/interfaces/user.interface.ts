export interface Permission{
    id: number;
    name: string;
}

export interface Role {
    id: number;
    name: string;
    permissions: Permission[];
}

export interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    phone: string;
    avatar_url: string | null;
    is_active: boolean;
    role: Role;
}