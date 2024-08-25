import React, { forwardRef, ForwardRefRenderFunction, memo } from "react";
import { CircularProgress, PropTypes } from "@mui/material";

import { ColorProps } from "@/models/types";
import CircularProgressWithLabel from "@/components/loading/circular-progress-with-label";

import AppButton, { AppButtonProps, AppIconButtonProps } from "./app-button";

interface AppLoaderButtonProps {
    isLoading?: boolean;
    shouldBeDisabledWhileLoading?: boolean;
    progressValue?: number;
}

const AppLoaderButton: ForwardRefRenderFunction<
    HTMLButtonElement,
    AppLoaderButtonProps & (AppButtonProps | AppIconButtonProps)
> = (
    {
        isLoading,
        shouldBeDisabledWhileLoading = false,
        children,
        disabled,
        progressValue,
        ...props
    },
    ref
) => {
    const getProperPropsForLoader = (): {
        size?: number;
        color?: Exclude<ColorProps, "default">;
    } => {
        const { buttonProps } = props;
        let { size, color, variant } = props;
        if (color === undefined) {
            color =
                buttonProps?.color !== "default"
                    ? buttonProps?.color || "primary"
                    : "inherit";
        }
        if (variant === undefined) {
            variant = color === "error" ? "outlined" : "contained";
        }
        if (size === undefined) {
            size = size || "medium";
        }
        let circProgProps = {};
        circProgProps = { ...circProgProps, color: "inherit" };

        if (size === "large") {
            circProgProps = { ...circProgProps, size: 26.25 };
        }
        if (size === "medium") {
            circProgProps = { ...circProgProps, size: 24.5 };
        }
        if (size === "medium" && variant === "icon") {
            circProgProps = { ...circProgProps, size: 25 };
        }
        if (size === "small") {
            circProgProps = { ...circProgProps, size: 22.75 };
        }
        if (size === "small" && variant === "icon") {
            circProgProps = { ...circProgProps, size: 20 };
        }

        return circProgProps;
    };
    return (
        <AppButton
            disabled={
                shouldBeDisabledWhileLoading
                    ? isLoading || !!progressValue || disabled
                    : disabled
            }
            {...props}
            ref={ref}>
            {isLoading || !!progressValue ? (
                progressValue ? (
                    <CircularProgressWithLabel
                        value={progressValue}
                        variant="determinate"
                        {...getProperPropsForLoader()}
                    />
                ) : (
                    <CircularProgress {...getProperPropsForLoader()} />
                )
            ) : (
                children
            )}
        </AppButton>
    );
};

export default memo(forwardRef(AppLoaderButton));
