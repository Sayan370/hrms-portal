import { fakerEN_IN as faker } from "@faker-js/faker";
import dayjs from "dayjs";

import { AttendanceStatus } from "@/models/responses/attendance-data";
import { LeaveType } from "@/models/responses/leave-data";
import { getFormattedDate } from "@/utils/date-utils";

function createAttendanceData(
    id: string,
    empId: string,
    name: string,
    // date: string,
    attendanceStatus: Record<
        string,
        { status: AttendanceStatus; workingHours: number }
    >
) {
    return {
        id,
        empId,
        name,
        // date,
        attendanceStatus,
    };
}

export function createDailyAttendanceData(
    id: string,
    empId: string,
    name: string,
    date: string,
    shift: string,
    profileType: string,
    profile: string,
    inTime: string,
    outTime: string,
    workingHours: number,
    attendanceStatus: AttendanceStatus
) {
    return {
        id,
        empId,
        name,
        date,
        shift,
        profileType,
        profile,
        inTime,
        outTime,
        workingHours,
        attendanceStatus,
    };
}

export function createLeaveData(
    id: string,
    empId: string,
    name: string,
    department: string,
    leaveType: string,
    leaveStartDate: string,
    leaveEndDate: string,
    duration: number,
    status: string,
    approver: string,
    reasonForLeave: string,
    leaveBalance?: Record<LeaveType, number>
) {
    return {
        id,
        empId,
        name,
        department,
        leaveType,
        leaveStartDate,
        leaveEndDate,
        duration,
        status,
        approver,
        reasonForLeave,
        leaveBalance,
    };
}

export const createAttendanceDatas = (rows: number) => {
    const newDate = faker.date.anytime().toISOString();
    const days =
        dayjs(newDate)
            .endOf("month")
            .diff(dayjs(newDate).startOf("month"), "day") + 1;

    return Array.from({ length: rows }, (r, i) => {
        const attendanceStatus: Record<
            string,
            { status: AttendanceStatus; workingHours: number }
        > = Array.from({ length: days }, (r, i) => i).reduce(
            (acc, val) => ({
                ...acc,
                [getFormattedDate(
                    dayjs(newDate)
                        .startOf("month")
                        .add(val, "day")
                        .toISOString(),
                    "DD/MM/YYYY"
                )]: {
                    status: faker.helpers.arrayElement([
                        "leave",
                        "present",
                        "late-arrival",
                        "absent",
                        "over-time",
                    ]),
                    workingHours: faker.number.int({ min: 0, max: 10 }),
                },
            }),
            {}
        );
        return createAttendanceData(
            faker.string.uuid(),
            faker.number.int({ min: 10000, max: 90000 }).toString(),
            // faker.person.fullName(),
            faker.helpers.arrayElement([
                "Ram Anuj Jha",
                "Ram Bilash Yadav",
                "Umesh Kr Singh",
                "Bisheswar Ram",
                "Kashendra Paswan",
                "M.P Chourasia",
                "Sanjeev Kumar Sinha",
                "Tarun Kumar Madheshiya",
                "Rajendera Kumar Mahto",
                "Rajni Kant Mishra",
                "Sunil Kumar",
                "Barun Kumar",
                "Rakesh Kumar",
                "Sahil Sharma",
                "Byas Jee Pandey",
                "Harendra Mishra",
                "Poornjay Kumar Raju",
                "Sanjay Agarwal",
                "Rajesh Kumar",
                "Rahul Mayur",
                "P.K. Ojha",
                "Sahil Sharma",
                "Aditya Raj Suman",
                "Rambabu Singh",
                "Jagnarayan Singh",
                "Kallol Sanyal",
                "Arvind Kumar",
                "S.S. Lal",
                "S.G. Pandey",
                "Upendra Kumar Azad",
                "P.K. Sen",
            ]),
            // faker.date.anytime().toISOString(),
            attendanceStatus
        );
    });
};

