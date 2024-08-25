import { HttpStatusCode } from "axios";
import { rest } from "msw";
import { config } from "@/utils/app-config";
import { QueryConst } from "@/constants/query-constants";
import { createMaintenanceHistoryDatas } from "../fake-store/maintenance";

const baseURL = config.env.API_BASE_URL;

const stockInventory = createMaintenanceHistoryDatas(20);

export const handlers = [
    rest.get(`${baseURL}${QueryConst.getMaintenanceHistoryList}`, (req, res, ctx) => {
        return res(ctx.status(HttpStatusCode.Ok), ctx.json(stockInventory));
    }),
    rest.post(`${baseURL}${QueryConst.setMaintenance}`, (req, res, ctx) => {
        return res(ctx.status(HttpStatusCode.Ok), ctx.json("Record has been saved successfully!"));
    }),
];
