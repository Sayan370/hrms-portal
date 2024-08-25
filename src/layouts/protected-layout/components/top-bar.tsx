import * as React from "react";
import { Menu, Notifications, NotificationsNone } from "@mui/icons-material";
import { Badge, Box, Tooltip } from "@mui/material";
import clsx from "clsx";

import { AppButton } from "@/components/form";

import useNotificationContext from "@/components/notification";
import { selectHasUnreadNotification } from "@/stores/modules/ui";
import { useSelector } from "react-redux";
import useFeatureFlag from "@/hooks/useFeatureFlag";
import BrandLogo from "./brand-logo";

export interface TopBarProps {
    className?: string;
    onMobileNavOpen: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onMobileNavOpen, className }) => {
    const { toggleSidebarOpen, sidebarOpen: notiSidebarOpen } = useNotificationContext();
    const { hasUnreadNotification } = useSelector(selectHasUnreadNotification);
    const isNotificationsEnabled = useFeatureFlag("NOTIFICATIONS");

    const menuOpenButton = (
        <AppButton
            className="w-10 h-10"
            type="button"
            variant="icon"
            color="secondary"
            onClick={onMobileNavOpen}>
            <Menu height={27} />
        </AppButton>
    );

    return (
        <div className={clsx("flex shrink-0 flex-row items-center mb-2", className)}>
            {menuOpenButton}
            <BrandLogo />
            {/* <Box flexGrow={1} /> */}
            {/* <Avatar alt="Profile Icon" src={"/profile-icon"} /> */}
            <div className="flex flex-row items-center justify-end grow">
                {
                    isNotificationsEnabled &&
                    <Tooltip title={!notiSidebarOpen ? "Open Notification Panel" : "Close Notification Panel"}>
                        <AppButton
                            variant="icon"
                            size="medium"
                            color="secondary"
                            onClick={toggleSidebarOpen}>
                            {
                                hasUnreadNotification ?
                                    <Badge badgeContent={1} color="error" variant="dot" className="relative">
                                        <span className="animate-ping absolute -top-1.5 -right-1.5 flex items-center h-3 w-3 rounded-full bg-red-400 opacity-75" />
                                        <Notifications
                                            fontSize="medium"
                                            className="animate-swing"
                                        />
                                    </Badge>
                                    :
                                    <NotificationsNone
                                        fontSize="medium"
                                    />
                            }
                        </AppButton>
                    </Tooltip>
                }
            </div>
        </div>
    );
};

export default TopBar;
