import { lazy } from "react";
import {
    AccessTime,
    AccountBalance,
    AccountBalanceOutlined,
    BuildOutlined,
    BusinessOutlined,
    HomeOutlined,
    PaymentsOutlined,
    ReceiptLongOutlined,
    SettingsOutlined,
    ShowChartOutlined,
    WorkOff,
} from "@mui/icons-material";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import DashboardOutlined from "@mui/icons-material/DashboardOutlined";
import DescriptionIcon from "@mui/icons-material/Description";
import InventoryIcon from "@mui/icons-material/Inventory";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import { Navigate } from "react-router-dom";

import { RouteConfig } from "@/models/route-config";
import { and, not, or } from "@/utils/bool-utils";
import {
    defineAuthedRoute,
    defineInvisibleRoute,
    defineLayoutRoute,
    defineNonAuthedRoute,
    definePublicRoute,
    suspendedComponent,
} from "@/utils/route-utils";
import ProtectedLayout from "@/layouts/protected-layout";

import inventoryRoutes from "./inventoryRoutes";
import settingsRoutes from "./settingsRotues";

const WIP = suspendedComponent(lazy(() => import("@/pages/wip")));
const ResetPassword = suspendedComponent(
    lazy(() => import("@/pages/reset-password"))
);
const Login = suspendedComponent(lazy(() => import("@/pages/login")));
const Profile = suspendedComponent(lazy(() => import("@/pages/profile")));
const Dashboard = suspendedComponent(lazy(() => import("@/pages/dashboard")));
const TrackAttendance = suspendedComponent(
    lazy(() => import("@/pages/track-attendance"))
);
const Maintenance = suspendedComponent(
    lazy(() => import("@/pages/maintenance"))
);
const InventoryManagement = suspendedComponent(
    lazy(() => import("@/pages/inventory-management"))
);
const TrackLeave = suspendedComponent(
    lazy(() => import("@/pages/track-leave"))
);
const LeaveApplication = suspendedComponent(
    lazy(() => import("@/pages/leave-application"))
);
const Employees = suspendedComponent(
    lazy(() => import("@/pages/manage-employees"))
);
const SalariesPage = suspendedComponent(
    lazy(() => import("@/pages/manage-salary"))
);

const getInternalRoutes = (internalRoutes?: RouteConfig[]): RouteConfig[] => [
    defineInvisibleRoute(
        defineAuthedRoute({
            name: "redirect",
            path: "/",
            element: <Navigate to="/login" replace />,
        })
    ),
    defineInvisibleRoute(
        defineNonAuthedRoute({
            name: "Login",
            title: "Login",
            path: "/login",
            Component: Login,
        })
    ),
    defineInvisibleRoute(
        definePublicRoute({
            name: "Reset Password",
            title: "Reset Password",
            path: "/reset-password/:hash?",
            Component: ResetPassword,
        })
    ),
    defineLayoutRoute({
        Component: ProtectedLayout,
        routes: internalRoutes || [],
    }),
    // definePublicRoute(
    //     defineInvisibleRoute({
    //         name: "Page Not Found",
    //         path: "*",
    //         Component: NotFound,
    //     })
    // ),
    definePublicRoute(
        defineInvisibleRoute({
            name: "Page Not Found",
            path: "*",
            element: <Navigate to="/" replace />,
        })
    ),
];

export const gaurdlessRoutesConfig: RouteConfig[] = getInternalRoutes();

export const routesConfig: RouteConfig[] = getInternalRoutes([
    defineAuthedRoute({
        name: "Dashboard",
        path: "/dashboard",
        icon: <DashboardOutlined />,
        Component: Dashboard,
    }),
    defineAuthedRoute({
        name: "Manage Employees",
        path: "/manage-employees",
        icon: <PersonOutlineIcon />,
        Component: Employees,
        guard: {
            exceptRoles: ["CPO"],
        },
    }),
    defineAuthedRoute({
        name: "Track Attendance",
        path: "/track-attendance",
        icon: <AccessTime />,
        Component: TrackAttendance,
        guard: {
            exceptRoles: ["CPO"],
        },
    }),
    defineAuthedRoute({
        name: "Maintenance",
        path: "/maintenance",
        icon: <BuildCircleIcon />,
        Component: Maintenance,
        guard: {
            allowedRoles: ["CPO"],
        },
    }),
    defineAuthedRoute({
        name: "Track Leave",
        path: "/track-leave",
        icon: <WorkOff />,
        Component: TrackLeave,
        guard: {
            exceptRoles: ["CPO"],
        },
    }),
    defineAuthedRoute({
        name: "Leave Application",
        path: "/leave-application",
        icon: <DescriptionIcon />,
        Component: LeaveApplication,
        guard: {
            exceptRoles: ["CPO"],
        },
    }),
    defineAuthedRoute({
        name: "Manage Salaries",
        path: "/manage-salaries",
        icon: <AccountBalance />,
        Component: SalariesPage,
        guard: {
            exceptRoles: ["CPO"],
        },
    }),
    defineAuthedRoute({
        name: "Inventory",
        path: "/inventory",
        routes: inventoryRoutes,
        icon: <InventoryIcon />,
        guard: {
            allowedRoles: ["CPO"],
        },
    }),
    defineAuthedRoute({
        name: "Settings",
        path: "/settings",
        routes: settingsRoutes,
        icon: <TuneOutlinedIcon />,
        guard: { allowedScopes: or("users.manage", "users.role.view") },
    }),
    defineInvisibleRoute(
        defineAuthedRoute({
            name: "Profile",
            path: "profile",
            Component: Profile,
        })
    ),
]);