export const createDailyAttendanceDatas = (rows: number) => {
    // const newDate = faker.date.anytime().toISOString();
    // const days = dayjs(newDate).endOf("month").diff(dayjs(newDate).startOf("month"), "day") + 1;

    return Array.from({ length: rows }, (r, i) => {
        // const attendanceStatus: Record<string, AttendanceStatus> = Array.from({ length: days }, (r, i) =>
        //     (i)
        // ).reduce((acc, val) => ({ ...acc, [getFormattedDate(dayjs(newDate).startOf("month").add(val, "day").toISOString(), "DD/MM/YYYY")]: faker.helpers.arrayElement(["leave", "present", "late-arrival", "absent", "over-time"]) }), {})
        return createDailyAttendanceData(
            faker.string.uuid(),
            faker.number.int({ min: 10000, max: 90000 }).toString(),
            // faker.person.fullName(),
            faker.helpers.arrayElement([
                "Ram Anuj Jha",
                "Ram Bilash Yadav",
                "Umesh Kr Singh",
                "Bisheswar Ram",
                "Kashendra Paswan",
                "M.P Chourasia",
                "Sanjeev Kumar Sinha",
                "Tarun Kumar Madheshiya",
                "Rajendera Kumar Mahto",
                "Rajni Kant Mishra",
                "Sunil Kumar",
                "Barun Kumar",
                "Rakesh Kumar",
                "Sahil Sharma",
                "Byas Jee Pandey",
                "Harendra Mishra",
                "Poornjay Kumar Raju",
                "Sanjay Agarwal",
                "Rajesh Kumar",
                "Rahul Mayur",
                "P.K. Ojha",
                "Sahil Sharma",
                "Aditya Raj Suman",
                "Rambabu Singh",
                "Jagnarayan Singh",
                "Kallol Sanyal",
                "Arvind Kumar",
                "S.S. Lal",
                "S.G. Pandey",
                "Upendra Kumar Azad",
                "P.K. Sen",
            ]),
            faker.date.anytime().toISOString(),
            faker.helpers.arrayElement(["A", "B", "C"]),
            faker.helpers.arrayElement([
                "Tripper Operator",
                "Excavator Operator",
            ]),
            faker.helpers.arrayElement(["Operator", "Surveyor"]),
            faker.date.anytime().toISOString(),
            faker.date.anytime().toISOString(),
            faker.number.int({ min: 0, max: 10 }),
            faker.helpers.arrayElement([
                "leave",
                "present",
                "late-arrival",
                "absent",
                "over-time",
            ])
        );
    });
};

export const createLeaveDatas = (rows: number) => {
    return Array.from({ length: rows }, (r, i) => {
        const leaveStartDate = faker.date.anytime().toISOString();
        const duration = faker.number.int({ min: 0, max: 10 });
        const leaveEndDate = dayjs(leaveStartDate)
            .add(duration, "day")
            .toISOString();
        const department = faker.helpers.arrayElement([
            "Human Resources",
            "Maintenance",
            "Operator",
            "Driver",
            "Site Management",
            "Finance and Administration",
        ]);
        const leaveType = ["Maintenance", "Operator", "Driver"].includes(
            department
        )
            ? "N/A"
            : faker.helpers.arrayElement([
                "annual-leave",
                "sick-leave",
                "casual-leave",
            ]);
        return createLeaveData(
            faker.string.uuid(),
            faker.number.int({ min: 10000, max: 90000 }).toString(),
            // faker.person.fullName(),
            faker.helpers.arrayElement([
                "Ram Anuj Jha",
                "Ram Bilash Yadav",
                "Umesh Kr Singh",
                "Bisheswar Ram",
                "Kashendra Paswan",
                "M.P Chourasia",
                "Sanjeev Kumar Sinha",
                "Tarun Kumar Madheshiya",
                "Rajendera Kumar Mahto",
                "Rajni Kant Mishra",
                "Sunil Kumar",
                "Barun Kumar",
                "Rakesh Kumar",
                "Sahil Sharma",
                "Byas Jee Pandey",
                "Harendra Mishra",
                "Poornjay Kumar Raju",
                "Sanjay Agarwal",
                "Rajesh Kumar",
                "Rahul Mayur",
                "P.K. Ojha",
                "Sahil Sharma",
                "Aditya Raj Suman",
                "Rambabu Singh",
                "Jagnarayan Singh",
                "Kallol Sanyal",
                "Arvind Kumar",
                "S.S. Lal",
                "S.G. Pandey",
                "Upendra Kumar Azad",
                "P.K. Sen",
            ]),
            department,
            leaveType,
            leaveStartDate,
            leaveEndDate,
            duration,
            faker.helpers.arrayElement(["approved", "pending", "rejected"]),
            faker.internet.email(),
            faker.helpers.arrayElement([
                "Wedding in family",
                "Religious Festival",
                "Travel/Vacation",
                "Broken Leg",
                "Fever",
                "Cold & Cough",
            ]),
            ["Maintenance", "Operator", "Driver"].includes(department)
                ? undefined
                : {
                    "annual-leave": faker.number.int({ min: 0, max: 10 }),
                    "casual-leave": faker.number.int({ min: 0, max: 10 }),
                    "sick-leave": faker.number.int({ min: 0, max: 10 }),
                }
        );
    });
};
