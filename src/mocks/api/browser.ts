import { setupWorker } from "msw";

import { handlers as authHandlers } from "./authHandlers";
import { handlers as employeeHandlers } from "./employeeHandlers";
import { handlers as userHandlers } from "./userHandlers";
import { handlers as attendanceHandlers } from "./attendanceHandlers";
import { handlers as maintenanceHandlers } from "./maintenanceHandlers";
import { handlers as salaryHandlers } from "./salaryHandlers";
import { handlers as inventoryHandlers } from "./inventoryHandlers";

// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(
    ...authHandlers,
    ...userHandlers,
    ...attendanceHandlers,
    ...employeeHandlers,
    ...maintenanceHandlers,
    ...salaryHandlers,
    ...inventoryHandlers
);
