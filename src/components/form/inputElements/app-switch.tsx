import React, { forwardRef, memo } from "react";
import { FormControlLabelProps, withStyles } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import clsx from "clsx";

import { CommonInputProps } from "@/models/common-props";
import { ColorProps, SizeProps, XYPosition } from "@/models/types";

interface AppSwitchProps extends CommonInputProps {
    onChange?: (
        evt: React.ChangeEvent<{} | HTMLInputElement>,
        checked: boolean
    ) => void;
    inputProps?: FormControlLabelProps;
    checked?: boolean;
    color?: Exclude<ColorProps, "inherit">;
    size?: Exclude<SizeProps, "large">;
    labelPlacement?: XYPosition;
}

const LocalSwitch: React.ForwardRefRenderFunction<
    HTMLButtonElement,
    AppSwitchProps
> = (props, ref) => {
    let { inputProps } = props;
    const { label, labelPlacement, checked, errorMessage, inputProps: unusedProps, size, ...restProps } = props;

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
                    classes={{
                        label: clsx(size === "small" && "!text-xs"),
                        root: "!mr-0",
                    }}
                    {...inputProps}
                    control={
                        <Switch
                            checked={checked}
                            inputRef={ref}
                            size={size}
                            {...restProps}
                        />
                    }
                />
            ) : (
                <Switch
                    checked={checked}
                    inputRef={ref}
                    size={size}
                    {...restProps}
                />
            )}
        </div>
    );
};

const AppSwitch = memo(forwardRef(LocalSwitch));
AppSwitch.displayName = 'AppSwitch';

export default AppSwitch;
