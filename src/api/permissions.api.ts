import type { Permission } from "./Auth/interfaces/user.interface";
import api from "./client";
import type { PaginationData } from "./interfaces/paginationData";

interface CreatePermissionData{
    name: string;
}

interface UpdatePermissionData{
    name: string;
}

export const createPermission = (data: CreatePermissionData) => {
    return api.post("permission/create",data);
}

export const getAllPermissions = async (): Promise<{data: Permission[], count: number}> => {
    const response = await api.get("permission/find/all");
    return response.data;
}

export const getPermissions = async (paginationData: PaginationData): Promise<{data: Permission[], count: number}> => {
    const response = await api.get("permission/find/all",
        {params: paginationData}
    );
    return response.data;
}


export const updatePermission = (id: number, data: UpdatePermissionData) => {
    return api.patch(`/permission/update/${id}`, data);
}