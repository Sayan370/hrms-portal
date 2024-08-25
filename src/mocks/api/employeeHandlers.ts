import { HttpStatusCode } from "axios";
import { rest } from "msw";

import { QueryConst } from "@/constants/query-constants";
import { config } from "@/utils/app-config";

import { createEmployeeDatas } from "../fake-store/employees";

const baseURL = config.env.API_BASE_URL;

const employees = createEmployeeDatas(20);

export const handlers = [
    rest.get(`${baseURL}${QueryConst.getEmployeesList}`, (req, res, ctx) => {
        return res(ctx.status(HttpStatusCode.Ok), ctx.json(employees));
    }),
    rest.post(`${baseURL}${QueryConst.setLeaveApplication}`, (req, res, ctx) => {
        return res(ctx.status(HttpStatusCode.Ok), ctx.json("Record has been saved successfully!"));
    }),
];
