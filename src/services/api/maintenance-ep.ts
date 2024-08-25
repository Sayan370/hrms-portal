import { HttpStatusCode } from "axios";
import { getErrorString } from "@/utils/object-utils";
import { QueryConst } from "@/constants/query-constants";
import { MaintenanceData, MaintenanceFormData } from "@/models/responses/maintenance-data";
import httpService from "../http-service";

export const getMaintenanceHistoryData = async () => {
    try {
        const response = await httpService.get<MaintenanceData[]>(
            QueryConst.getMaintenanceHistoryList
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
export const setMainenance = async (data: MaintenanceFormData) => {
    try {
        const response = await httpService.post<string>(
            QueryConst.setMaintenance,
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