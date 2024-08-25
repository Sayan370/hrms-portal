import React, { forwardRef, memo } from "react";
import {
    Button,
    ButtonProps,
    IconButton,
    IconButtonProps,
    PropTypes,
    withStyles,
} from "@mui/material";
import clsx from "clsx";
import { LinkProps } from "react-router-dom";

import { CommonProps } from "@/models/common-props";
import { ColorProps, SizeProps } from "@/models/types";

export interface AppButtonProps extends CommonProps {
    type?: "button" | "submit" | "reset";
    size?: SizeProps;
    children?: React.ReactNode;
    buttonProps?: ButtonProps & Partial<LinkProps>;
    color?: ColorProps;
    rounded?: boolean;
    variant?: "text" | "outlined" | "contained";
    onClick?: (evt: React.MouseEvent<HTMLButtonElement>) => void;
    title?: string;
}
export interface AppIconButtonProps extends CommonProps {
    type?: "button" | "submit" | "reset";
    size?: SizeProps;
    children?: React.ReactNode;
    buttonProps?: IconButtonProps;
    color?: ColorProps;
    variant?: "icon";
    onClick?: (evt: React.MouseEvent<HTMLButtonElement>) => void;
    title?: string;
}

const LocalButton: React.ForwardRefRenderFunction<
    HTMLButtonElement,
    AppButtonProps | AppIconButtonProps
> = (props, ref) => {
    let { buttonProps } = props;
    const {
        children,
        variant,
        color,
        className,
        buttonProps: ignoreProps,
        style,
        onClick,
        ...restPropsUni
    } = props;

    if (!buttonProps) buttonProps = {};

    const { rounded, ...restProps } = restPropsUni as any;

    if (props.onClick) {
        buttonProps.onClick = onClick;
    }
    if (props.style !== undefined) {
        buttonProps.style = style;
    }
    if (variant !== "icon" && rounded) {
        if (props.style !== undefined) {
            buttonProps.style = { borderRadius: 30, ...props.style };
        } else {
            buttonProps.style = { borderRadius: 30 };
        }
    }

    return variant === "icon" ? (
        <IconButton
            ref={ref}
            className={className}
            color={color}
            {...(buttonProps as IconButtonProps)}
            {...restProps}>
            {children}
        </IconButton>
    ) : (
        <Button
            ref={ref}
            className={className}
            variant={variant}
            color={color}
            {...buttonProps}
            {...restProps}>
            {children}
        </Button>
    );
};

const AppButton = memo(forwardRef(LocalButton));
AppButton.displayName = "AppButton";

export default AppButton;
