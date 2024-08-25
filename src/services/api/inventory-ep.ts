import { HttpStatusCode } from "axios";
import { getErrorString } from "@/utils/object-utils";
import { QueryConst } from "@/constants/query-constants";
import { AttendanceDailyFormData } from "@/models/responses/attendance-data";
import { RequisitionData, StockHistoryData } from "@/models/responses/inventory-data";
import { StockMovementItem } from "@/models/responses/stock-movement-data";
import httpService from "../http-service";

export const getStockHistoryInventory = async () => {
    try {
        const response = await httpService.get<StockHistoryData[]>(
            QueryConst.getStockHistoryList
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
export const getInventoryMovementData = async () => {
    try {
        const response = await httpService.get<StockMovementItem[]>(
            QueryConst.getStockMovementDataList
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
export const getRequisitionList = async () => {
    try {
        const response = await httpService.get<RequisitionData[]>(
            QueryConst.getRequisitionList
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