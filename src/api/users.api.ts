import type { User } from "./Auth/interfaces/user.interface";
import api from "./client";
import type { PaginationData } from "./interfaces/paginationData";
import type { CreateUserDate } from "./interfaces/users/createUserData";
import type { UpdateUserData } from "./interfaces/users/updateUserData";

export const createUser = (data: CreateUserDate) => {
    api.post("/user/create", data);
}

export const getUsers = async (paginationData: PaginationData): Promise<{data: User[]; count: number}>  => {
    const response = await api.get("/user/find/all",
        {params: paginationData}
    );

    return response.data;
}

export const getUser = (id: number) => {
    return api.get(`/user/${id}`);
} 

export const updateUser = (id: number, data: UpdateUserData) => {
    return api.patch(`/user/update/${id}`, data);
}