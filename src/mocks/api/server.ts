import { setupServer } from "msw/node";

import { handlers as authHandlers } from "./authHandlers";
import { handlers as employeeHandlers } from "./employeeHandlers";
import { handlers as userHandlers } from "./userHandlers";
import { handlers as attendanceHandlers } from "./attendanceHandlers";
import { handlers as maintenanceHandlers } from "./maintenanceHandlers";
import { handlers as salaryHandlers } from "./salaryHandlers";
import { handlers as inventoryHandlers } from "./inventoryHandlers";

export const server = setupServer(
    ...authHandlers,
    ...userHandlers,
    ...attendanceHandlers,
    ...employeeHandlers,
    ...maintenanceHandlers,
    ...salaryHandlers,
    ...inventoryHandlers
);
