import * as React from "react";
import {
    ChevronLeftRounded,
    Edit,
    ExitToAppRounded,
    Notifications,
    NotificationsNone,
} from "@mui/icons-material";
import {
    Avatar,
    Badge,
    Drawer,
    makeStyles,
    Tooltip,
    Typography,
} from "@mui/material";
import clsx from "clsx";
import { NavLink } from "react-router-dom";

import { RouteConfig } from "@/models/route-config";
import { AuthedRoutes } from "@/constants/route-constants";
import { renderIfNotUserRoles, renderIfUserRoles } from "@/utils/render-utils";
import { useAuthentication } from "@/hooks/useAuthetication";
import { AppButton } from "@/components/form";
import Scrollable from "@/components/scrollable";
import ThemeSwitch from "@/components/theme-switcher";

import useNavbar from "../hooks/useNavbar";
import BrandLogo from "./brand-logo";
import NavigationContent from "./navigation-content";

export interface SideNavBarProps {
    onMobileClose: () => void;
    openMobileNav: boolean;
    routes: RouteConfig[];
    basePath: string;
}

const SideNavBar: React.FC<SideNavBarProps> = (props: SideNavBarProps) => {
    const { onMobileClose, openMobileNav, routes } = props;
    const { handleLogout } = useAuthentication();

    const {
        isTab,
        // btaBtnRef,
        getName,
        isSideBarCollapsed,
        toggleCollapse,
        shouldBeCollapsed,
        user,
        getRole,
        darkModeEnabled,
        hasUnreadNotification,
        toggleSidebarOpen,
        notiSidebarOpen,
        isNotificationsEnabled,
    } = useNavbar(props);

    const Content = (
        <div
            className={clsx(
                "navbar relative flex h-full w-64 grow flex-col bg-primary-800 dark:bg-primary-950 tp:bg-transparent tp:dark:bg-transparent",
                shouldBeCollapsed && "!w-24"
            )}>
            <BrandLogo className="brand my-4" minimal={shouldBeCollapsed} />

            {!isTab && (
                <Tooltip title={isSideBarCollapsed ? "Expand" : "Collapse"}>
                    <AppButton
                        variant="contained"
                        className="!absolute -right-5 top-16 z-[89] !min-w-auto !rounded-full !p-1"
                        size="small"
                        color="secondary"
                        onClick={toggleCollapse}>
                        <ChevronLeftRounded
                            fontSize="small"
                            className={clsx(
                                "transition-all ease-in-out",
                                isSideBarCollapsed && "rotate-180"
                            )}
                        />
                    </AppButton>
                </Tooltip>
            )}
            <Scrollable
                className="navbar-content mt-2 overflow-x-hidden"
                direction={{ parent: "rtl", child: "ltr" }}>
                <NavigationContent routes={routes} basePath={props.basePath} />
            </Scrollable>
            <div
                className={clsx("bottom-area", shouldBeCollapsed && "minimal")}>
                <div className="mb-5 flex justify-center">
                    <NavLink
                        to={AuthedRoutes.profile}
                        className="relative"
                        title="Edit Profile">
                        <Avatar
                            sx={{ width: 46, height: 46 }}
                            title={isSideBarCollapsed ? getName() : undefined}
                        />
                        <Edit
                            color="primary"
                            fontSize="medium"
                            className="pointer-events-none absolute -left-2 -top-2 rounded-full border-2 border-solid border-primary-500 bg-slate-50 p-0.5 dark:border-primary-800 dark:bg-slate-950"
                        />
                    </NavLink>
                    {!isSideBarCollapsed && (
                        <div className="ml-2 flex flex-col">
                            <Typography
                                className="!mb-1"
                                variant="subtitle2"
                                component="span">
                                {getName()}
                            </Typography>
                            <Typography variant="body2" component="span">
                                {getRole(user?.role)}
                            </Typography>
                        </div>
                    )}
                </div>
                {isNotificationsEnabled && !isTab && (
                    <Tooltip
                        title={
                            !notiSidebarOpen
                                ? "Open Notification Panel"
                                : "Close Notification Panel"
                        }>
                        <AppButton
                            variant="contained"
                            className="!absolute -right-5 bottom-20 z-[89] !min-w-auto !rounded-full !p-1"
                            size="small"
                            color="secondary"
                            onClick={toggleSidebarOpen}>
                            {hasUnreadNotification ? (
                                <Badge
                                    badgeContent={1}
                                    color="error"
                                    variant="dot"
                                    className="relative">
                                    <span className="absolute -right-1.5 -top-1.5 flex h-3 w-3 animate-ping items-center rounded-full bg-red-400 opacity-75" />
                                    <Notifications
                                        fontSize="small"
                                        className="animate-swing"
                                    />
                                </Badge>
                            ) : (
                                <NotificationsNone fontSize="small" />
                            )}
                        </AppButton>
                    </Tooltip>
                )}
                <div
                    className={clsx(
                        "flex",
                        shouldBeCollapsed ? "flex-col" : "flex-row",
                        "items-center justify-center"
                    )}>
                    {darkModeEnabled && (
                        <ThemeSwitch
                            className={clsx(shouldBeCollapsed && "mb-2")}
                        />
                    )}
                    <AppButton
                        className="mx-auto my-0 w-fit"
                        variant="text"
                        color="inherit"
                        buttonProps={{
                            startIcon: !shouldBeCollapsed && (
                                <ExitToAppRounded />
                            ),
                        }}
                        onClick={handleLogout}>
                        Logout
                    </AppButton>
                </div>
            </div>
        </div>
    );
    return isTab ? (
        <Drawer
            anchor="left"
            classes={{ paper: "!bg-primary-800 dark:!bg-primary-950 w-64" }}
            onClose={onMobileClose}
            open={openMobileNav}
            variant="temporary">
            {Content}
        </Drawer>
    ) : (
        Content
    );
};

export default SideNavBar;
