import { HttpStatusCode } from "axios";
import { getErrorString } from "@/utils/object-utils";
import { QueryConst } from "@/constants/query-constants";
import { AttendanceDailyData, AttendanceDailyFormData, AttendanceData } from "@/models/responses/attendance-data";
import { LeaveData } from "@/models/responses/leave-data";
import httpService from "../http-service";

export const getAttendance = async () => {
    try {
        const response = await httpService.get<AttendanceData[]>(
            QueryConst.getAttendance
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
export const getDailyAttendance = async () => {
    try {
        const response = await httpService.get<AttendanceDailyData[]>(
            QueryConst.getDailyAttendance
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
export const setAttendance = async (data: AttendanceDailyFormData) => {
    try {
        const response = await httpService.post<string>(
            QueryConst.setAttendance,
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

export const getLeave = async () => {
    try {
        const response = await httpService.get<LeaveData[]>(
            QueryConst.getLeave
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