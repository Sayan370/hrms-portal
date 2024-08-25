import { fakerEN_IN as faker } from "@faker-js/faker";
import dayjs from "dayjs";

import { EmployeeStatus } from "@/models/responses/employee-data";
import { getFormattedDate } from "@/utils/date-utils";

function createEmployeeData(
    // id: string,
    empId: string,
    name: string,
    dob: string,
    phone: string,
    gender: string,
    position: string,
    departmentName: string,
    employmentType: string,
    shift: string,
    dateOfJoining: string,
    skill: string,
    site: string,
    status: string
) {
    return {
        // id,
        empId,
        name,
        dob,
        phone,
        gender,
        position,
        departmentName,
        employmentType,
        shift,
        dateOfJoining,
        skill,
        site,
        status,
    };
}

export const createEmployeeDatas = (rows: number) => {
    // const newDate = faker.date.anytime().toISOString();
    return Array.from({ length: rows }, (r, i) => {
        // const status: Record<string, EmployeeStatus> = Array.from(
        //     { length: 100 },
        //     (r, i) => i
        // ).reduce(
        //     (acc, val) => ({
        //         ...acc,
        //         status: faker.helpers.arrayElement(["active", "disabled"]),
        //     }),
        //     {}
        // );
        return createEmployeeData(
            // faker.string.uuid(),
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
            faker.date.birthdate().toISOString(),
            faker.phone.number(),
            faker.helpers.arrayElement(["Male", "Female"]),
            faker.helpers.arrayElement([
                "Driller",
                "Heavy Equipment Operator",
                "Surveyor",
                "Maintenance Technician",
                "Site Manager",
                "HR Admin",
                "Tipper Driver",
                "Accountant",
                "Store-In-Charge",
            ]),
            faker.helpers.arrayElement([
                "Operations",
                "Maintenance",
                "Quality Control",
                "Human Resources (HR)",
                "Finance",
                "Asset Management",
            ]),
            faker.helpers.arrayElement(["Permanent", "Contractual"]),
            faker.helpers.arrayElement(["Morning", "Afternoon", "Night"]),
            faker.date.past().toLocaleDateString(),
            faker.helpers.arrayElement([
                "Unskilled",
                "Semi-skilled",
                "Skilled",
                "Highly skilled",
            ]),
            faker.helpers.arrayElement(["Mine A", "Mine B", "Mine C"]),
            faker.helpers.arrayElement(["Active", "Inactive"])
        );
    });
};
