import React, {
    FC,
    forwardRef,
    memo,
    useEffect,
    useRef,
    useState,
} from "react";
import { Edit, Error } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import clsx from "clsx";

import { AppButton, AppInput } from "@/components/form";
import { AppInputProps } from "@/components/form/inputElements/app-input";

const CustomAppInput: React.ForwardRefRenderFunction<
    HTMLInputElement | HTMLTextAreaElement,
    Omit<AppInputProps, "value"> & { value?: string }
> = (props, ref) => {
    const [editing, setEditing] = useState(false);
    const [text, setText] = useState<string | undefined>(
        props.value ? props.value : props.label
    );
    const { onBlur, ...rest } = props;
    let inputProps = rest;
    if (!inputProps) inputProps = {};

    if (props.value !== undefined) {
        inputProps.value = props.value;
    } else {
        inputProps.value = "";
    }
    if (props.label !== undefined) {
        inputProps.label = props.label;
    }
    if (props.onChange !== undefined) {
        inputProps.onChange = props.onChange;
    }
    const handleEditClick = () => {
        setEditing(true);
    };

    const handleBlur = (e: any) => {
        setEditing(false);
        setText(e.target.value ? e.target.value : props.label);
        if (props.onBlur !== undefined) {
            props.onBlur(e);
        }
    };
    useEffect(() => {
        setText(props.value ? props.value : props.label);
    }, [props.value]);
    return (
        <div className="flex w-full items-center">
            {editing ? (
                <div className="w-full border border-gray-300 focus:border-primary-500 focus:outline-none">
                    <AppInput
                        {...inputProps}
                        autoFocus
                        size="small"
                        ref={ref}
                        className="my-2"
                        // onChange={(e) => {
                        //     handleInputChange(e);
                        //     if (props.onChange !== undefined) {
                        //         props.onChange(e);
                        //     }
                        // }}
                        onBlur={(e) => {
                            setEditing(false);
                            if (props.onBlur !== undefined) {
                                props.onBlur(e);
                            }
                        }}
                    />
                </div>
            ) : (
                <div
                    onClick={handleEditClick}
                    role="presentation"
                    className={clsx(
                        "group/item w-full cursor-pointer rounded-md border-solid border-transparent hover:my-2 hover:h-10 hover:border-primary-500 hover:px-2 hover:py-1 hover:text-gray-400 focus:border-primary-500",
                        inputProps.className,
                        inputProps.errorMessage
                            ? "border-red-600 px-2 text-red-500"
                            : ""
                    )}>
                    <span className="text-justify group-hover/item:mr-1">
                        {text}
                    </span>
                    <AppButton
                        variant="icon"
                        className="group/edit !hidden group-hover/item:!inline-flex"
                        size="small"
                        onClick={handleEditClick}>
                        <Edit
                            fontSize="small"
                            sx={{ width: "15px", height: "15px" }}
                        />
                    </AppButton>
                    {inputProps.errorMessage && (
                        <Tooltip
                            title={inputProps.errorMessage}
                            placement="top">
                            <AppButton variant="icon" className="" size="small">
                                <Error
                                    color="error"
                                    fontSize="small"
                                    sx={{ width: "15px", height: "15px" }}
                                />
                            </AppButton>
                        </Tooltip>
                    )}
                </div>
            )}
        </div>
    );
};

export default memo(forwardRef(CustomAppInput));
