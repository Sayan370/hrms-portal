import React, { PropsWithChildren, ReactNode, useState } from "react";
import { Popover, PopoverOrigin } from "@mui/material";

export interface PopupAnchorProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    "aria-describedby"?: string;
}

interface PopupProps {
    anchor?: (anchorProps: PopupAnchorProps) => ReactNode;
    anchorOrigin?: PopoverOrigin;
}

const Popup = ({
    children,
    anchor,
    ...restProps
}: PropsWithChildren<PopupProps>) => {
    const defaultAnchorOrigin: PopoverOrigin = {
        vertical: "bottom",
        horizontal: "left",
    };
    const { anchorOrigin = defaultAnchorOrigin } = restProps;
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    return (
        <>
            {anchor?.call(this, {
                onClick: handleClick,
                "aria-describedby": id,
            })}
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={anchorOrigin}>
                {children}
            </Popover>
        </>
    );
};

export default Popup;
