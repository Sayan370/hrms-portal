import { HttpStatusCode } from "axios";
import { getErrorString } from "@/utils/object-utils";
import { QueryConst } from "@/constants/query-constants";
import { LeaveApplicationFormData } from "@/models/responses/leave-application-data";
import httpService from "../http-service";

export const setLeaveApplication = async (data: LeaveApplicationFormData) => {
    try {
        const response = await httpService.post<string>(
            QueryConst.setLeaveApplication,
            data,
        );
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