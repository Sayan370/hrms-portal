import { lazy } from "react";
import {
    Download,
    LocalShipping,
    MoveToInbox,
    Publish,
    Reorder,
    Subject,
} from "@mui/icons-material";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import InventoryIcon from "@mui/icons-material/Inventory";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";

import { RouteConfig } from "@/models/route-config";
import {
    defineAuthedRoute,
    defineInvisibleRoute,
    suspendedComponent,
} from "@/utils/route-utils";

const InventoryManagement = suspendedComponent(
    lazy(() => import("@/pages/inventory-management"))
);
const RequisitionManagement = suspendedComponent(
    lazy(() => import("@/pages/requisition-management"))
);
const StockMovement = suspendedComponent(
    lazy(() => import("@/pages/stock-movement"))
);

const inventoryRoutes: RouteConfig[] = [
    defineAuthedRoute({
        name: "Stock History",
        path: "stock-history",
        icon: <Download />,
        Component: InventoryManagement,
        // guard: { allowedScopes: "users.manage" },
    }),
    defineAuthedRoute({
        name: "Requisitions",
        path: "requisitions",
        icon: <Publish />,
        Component: RequisitionManagement,
        // guard: { allowedScopes: "users.manage" },
    }),
    defineAuthedRoute({
        name: "Stock Movement",
        path: "stock-movement",
        icon: <MoveToInbox />,
        Component: StockMovement,
    }),
];

export default inventoryRoutes;
