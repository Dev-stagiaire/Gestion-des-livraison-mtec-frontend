import type { User } from "./Auth/interfaces/user.interface";
import api from "./client";
import type { PaginationData } from "./interfaces/paginationData";
import type { ActivateUserAccountData } from "./interfaces/users/activateUserAccountData";
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

export const getUser = async (id: number) => {
    const response = await api.get(`/user/find/${id}`);
    return response.data;
} 

export const updateUser = (id: number, data: UpdateUserData) => {
    return api.patch(`/user/update/${id}`, data);
}

export const activateUserAccount = (token: string, data: ActivateUserAccountData) => {
    return api.post(`user/activate/account`, 
        {
            data,
            params: token
        }
    );
}

export const resendUserToken = async (id: number) => {
    const response = await api.get(`user/resend/token/${id}`);
    return response.data;
}