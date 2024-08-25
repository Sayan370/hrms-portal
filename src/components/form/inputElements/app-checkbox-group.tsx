import React, { Children, PropsWithChildren, ReactElement, cloneElement, memo, useEffect, useState } from "react";
import {
    FormControl,
    FormGroup,
    FormHelperText,
    FormLabel,
} from "@mui/material";
import clsx from "clsx";

import { CommonInputProps } from "@/models/common-props";
import { ColorProps, Orientation } from "@/models/types";
import AppCheckbox, { AppCheckboxProps } from "./app-checkbox";
import { AppSwitch } from "..";

interface AppCheckboxGroupProps extends Omit<CommonInputProps, "value"> {
    onChange?: (
        evt: React.ChangeEvent<HTMLInputElement | {}>,
        checked?: Record<number, boolean>
    ) => void;
    helperText?: string;
    children: React.ReactNode;
    orientation?: Orientation;
    color?: Exclude<ColorProps, "inherit">;
    multiple?: boolean;
    checked?: Record<number, boolean>;
}

const AppCheckboxGroup = (
    props: PropsWithChildren<AppCheckboxGroupProps>
) => {
    const { label, errorMessage, children, className, style, helperText, orientation, multiple, checked, onChange, ...restProps } = props;

    const [localChecked, setLocalChecked] = useState(checked);

    const handleChange = (index: number) =>
        (
            evt: React.ChangeEvent<HTMLInputElement | {}>,
            checkedBool: boolean
        ) => {
            const check = multiple ? { ...localChecked, [index]: checkedBool } : { [index]: checkedBool };
            if (onChange) {
                onChange(evt, check);
            }
            if (JSON.stringify(localChecked) !== JSON.stringify(check)) {
                setLocalChecked(check);
            }
        }

    useEffect(() => {
        if (checked !== undefined && JSON.stringify(checked) !== JSON.stringify(localChecked)) {
            setLocalChecked(checked);
        }
    }, [checked])

    return (
        <div
            className={clsx("flex flex-row", className)}
            style={style}>
            <FormControl component="fieldset" error={!!errorMessage} {...restProps}>
                {label && <FormLabel component="legend">{label}</FormLabel>}
                <FormGroup row={orientation === "horizontal"}>
                    {Children.map(children, (child, index) => {
                        const item = child as ReactElement<
                            PropsWithChildren<AppCheckboxProps>
                        >;
                        if (item?.type === AppCheckbox || item?.type === AppSwitch) return cloneElement(item, {
                            ...item.props,
                            ...{
                                checked: localChecked?.[index] || false,
                                onChange: handleChange(index)
                            },
                        });
                        return null;
                    })}
                </FormGroup>
                <FormHelperText error={!!errorMessage}>{errorMessage || helperText}</FormHelperText>
            </FormControl>
        </div>
    );
};

export default memo(AppCheckboxGroup);
