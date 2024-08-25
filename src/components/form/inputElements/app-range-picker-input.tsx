import { ArrowDropDown, Close } from "@mui/icons-material";
import { FormHelperText, PopoverOrigin } from "@mui/material";
import clsx from "clsx";
import { Dayjs } from "dayjs";

import { CommonInputProps } from "@/models/common-props";
import Popup, { PopupAnchor } from "@/components/popup";
import RangePicker, { RangePickerProps } from "@/components/range-picker";

import AppButton, { AppButtonProps } from "./app-button";
import AppButtonGroup from "./app-button-group";
import { DateProps, DateTimeProps, TimeProps } from "./app-datepicker";

interface AppRangePickerInputProps<TDate>
    extends Omit<RangePickerProps<TDate>, "classes"> {
    getButtonLabel?: (start: TDate, end: TDate) => string | null;
    buttonGroupProps?: Pick<AppButtonProps, "variant" | "size">;
    buttonProps?: Omit<
        AppButtonProps,
        "children" | "onClick" | "buttonProps" | "type" | "disabled" | "form"
    >;
    helperText?: string;
    popupOrigin?: PopoverOrigin;
    classes?: {
        container?: string;
    };
    className?: string;
}

const AppRangePickerInput = (
    props: AppRangePickerInputProps<Dayjs | null> &
        (DateProps | TimeProps | DateTimeProps) &
        Omit<CommonInputProps, "value" | "name" | "style" | "className">
) => {
    const {
        getButtonLabel,
        classes,
        className,
        startDate,
        endDate,
        buttonProps,
        buttonGroupProps,
        label,
        errorMessage,
        disabled,
        form,
        id,
        required,
        readOnly,
        popupOrigin,
        helperText,
        ...restProps
    } = props;
    const { color: buttonColor, ...restButtonProps } = buttonProps || {};
    return (
        <div
            className={clsx(
                "flex flex-col gap-1",
                classes?.container,
                className
            )}>
            <AppButtonGroup {...buttonGroupProps}>
                <Popup transformOrigin={popupOrigin}>
                    {({ close }) => (
                        <>
                            <PopupAnchor>
                                <AppButton
                                    color={errorMessage ? "error" : buttonColor}
                                    type="button"
                                    disabled={readOnly || disabled}
                                    form={form}
                                    id={id}
                                    {...restButtonProps}
                                    buttonProps={{
                                        endIcon: <ArrowDropDown />,
                                    }}>
                                    {getButtonLabel?.call(
                                        this,
                                        startDate || null,
                                        endDate || null
                                    ) || label}{" "}
                                    {required && "*"}
                                </AppButton>
                            </PopupAnchor>
                            <RangePicker
                                classes={{ datepickerWrapper: "p-4 w-64" }}
                                startDate={startDate}
                                endDate={endDate}
                                onRangeApplied={close}
                                {...restProps}
                            />
                        </>
                    )}
                </Popup>
                {/* <AppButton type='button' size="small"><Close /></AppButton> */}
            </AppButtonGroup>
            {(errorMessage || helperText) && (
                <FormHelperText error={!!errorMessage}>
                    {errorMessage || helperText}
                </FormHelperText>
            )}
        </div>
    );
};

export default AppRangePickerInput;
