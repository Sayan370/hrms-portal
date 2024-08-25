import React, { forwardRef, memo } from "react";
import {
    Checkbox,
    FormControlLabel,
    FormControlLabelProps,
} from "@mui/material";
import clsx from "clsx";

import { CommonInputProps } from "@/models/common-props";
import { ColorProps, SizeProps, XYPosition } from "@/models/types";

export interface AppCheckboxProps extends CommonInputProps {
    onChange?: (
        evt: React.ChangeEvent<HTMLInputElement | {}>,
        checked: boolean
    ) => void;
    inputProps?: FormControlLabelProps;
    checked?: boolean;
    color?: Exclude<ColorProps, "inherit">;
    size?: Exclude<SizeProps, "large">;
    labelPlacement?: XYPosition;
}

const LocalCheckbox: React.ForwardRefRenderFunction<HTMLInputElement, AppCheckboxProps> = (props, ref) => {
    let { inputProps } = props;
    const { label, labelPlacement, checked, errorMessage, inputProps: unusedProps, ...restProps } = props;

    // eslint-disable-next-line react/jsx-no-useless-fragment
    if (!inputProps) inputProps = { label: "", control: <></> };

    if (props.label !== undefined) {
        inputProps.label = props.label;
    }
    if (checked !== undefined) {
        inputProps.checked = checked;
    }

    return (
        <div
            className={clsx("flex flex-row", props.className)}
            style={props.style}>
            {label ? (
                <FormControlLabel
                    labelPlacement={labelPlacement}
                    {...inputProps}
                    control={
                        <Checkbox
                            checked={checked}
                            inputRef={ref}
                            {...restProps}
                        />
                    }
                />
            ) : (
                <Checkbox
                    checked={checked}
                    inputRef={ref}
                    {...restProps}
                />
            )}
        </div>
    );
};


const AppCheckbox = memo(forwardRef(LocalCheckbox));
AppCheckbox.displayName = "AppCheckbox";

export default AppCheckbox;
