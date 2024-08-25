import {
    Children,
    cloneElement,
    isValidElement,
    PropsWithChildren,
    ReactElement,
} from "react";
import { Close } from "@mui/icons-material";
import { Drawer, Theme, Typography, useMediaQuery } from "@mui/material";
import clsx from "clsx";

import { OnCloseType } from "@/models/func-types";

import { AppButton } from "../form";

interface ActionSidebarProps {
    open?: boolean;
    onClose?: OnCloseType;
    size?: "small" | "medium" | "large";
    className?: string;
}

const ActionSidebar = (props: PropsWithChildren<ActionSidebarProps>) => {
    const { open, onClose, children, size = "small", className } = props;
    const isPhone = useMediaQuery<Theme>((theme) =>
        theme.breakpoints.down("p")
    );

    const getWidth = () => {
        switch (size) {
            case "small":
                return isPhone
                    ? "h-full w-full"
                    : "h-full w-full tp:w-[400px] sd:w-[560px]";
            case "medium":
                return isPhone
                    ? "h-full w-full"
                    : "h-full w-full tp:w-[560px] sd:w-[768px]";
            case "large":
                return isPhone
                    ? "h-full w-full"
                    : "h-full w-full tp:w-[700px] sd:w-[1000px]";
            default:
                return "h-full w-full";
        }
    };

    return (
        <Drawer
            classes={{
                paper: "m-4 !h-[calc(100%-2rem)] rounded-md",
                root: className,
            }}
            open={open}
            onClose={onClose}
            anchor={isPhone ? "bottom" : "right"}>
            <div
                className={`h-full ${getWidth()} flex flex-col`}
                role="presentation">
                {Children.map(children, (child) => {
                    if (!isValidElement(child)) return null;

                    const item = child as ReactElement<PropsWithChildren>;

                    if (item.type === Title) {
                        return cloneElement(item, {
                            ...item.props,
                            ...{ onClose },
                        });
                    }
                    if (item.type === Body) {
                        return cloneElement(item);
                    }
                    if (item.type === Actions) {
                        return cloneElement(item, { ...item.props });
                    }
                    return child;
                })}
            </div>
        </Drawer>
    );
};

interface TitleProps {
    onClose?: OnCloseType;
    sticky?: boolean;
}

const Title = ({
    children,
    sticky,
    onClose,
}: PropsWithChildren<TitleProps>) => {
    const handleClose = () => onClose?.call(this, {}, "titleClose");
    return (
        <div
            className={clsx(
                "shrink",
                sticky && "sticky top-0 z-10 bg-white dark:bg-zinc-900"
            )}>
            <div className="flex items-center justify-between px-3 py-3">
                <Typography variant="h6" className="tracking-wide">
                    {children}
                </Typography>
                <AppButton onClick={handleClose} variant="icon" size="small">
                    <Close fontSize="small" />
                </AppButton>
            </div>
            <hr className="m-0 h-px border-0 bg-gray-200 dark:bg-gray-600" />
        </div>
    );
};

interface ActionsProps {}

const Actions = ({
    children,
    ...actionProps
}: PropsWithChildren<ActionsProps>) => {
    return (
        <div className="shrink">
            <hr className="m-0 h-px border-0 bg-gray-200 dark:bg-gray-600" />
            <div className="flex justify-end px-4 py-3">
                {Children.map(children, (child) => {
                    const item = child as ReactElement<
                        PropsWithChildren<typeof actionProps>
                    >;

                    return cloneElement(item, {
                        ...item.props,
                        ...actionProps,
                    });
                })}
            </div>
        </div>
    );
};
interface BodyProps {
    className?: string;
    fixedHeight?: boolean;
}
const Body = ({
    children,
    className,
    fixedHeight = true,
}: PropsWithChildren<BodyProps>) => {
    return (
        <div
            className={clsx(
                "flex grow flex-col px-4",
                fixedHeight && "min-h-[calc(100%-7.55rem)]",
                className
            )}>
            {children}
        </div>
    );
};

export const ActionSidebarTitle = Title;
export const ActionSidebarActions = Actions;
export const ActionSidebarBody = Body;

export default ActionSidebar;
