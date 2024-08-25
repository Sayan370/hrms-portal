import { fakerEN_IN as faker } from "@faker-js/faker";
import dayjs from "dayjs";

import {
    RequisitionData,
    StockHistoryCategory,
    StockHistoryData,
} from "@/models/responses/inventory-data";
import { StockMovementItem } from "@/models/responses/stock-movement-data";

export const createStockInventoryDatas = (rows: number) => {
    return Array.from({ length: rows }, (r, i): StockHistoryData => {
        const dateOfRequisition = faker.date.anytime().toISOString();
        const duration = faker.number.int({ min: 0, max: 10 });
        const dateOfPurchase = dayjs(dateOfRequisition)
            .add(duration, "day")
            .toISOString();
        const dateOfRecieving = dayjs(dateOfPurchase)
            .add(duration + faker.number.int({ min: 1, max: 5 }), "day")
            .toISOString();
        const name = faker.helpers.arrayElement([
            "Grease",
            "Lubricant",
            "Nut & Bolt",
            "Air Filter",
            "Oil Filter",
            "AC Filter",
            "Tooth Pin",
        ]);
        const unit =
            name === "Grease" ? "gms" : name === "Lubricant" ? "L" : "Pc";
        return {
            id: faker.string.uuid(),
            name,
            amount: faker.number.int({ min: 10000, max: 90000 }),
            category: faker.helpers.arrayElement([
                StockHistoryCategory.Exc,
                StockHistoryCategory.Tippers,
                StockHistoryCategory.Maintenance_Team,
            ]),
            qty: faker.number.int({ min: 1, max: 1000 }),
            unit,
            rateOfUnit: faker.number.float({
                min: 1,
                max: 1000,
                precision: 0.01,
            }),
            sellerName: faker.company.name(),
            dateOfPurchase,
            dateOfRecieving,
            qtyOfRecieving: faker.number.int({ min: 1, max: 1000 }),
            dateOfRequisition,
            qtyOfRequisition: faker.number.int({ min: 1, max: 1000 }),
            // requesterName: faker.person.fullName(),
            requesterName: faker.helpers.arrayElement([
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
        };
    });
};
export const createStockMovementDatas = (rows: number) => {
    return Array.from({ length: rows }, (r, i): StockMovementItem => {
        const stockInDate = faker.date.anytime().toISOString();
        const duration = faker.number.int({ min: 0, max: 10 });
        const stockOutDate = dayjs(stockInDate)
            .add(duration, "day")
            .toISOString();
        const itemName = faker.helpers.arrayElement([
            "Nut & Bolt",
            "Air Filter",
            "Oil Filter",
            "AC Filter",
            "Tooth Pin",
            "Grease",
        ]);
        const unit = itemName === "Grease" ? "gms" : "pcs";
        return {
            siteName: `Mine ${faker.number.int({ min: 1, max: 3 })}`,
            itemName: `${itemName}`,
            serialNo: faker.string.uuid(),
            balanceStock: `${faker.number.int({
                min: 1,
                max: 1000,
            })} (${unit})`,
            daysInventoryOutstanding: faker.number.int({ min: 1, max: 30 }),
            stockInDate,
            stockOutDate,
        };
    });
};

export const createRequisitionDatas = (rows: number) => {
    return Array.from({ length: rows }, (r, i): RequisitionData => {
        const dateOfRequisition = faker.date.anytime().toISOString();
        const duration = faker.number.int({ min: 0, max: 10 });
        const dateOfPurchase = dayjs(dateOfRequisition)
            .add(duration, "day")
            .toISOString();
        const dateOfRecieving = dayjs(dateOfPurchase)
            .add(duration + faker.number.int({ min: 1, max: 5 }), "day")
            .toISOString();
        const name = faker.helpers.arrayElement([
            "Grease",
            "Lubricant",
            "Nut & Bolt",
            "Air Filter",
            "Oil Filter",
            "AC Filter",
            "Tooth Pin",
        ]);
        const unit =
            name === "Grease" ? "gms" : name === "Lubricant" ? "L" : "Pc";
        return {
            id: faker.number.int({ min: 10000, max: 90000 }).toString(),
            name,
            amount: faker.number.int({ min: 10000, max: 90000 }),
            category: faker.helpers.arrayElement([
                StockHistoryCategory.Exc,
                StockHistoryCategory.Tippers,
                StockHistoryCategory.Maintenance_Team,
            ]),
            qty: faker.number.int({ min: 1, max: 1000 }),
            unit,
            rateOfUnit: faker.number.float({
                min: 1,
                max: 1000,
                precision: 0.01,
            }),
            dateOfRecieving,
            dateOfRequisition,
            // requesterName: faker.person.fullName(),
            requesterName: faker.helpers.arrayElement([
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
            authorizerL1: faker.internet.email(),
            authorizerL2: faker.internet.email(),
        };
    });
};
