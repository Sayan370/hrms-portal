import React, { forwardRef, memo } from "react";
import {
    Checkbox,
    FormControlLabel,
    FormControlLabelProps,
    Radio,
} from "@mui/material";
import clsx from "clsx";

import { CommonInputProps } from "@/models/common-props";
import { ColorProps, XYPosition, SizeProps } from "@/models/types";

interface AppRadioProps extends CommonInputProps {
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

const LocalRadio: React.ForwardRefRenderFunction<HTMLInputElement, AppRadioProps> = (props, ref) => {
    let { inputProps } = props;
    const { label, checked, labelPlacement, errorMessage, inputProps: unusedProps, ...restProps } = props;

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
                        <Radio
                            checked={checked}
                            inputRef={ref}
                            {...restProps}
                        />
                    }
                />
            ) : (
                <Radio
                    checked={checked}
                    inputRef={ref}
                    {...restProps}
                />
            )}
        </div>
    );
};

const AppRadio = memo(forwardRef(LocalRadio));
AppRadio.displayName = "AppRadio";

export default AppRadio;
