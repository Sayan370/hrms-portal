import { SalaryData } from "@/models/responses/salary-data";
import { QueryConst } from "@/constants/query-constants";

import { getErrorString } from "@/utils/object-utils";
import { HttpStatusCode } from "axios";
import httpService from "../http-service";

export const getSalary = async () => {
    try {
        const response = await httpService.get<SalaryData[]>(
            QueryConst.getSalary
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