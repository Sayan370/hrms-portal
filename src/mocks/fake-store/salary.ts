import { fakerEN_IN as faker } from "@faker-js/faker";
import dayjs from "dayjs";

export function createSalaryData(
    id: string,
    empId: string,
    name: string,
    payDate: string,
    payPeriod: string,
    pfNo: string,
    pfUAN: string,
    panNo: string,
    jobRole: string,
    salaryDetails: {
        earnings: Record<string, number>;
        deductions: Record<string, number>;
    }
) {
    return {
        id,
        empId,
        name,
        payDate,
        payPeriod,
        pfNo,
        pfUAN,
        panNo,
        jobRole,
        salaryDetails,
    };
}

export const createSalaryDatas = (rows: number) => {
    return Array.from({ length: rows }, (r, i) => {
        const payDate = faker.date.anytime().toISOString();
        const payPeriod = dayjs(payDate).subtract(1, "month").toISOString();
        return createSalaryData(
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
            payDate,
            payPeriod,
            `${faker.string.alpha(2).toUpperCase()}/${faker.string
                .alpha(4)
                .toUpperCase()}/${faker.string.numeric(
                7
            )}/${faker.string.numeric(3)}/${faker.string.numeric(7)}`,
            faker.string.numeric(12),
            faker.string.alphanumeric(9),
            faker.person.jobArea(),
            {
                earnings: {
                    Basic: faker.number.int({ min: 1000, max: 10000 }),
                    "House Rent Allowance": faker.number.int({
                        min: 1000,
                        max: 10000,
                    }),
                    Overtime: faker.number.int({ min: 1000, max: 10000 }),
                },
                deductions: {
                    "Income Tax": faker.number.int({ min: 100, max: 999 }),
                    "Provident Fund": faker.number.int({ min: 100, max: 999 }),
                    "Loan Deduction": faker.number.int({ min: 100, max: 999 }),
                },
            }
        );
    });
};
