import { HttpStatusCode } from "axios";

import { EmployeeData } from "@/models/responses/employee-data";
import { QueryConst } from "@/constants/query-constants";
import { getErrorString } from "@/utils/object-utils";

import httpService from "../http-service";

export const getEmployee = async () => {
    try {
        const response = await httpService.get<EmployeeData[]>(
            QueryConst.getEmployeesList
        );
        if (response.status === HttpStatusCode.Ok) {
            return response.data;
        }
        throw new Error(getErrorString(response), {
            cause: "Server Notified!",
        });
    } catch (error: any) {
        throw new Error(
            getErrorString(
                error?.response?.data || error?.response?.statusText
            ),
            {
                cause: error,
            }
        );
    }
};

export const setEmployee = async (data: EmployeeData) => {
    try {
        const response = await httpService.post<string>(
            QueryConst.setEmployee,
            data
        );
        if (response.status === HttpStatusCode.Ok) {
            return response.data;
        }
        throw new Error(getErrorString(response), {
            cause: "Server Notified!",
        });
    } catch (error: any) {
        throw new Error(
            getErrorString(
                error?.response?.data || error?.response?.statusText
            ),
            {
                cause: error,
            }
        );
    }
};
