import type { Role } from "./Auth/interfaces/user.interface";
import api from "./client"
import type { PaginationData } from "./interfaces/paginationData";

interface CreateRoleData{
    name: string;
}

interface UpdateRoleData{
    name: string;
}

export const createRole = (data: CreateRoleData) => {
    return api.post("role/create",data);
}

export const getRoles = async (paginationData: PaginationData): Promise<{data: Role[], count: number}> => {
    const response = await api.get("role/find/all",
        {params: paginationData}
    );
    return response.data;
}

export const getRole = (id: number) => {
    return api.get(`/role/${id}`);
} 

export const updateRole = (id: number, data: UpdateRoleData) => {
    return api.patch(`/role/update/${id}`, data);
}