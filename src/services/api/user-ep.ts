import { HttpStatusCode } from "axios";

import { MessageData } from "@/models/message-data";
import {
    PaginatedData,
    ServerPaginatedData,
    ServerPaginatedDataWithOffset,
} from "@/models/paginated-data";
import { NotificationFilter } from "@/models/params/notification-filter-data";
import { NotificationData } from "@/models/responses/notification-data";
import { UserData } from "@/models/responses/user-data";
import { UserRoleData } from "@/models/responses/user-role-data";
import { UserScopes } from "@/models/user-scopes";
import { getErrorString } from "@/utils/object-utils";

import { OperationType } from "@/models/enums";
import httpService from "../http-service";

export const getUserRoles = async () => {
    try {
        const response = await httpService.get<UserRoleData[]>("/users/roles");
        if (response.status === HttpStatusCode.Ok) {
            return response.data;
        }
        throw new Error(getErrorString(response), {
            cause: "Server Notified!",
        });
    } catch (error: any) {
        throw new Error(getErrorString(error?.response?.data), {
            cause: error,
        });
    }
};

export const getAllRoles = async () => {
    try {
        const response = await httpService.get<UserScopes[]>("/user/allRoles");
        if (response.status === HttpStatusCode.Ok) {
            return response.data;
        }
        throw new Error(getErrorString(response), {
            cause: "Server Notified!",
        });
    } catch (error: any) {
        throw new Error(getErrorString(error?.response?.data), {
            cause: error,
        });
    }
};

export const getUsers = async () => {
    try {
        const response = await httpService.get<UserData[]>("auth/users");
        if (response.status === HttpStatusCode.Ok) {
            return response.data;
        }
        throw new Error(getErrorString(response), {
            cause: "Server Notified!",
        });
    } catch (error: any) {
        throw new Error(getErrorString(error?.response?.data), {
            cause: error,
        });
    }
};

export const setUser = async (userData: UserData, operation: OperationType) => {
    try {
        const response = await httpService.post<MessageData>(
            "auth/user/createorupdate",
            userData,
            { params: { operation } }
        );
        if (response.status === HttpStatusCode.NoContent) {
            return response.data;
        }
        throw new Error(getErrorString(response), {
            cause: "Server Notified!",
        });
    } catch (error: any) {
        throw new Error(getErrorString(error?.response?.data), {
            cause: error,
        });
    }
};

export const getNotifications = async (
    params: PaginatedData,
    filteredData?: NotificationFilter
) => {
    try {
        const response = await httpService.post<
            ServerPaginatedDataWithOffset<NotificationData[]>
        >("/user/notifications", { ...params, ...filteredData });

        if (response.status === HttpStatusCode.Ok) {
            return response.data;
        }
        throw new Error(getErrorString(response), {
            cause: "Server Notified!",
        });
    } catch (error: any) {
        throw new Error(getErrorString(error?.response?.data), {
            cause: error,
        });
    }
};
