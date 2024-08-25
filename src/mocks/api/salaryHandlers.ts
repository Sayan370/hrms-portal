import { HttpStatusCode } from "axios";
import { rest } from "msw";
import { fakerEN_IN as faker } from "@faker-js/faker";
import { config } from "@/utils/app-config";
import { QueryConst } from "@/constants/query-constants";
import { createSalaryDatas } from "../fake-store/salary";

const baseURL = config.env.API_BASE_URL;

const salaries = createSalaryDatas(20);

export const handlers = [
    rest.get(`${baseURL}${QueryConst.getSalary}`, (req, res, ctx) => {
        return res(ctx.status(HttpStatusCode.Ok), ctx.json(salaries));
    }),
];
