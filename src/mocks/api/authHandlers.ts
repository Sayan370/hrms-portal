import { fakerEN_IN as faker } from "@faker-js/faker";
import { HttpStatusCode } from "axios";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import jwtEncode from "jwt-encode";
import { rest } from "msw";

import { UserRole } from "@/models/responses/user-role-data";
import { config } from "@/utils/app-config";

import { authUsers, userRoleData } from "../fake-store/users";

dayjs.extend(duration);
const baseURL = config.env.API_BASE_URL;
const secretKey =
    "q384u5q3894u58394uq3894utq4utrq3u48u83494tu8w34n3923i29394598q2u";

export const handlers = [
    rest.post(`${baseURL}/Auth/Login`, async (req, res, ctx) => {
        const { username, password } = await req.json();
        if (
            (username === authUsers.admin.email ||
                username === authUsers.user.email ||
                username === authUsers.hrHead.email ||
                username === authUsers.cpo.email ||
                username === authUsers.super.email) &&
            password === "strong-password"
        ) {
            let user = authUsers.admin;
            switch (username) {
                case authUsers.admin.email:
                    user = authUsers.admin;
                    break;
                case authUsers.super.email:
                    user = authUsers.super;
                    break;
                case authUsers.user.email:
                    user = authUsers.user;
                    break;
                case authUsers.hrHead.email:
                    user = authUsers.hrHead;
                    break;
                case authUsers.cpo.email:
                    user = authUsers.cpo;
                    break;
                default:
                    break;
            }
            const jwt = jwtEncode(
                {
                    id: user.id,
                    // sub: "admin",
                    role: UserRole[user.role],
                    given_name: user.firstName,
                    family_name: user.lastName,
                    email: user.email,
                    phone_number: user.phone,
                    jti: faker.string.uuid(),
                    scp: userRoleData.find(
                        (r) => r.name === UserRole[user.role]
                    )?.scopes,
                    nbf: dayjs().unix(),
                    exp: dayjs().add(1, "day").unix(),
                    iat: dayjs().unix(),
                    iss: "https://localhost:13001",
                    aud: "https://localhost:8173",
                },
                secretKey,
                {
                    alg: "HS256",
                    typ: "JWT",
                }
            );
            return res(
                ctx.status(HttpStatusCode.Ok),
                ctx.json({
                    accessToken: jwt,
                    tokenType: "Bearer",
                    expiresIn: dayjs.duration(1, "d").asSeconds(),
                })
            );
        }
        return res(
            ctx.status(HttpStatusCode.BadRequest),
            ctx.json({
                ServerStatusCode: -9004,
                Message: "Invalid Customer ID",
            })
        );
    }),
    rest.get(`${baseURL}/Auth/Validate`, (req, res, ctx) => {
        return res(ctx.status(HttpStatusCode.Ok));
    }),
    rest.get(`${baseURL}/Auth/Password/Reset/:email`, (req, res, ctx) => {
        const { email } = req.params;
        if (email) {
            if (email === "admin.user@gmail.com")
                return res(
                    ctx.status(HttpStatusCode.BadRequest, "User is disabled")
                );
            if (email === "sic.user@gmail.com")
                return res(
                    ctx.status(HttpStatusCode.NotFound, "User does not exist")
                );
            if (email === "standard.user@gmail.com")
                return res(
                    ctx.status(
                        HttpStatusCode.InternalServerError,
                        "Some Server Error"
                    )
                );
            return res(ctx.status(HttpStatusCode.NoContent));
        }
        return res(ctx.status(HttpStatusCode.NoContent));
    }),
    rest.put(`${baseURL}/Auth/Password/Set`, async (req, res, ctx) => {
        const { requestHash, oldPassword, newPassword } = await req.json();
        if (!requestHash)
            return res(
                ctx.status(
                    HttpStatusCode.BadRequest,
                    "Invalid change password param"
                )
            );
        if (requestHash === "k2")
            return res(
                ctx.status(
                    HttpStatusCode.Gone,
                    "Password reset request expired"
                )
            );
        if (requestHash === "k1")
            return res(ctx.status(HttpStatusCode.NotFound, "User not found"));
        return res(ctx.status(HttpStatusCode.NoContent));
    }),
    rest.put(`${baseURL}/Auth/Password/Change`, async (req, res, ctx) => {
        const { requestHash, oldPassword, newPassword } = await req.json();
        if (!oldPassword)
            return res(
                ctx.status(
                    HttpStatusCode.BadRequest,
                    "Invalid change password param"
                )
            );
        if (oldPassword === "k2")
            return res(
                ctx.status(
                    HttpStatusCode.Gone,
                    "Password reset request expired"
                )
            );
        if (oldPassword === "k1")
            return res(ctx.status(HttpStatusCode.NotFound, "User not found"));
        return res(ctx.status(HttpStatusCode.NoContent));
    }),
    rest.get(`${baseURL}/Auth/Logout`, (req, res, ctx) => {
        return res(
            ctx.status(HttpStatusCode.Ok)
            // ctx.json([])
        );
    }),
];
