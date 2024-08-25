import * as React from "react";
import {
    Avatar,
    createStyles,
    makeStyles,
    Theme,
    Tooltip,
} from "@mui/material";
import clsx from "clsx";

export interface NavItemTextProps {
    text?: string;
    icon?: string | React.ReactElement;
    showIconsIfNotPresent?: boolean;
    showOnlyIcon?: boolean;
}

const NavItemText: React.FC<NavItemTextProps> = ({
    icon,
    text,
    showOnlyIcon = false,
    showIconsIfNotPresent = false,
}) => {
    const getIcon = () => {
        return (
            icon ??
            (showIconsIfNotPresent && (
                <Avatar
                    alt={`${text} icon`}
                    sx={{ width: 24, height: 24 }}
                    className={clsx("h-5 w-5", "avatar-icon")}>
                    {text?.charAt(0)}
                </Avatar>
            ))
        );
    };
    const content = (
        <div className="flex grow flex-row items-center">
            {getIcon()}
            {text && !showOnlyIcon && (
                <span
                    className={clsx(
                        "navigation-text text-ellipsis",
                        (icon || showIconsIfNotPresent) && "ml-1"
                    )}>
                    {text}
                </span>
            )}
        </div>
    );

    return showOnlyIcon ? (
        <Tooltip title={text || ""} placement="right-end">
            {content}
        </Tooltip>
    ) : (
        content
    );
};

export default NavItemText;
