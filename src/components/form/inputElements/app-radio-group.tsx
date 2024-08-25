import React, { memo } from "react";
import {
    FormControl,
    FormGroup,
    FormHelperText,
    FormLabel,
    RadioGroup,
} from "@mui/material";
import clsx from "clsx";

import { CommonInputProps } from "@/models/common-props";
import { ColorProps, Orientation } from "@/models/types";

interface AppRadioGroupProps extends Omit<CommonInputProps, "readOnly"> {
    onChange?: (evt: React.ChangeEvent<HTMLInputElement>, value: string) => void;
    helperText?: string;
    children: React.ReactNode;
    orientation?: Orientation;
    color?: Exclude<ColorProps, "inherit">;
}

const AppRadioGroup: React.FC<AppRadioGroupProps> = (
    props
) => {
    const { label, id, errorMessage, className, style, children, helperText, orientation, disabled, required, ...restProps } = props;

    return (
        <div
            className={clsx("flex flex-row", className)}
            style={style}>
            <FormControl error={!!errorMessage} disabled={disabled} required={required}>
                {label && <FormLabel id={id}>{label}</FormLabel>}
                <RadioGroup
                    row={orientation === "horizontal"}
                    aria-labelledby={id}
                    {...restProps}
                >
                    {children}
                </RadioGroup>
                <FormHelperText error={!!errorMessage}>{errorMessage || helperText}</FormHelperText>
            </FormControl>
        </div>
    );
};

export default memo(AppRadioGroup);
