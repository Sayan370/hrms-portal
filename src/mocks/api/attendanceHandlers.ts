import { HttpStatusCode } from "axios";
import { rest } from "msw";
import { fakerEN_IN as faker } from "@faker-js/faker";
import { config } from "@/utils/app-config";
import { QueryConst } from "@/constants/query-constants";
import dayjs from "dayjs";
import { createAttendanceDatas, createDailyAttendanceData, createDailyAttendanceDatas, createLeaveDatas } from "../fake-store/attendance";

const baseURL = config.env.API_BASE_URL;

const attendances = createAttendanceDatas(20);
const leaves = createLeaveDatas(20);

export const handlers = [
    rest.get(`${baseURL}${QueryConst.getAttendance}`, (req, res, ctx) => {
        return res(ctx.status(HttpStatusCode.Ok), ctx.json(attendances));
    }),
    rest.get(`${baseURL}${QueryConst.getDailyAttendance}`, (req, res, ctx) => {
        const data = attendances.map(item => {
            const random = faker.number.int({ min: 0, max: 10 });
            const date = Object.keys(item.attendanceStatus)[random];
            const at = item.attendanceStatus[date];
            const workingHour = !["leave", "absent"].includes(at.status) ? faker.number.int({ min: 7, max: 10 }) : 0;
            const inTime = !["leave", "absent"].includes(at.status) ? dayjs(faker.date.anytime().toISOString()).toISOString() : "";
            const outTime = !["leave", "absent"].includes(at.status) ? dayjs(inTime).add(workingHour, "hour").toISOString() : "";
            return createDailyAttendanceData(
                item.id,
                item.empId,
                item.name,
                date,
                faker.helpers.arrayElement(["A", "B", "C"]),
                faker.helpers.arrayElement(["Tripper Operator", "Excavator Operator"]),
                faker.helpers.arrayElement(["Operator", "Surveyor"]),
                inTime,
                outTime,
                workingHour,
                at.status
            )
        })
        return res(ctx.status(HttpStatusCode.Ok), ctx.json(data));
    }),
    rest.post(`${baseURL}${QueryConst.setAttendance}`, (req, res, ctx) => {
        return res(ctx.status(HttpStatusCode.Ok), ctx.json("Record has been saved successfully!"));
    }),
    rest.get(`${baseURL}${QueryConst.getLeave}`, (req, res, ctx) => {
        return res(ctx.status(HttpStatusCode.Ok), ctx.json(leaves));
    }),
];
