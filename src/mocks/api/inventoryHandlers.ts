import { HttpStatusCode } from "axios";
import { rest } from "msw";
import { config } from "@/utils/app-config";
import { QueryConst } from "@/constants/query-constants";
import { createRequisitionDatas, createStockInventoryDatas, createStockMovementDatas } from "../fake-store/inventory";

const baseURL = config.env.API_BASE_URL;

const stockInventory = createStockInventoryDatas(20);
const stockMovementData = createStockMovementDatas(20);
const reqquisitonList = createRequisitionDatas(20);

export const handlers = [
    rest.get(`${baseURL}${QueryConst.getStockHistoryList}`, (req, res, ctx) => {
        return res(ctx.status(HttpStatusCode.Ok), ctx.json(stockInventory));
    }),
    rest.get(`${baseURL}${QueryConst.getStockMovementDataList}`, (req, res, ctx) => {
        return res(ctx.status(HttpStatusCode.Ok), ctx.json(stockMovementData));
    }),
    rest.post(`${baseURL}${QueryConst.setStockHistoryList}`, (req, res, ctx) => {
        return res(ctx.status(HttpStatusCode.Ok), ctx.json("Record has been saved successfully!"));
    }),
    rest.get(`${baseURL}${QueryConst.getRequisitionList}`, (req, res, ctx) => {
        return res(ctx.status(HttpStatusCode.Ok), ctx.json(reqquisitonList));
    }),
];
