import { useEffect, useRef, useState } from "react";
import { selectRole, selectUser } from "@/stores/modules/authentication";
import {
    selectCollapseSideBar,
    selectHasUnreadNotification,
    selectUserSettings,
    setCollapseSidebarState,
} from "@/stores/modules/ui";
import { Theme, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { UserRoles } from "@/models/types";
import { getRole } from "@/utils/object-utils";
import useFeatureFlag from "@/hooks/useFeatureFlag";
import useNotificationContext from "@/components/notification";

import { SideNavBarProps } from "../models/side-nav-bar-props";

export default function useNavbar(props: SideNavBarProps) {
    const location = useLocation();

    const isTab = useMediaQuery<Theme>((theme) => theme.breakpoints.down("tp"));
    const isBetweenPhTab = useMediaQuery<Theme>((theme) =>
        theme.breakpoints.between("tp", "sd")
    );
    const { user } = useSelector(selectUser);
    const { userSettings } = useSelector(selectUserSettings);
    const { isSideBarCollapsed } = useSelector(selectCollapseSideBar);
    const { hasUnreadNotification } = useSelector(selectHasUnreadNotification);
    const isNotificationsEnabled = useFeatureFlag("NOTIFICATIONS");
    const dispatch = useDispatch();
    const darkModeEnabled = useFeatureFlag("DARK_MODE");
    const { toggleSidebarOpen, sidebarOpen: notiSidebarOpen } =
        useNotificationContext();

    const { onMobileClose, openMobileNav } = props;
    // const [subscriberSwitchDialogOpened, setOpenSubscriberSwitchDialog] = useState(false);
    // const btaBtnRef = useRef<HTMLButtonElement | null>(null);
    const shouldBeCollapsed = !isTab && isSideBarCollapsed;

    useEffect(() => {
        if (openMobileNav && onMobileClose) {
            onMobileClose();
        }
    }, [location.pathname]);

    useEffect(() => {
        if (!userSettings.autoCollapseSidebarOnSmallerScreen) {
            if (isTab) {
                dispatch(setCollapseSidebarState(false));
            }
        }
    }, [isTab, userSettings]);

    useEffect(() => {
        if (userSettings.autoCollapseSidebarOnSmallerScreen) {
            if (isBetweenPhTab) {
                dispatch(setCollapseSidebarState(true));
            } else {
                dispatch(setCollapseSidebarState(false));
            }
        }
    }, [isBetweenPhTab, userSettings]);

    const toggleCollapse = () => {
        dispatch(setCollapseSidebarState(!isSideBarCollapsed));
    };

    const getName = () =>
        user?.family_name
            ? `${user?.given_name} ${user?.family_name}`
            : user?.given_name;

    return {
        isTab,
        isSideBarCollapsed,
        toggleCollapse,
        shouldBeCollapsed,
        user,
        getName,
        getRole,
        darkModeEnabled,
        hasUnreadNotification,
        toggleSidebarOpen,
        notiSidebarOpen,
        isNotificationsEnabled,
    };
}
