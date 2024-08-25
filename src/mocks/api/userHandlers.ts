import { HttpStatusCode } from "axios";
import { rest } from "msw";

import { config } from "@/utils/app-config";

import {
    allRoles,
    createUserDatas,
    createUserNotifications,
    userRoleData,
} from "../fake-store/users";

const baseURL = config.env.API_BASE_URL;

const usersData = createUserDatas(20);
const userNotis = createUserNotifications(200);

export const handlers = [
    rest.get(`${baseURL}/users/roles`, async (req, res, ctx) => {
        return res(ctx.status(HttpStatusCode.Ok), ctx.json(userRoleData));
    }),
    rest.get(`${baseURL}/auth/users`, async (req, res, ctx) => {
        // const page = Number.parseInt(
        //     req.url.searchParams.get("pageNumber") as string
        // );
        // const rowsPerPage = Number.parseInt(
        //     req.url.searchParams.get("rowsPerPage") as string
        // );

        // const maxPage = Math.ceil(usersData.length / rowsPerPage);
        // if (maxPage <= page) {
        //     return res(
        //         ctx.status(HttpStatusCode.BadRequest),
        //         ctx.json({ error: "Array is empty!" })
        //     );
        // }
        // const set = usersData.slice(
        //     rowsPerPage * page,
        //     rowsPerPage * (page + 1)
        // );
        return res(
            ctx.status(HttpStatusCode.Ok),
            ctx.json(usersData)
            // ctx.json({
            //     data: set,
            //     totalnumber: usersData.length,
            // })
        );
    }),
    rest.post(`${baseURL}/auth/user/createorupdate`, async (req, res, ctx) => {
        const { email } = await req.json();

        if (email === usersData[2].email) {
            return res(
                ctx.status(HttpStatusCode.BadRequest),
                ctx.json({ error: "Couldn't Save!" })
            );
        }

        return res(ctx.status(HttpStatusCode.NoContent));
    }),
    rest.get(`${baseURL}/user/allRoles`, (req, res, ctx) => {
        return res(ctx.status(HttpStatusCode.Ok), ctx.json(allRoles));
    }),
    rest.post(`${baseURL}/user/notifications`, async (req, res, ctx) => {
        // const page = Number.parseInt(
        //     req.url.searchParams.get("pageNumber") as string
        // );
        // const rowsPerPage = Number.parseInt(
        //     req.url.searchParams.get("rowsPerPage") as string
        // );
        const { pageNumber: page, rowsPerPage } = await req.json();

        const maxPage = Math.ceil(userNotis.length / rowsPerPage);
        if (maxPage <= page) {
            return res(
                ctx.status(HttpStatusCode.BadRequest),
                ctx.json({ error: "Array is empty!" })
            );
        }
        const set = userNotis.slice(
            rowsPerPage * page,
            rowsPerPage * (page + 1)
        );
        return res(
            ctx.status(HttpStatusCode.Ok),
            ctx.json({
                data: set,
                totalnumber: userNotis.length,
                offset: rowsPerPage * (page + 1),
            })
        );
    }),
];
