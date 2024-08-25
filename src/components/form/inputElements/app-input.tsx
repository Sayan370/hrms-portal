import React, { forwardRef, memo } from "react";
import {
    InputAdornment,
    TextField,
    TextFieldProps,
} from "@mui/material";
import clsx from "clsx";
import InputMask from "react-input-mask";

import { CommonInputProps } from "@/models/common-props";
import { SizeProps } from "@/models/types";
import { Loading } from "@/components/loading";

export interface AppInputProps extends Omit<CommonInputProps, "value"> {
    onChange?: (
        evt: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => void;
    onBlur?: (
        evt: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => void;
    inputProps?: TextFieldProps;
    mask?: any;
    maskChar?: string;
    type?: string;
    loading?: boolean;
    multiline?: boolean;
    rows?: number;
    color?: "primary" | "secondary";
    helperText?: string;
    size?: Exclude<SizeProps, "large">;
    autoFocus?: boolean;
    value?: string | number | readonly string[];
}

const LocalInput: React.ForwardRefRenderFunction<
    HTMLInputElement | HTMLTextAreaElement,
    AppInputProps
> = (props, ref) => {
    let { inputProps } = props;
    const {
        disabled,
        required,
        readOnly,
        name,
        value,
        color,
        type = "text",
        mask,
        id,
        maskChar,
        onChange,
        errorMessage,
        loading,
        multiline,
        helperText,
        rows,
        size = "medium",
        autoFocus = false,
    } = props;

    if (!inputProps) inputProps = {};
    const { variant, ...inputPropsXVariant } = inputProps;

    if (!mask && props.value !== undefined) {
        inputPropsXVariant.value = props.value;
    }
    if (props.label !== undefined) {
        inputPropsXVariant.label = props.label;
    }
    if (!mask && props.onChange !== undefined) {
        inputPropsXVariant.onChange = props.onChange;
    }
    if (!mask && props.onBlur !== undefined) {
        inputPropsXVariant.onBlur = props.onBlur;
    }
    return (
        <div
            className={clsx("flex flex-row", props.className)}
            style={{ width: "100%", ...props.style }}>
            {mask ? (
                <InputMask
                    mask={mask}
                    value={value}
                    name={name}
                    readOnly={readOnly}
                    maskPlaceholder={maskChar}
                    onChange={onChange}
                    disabled={disabled ?? false}>
                    {/* {() => <></>} */}
                    <TextField
                        disabled={disabled ?? false}
                        name={name}
                        required={required}
                        multiline={multiline}
                        rows={rows}
                        id={id}
                        inputRef={ref}
                        className="flex-grow"
                        type="text"
                        color={color}
                        variant="outlined"
                        error={!!errorMessage}
                        helperText={errorMessage || helperText}
                        size={size}
                        autoFocus={autoFocus}
                        InputProps={
                            loading
                                ? {
                                    readOnly,
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Loading
                                                size={20}
                                                color={color}
                                            />
                                        </InputAdornment>
                                    ),
                                }
                                : {
                                    readOnly,
                                }
                        }
                        {...inputPropsXVariant}
                    />
                </InputMask>
            ) : (
                <TextField
                    disabled={disabled}
                    name={name}
                    id={id}
                    required={required}
                    multiline={multiline}
                    rows={rows}
                    type={type}
                    className="flex-grow"
                    variant="outlined"
                    inputRef={ref}
                    color={color}
                    size={size}
                    error={!!errorMessage}
                    helperText={errorMessage || helperText}
                    autoFocus={autoFocus}
                    InputLabelProps={{
                        htmlFor: id || name,
                    }}
                    InputProps={
                        loading
                            ? {
                                readOnly,
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Loading
                                            color={color}
                                            size={20}
                                        />
                                    </InputAdornment>
                                ),
                            }
                            : {
                                readOnly,
                            }
                    }
                    {...inputPropsXVariant}
                />
            )}
        </div>
    );
};

const AppInput = memo(forwardRef(LocalInput));
AppInput.displayName = "AppInput";

export default AppInput;
