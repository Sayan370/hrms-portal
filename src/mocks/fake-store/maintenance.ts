import { MaintenanceType } from "@/models/responses/maintenance-data";
import { fakerEN_IN as faker } from "@faker-js/faker";


export const createMaintenanceHistoryDatas = (rows: number) => {
    const maintenanceTasks = [
        "Grease, Qty - 11 Kg",
        "Air Filter Cleaning",
        "Oil Filter Cleaning",
        "AC Filter Cleaning",
        "AC Filter Change",
        "Washing",
        "Hydraulic Oil Change, Qty - 5 Kg",
        "Engine Oil Change, Qty - 5 Kg"
    ];

    return Array.from({ length: rows }).map((data, i) => {
        const randomTasks = faker.helpers.arrayElements(maintenanceTasks, faker.number.int({ min: 2, max: 5 }));
        const randomMinutes = faker.number.int({ min: 0, max: 59 });

        return {
            id: faker.datatype.uuid(),
            doorNo: `Excavator-${i + 1}`,
            date: faker.date.recent({ days: 10 }).toISOString(),
            maintenanceType: faker.helpers.arrayElement([
                MaintenanceType.Daily_Maintenance,
                MaintenanceType.Schedule_Maintenance,
                MaintenanceType.Grease,
                MaintenanceType.Washing,
            ]),
            timeTaken: `${randomMinutes} Mins`,
            maintenanceDone: randomTasks,
            totalTimeTakenDay: `${randomMinutes} Mins`,
            totalTimeTakenVehicle: `Since 1 Jan 24: ${faker.number.int({ min: 15, max: 75 })} Hrs`,
        };
    });
}

