import { lazy } from "react";
import { Reorder, Subject } from "@mui/icons-material";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";

import { RouteConfig } from "@/models/route-config";
import {
    defineAuthedRoute,
    defineInvisibleRoute,
    suspendedComponent,
} from "@/utils/route-utils";

const WIP = suspendedComponent(lazy(() => import("@/pages/wip")));
const Users = suspendedComponent(lazy(() => import("@/pages/users")));
const UserRoles = suspendedComponent(lazy(() => import("@/pages/user-roles")));

const settingsRoutes: RouteConfig[] = [
    defineAuthedRoute({
        name: "Users",
        path: "users",
        Component: Users,
        title: "Settings | Users",
        guard: { allowedScopes: "users.manage" },
        icon: <ManageAccountsOutlinedIcon />,
    }),
    defineAuthedRoute({
        name: "Roles",
        path: "roles",
        Component: UserRoles,
        title: "Settings | Roles",
        icon: <AdminPanelSettingsOutlinedIcon />,
        guard: { allowedScopes: "users.role.view" },
    }),
];

export default settingsRoutes;
