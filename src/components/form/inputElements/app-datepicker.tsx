import React, { forwardRef, memo } from "react";
import { TextField } from "@mui/material";
import {
    CalendarPickerView,
    ClockPickerView,
    DatePicker,
    DatePickerProps,
    DateTimePicker,
    DateTimePickerProps,
    TimePicker,
    TimePickerProps,
} from "@mui/x-date-pickers";
import { CalendarOrClockPickerView } from "@mui/x-date-pickers/internals/models";
import clsx from "clsx";
import dayjs, { Dayjs } from "dayjs";

import { CommonInputProps } from "@/models/common-props";
import { SizeProps } from "@/models/types";

interface AppDatePickerProps<TDate> extends Omit<CommonInputProps, "value"> {
    onChange: (date: TDate, value?: string) => void;
    // type: "date" | "time" | "dateTime";
    // views?: "y" | "m-y" | "d-m-y" | "hh" | "hh:mm" | "hh:mm:ss";
    showToolbar?: boolean;
    minDate?: TDate;
    maxDate?: TDate;
    format?: string;
    // maxDateMessage?: string;
    // minDateMessage?: string;
    // emptyLabel?: string;
    // inputProps?: DatePickerProps<TDate, TDate> | DateTimePickerProps<TDate, TDate> | TimePickerProps<TDate>;
    ampm?: boolean;
    value?: TDate;
    helperText?: string;
    size?: Exclude<SizeProps, "large">;
    color?: "primary" | "secondary";
    // openTo?: CalendarPickerView | ClockPickerView;
}

type DateViews = "y" | "m-y" | "d-m-y";
type TimeViews = "hh" | "hh:mm" | "hh:mm:ss";

export interface DateProps {
    type: "date";
    openTo: CalendarPickerView;
    views?: DateViews;
}
export interface TimeProps {
    type: "time";
    openTo: ClockPickerView;
    views?: TimeViews;
}
export interface DateTimeProps {
    type: "datetime";
    openTo: CalendarPickerView | ClockPickerView;
    views?: DateViews | TimeViews | `${DateViews} ${TimeViews}`;
}

const LocalDatePicker: React.ForwardRefRenderFunction<
    HTMLInputElement,
    AppDatePickerProps<Dayjs | null> & (DateProps | TimeProps | DateTimeProps)
> = (props, ref) => {
    const {
        value = null,
        type,
        views,
        ampm,
        minDate,
        maxDate,
        helperText,
        openTo,
        className,
        size = "medium",
        color,
        errorMessage,
        required,
        format = "DD/MM/YYYY",
        ...restProps
    } = props;

    let selectedView: (CalendarPickerView | ClockPickerView)[];
    if (views) {
        selectedView = [];
        if (views.includes("y")) selectedView.push("year");
        if (views.includes("m-")) selectedView.push("month");
        if (views.includes("d-")) selectedView.push("day");
        if (views.includes("hh")) selectedView.push("hours");
        if (views.includes("mm")) selectedView.push("minutes");
        if (views.includes("ss")) selectedView.push("seconds");
    }

    const getDate = (date: Dayjs | null | undefined) => {
        return date ? dayjs(date) : undefined;
    };

    const renderObject = () => {
        switch (type) {
            case "date":
                return (
                    <DatePicker
                        label="Date picker"
                        minDate={getDate(minDate)}
                        maxDate={getDate(maxDate)}
                        views={selectedView as CalendarPickerView[]}
                        value={value}
                        inputFormat={format}
                        PopperProps={{
                            style: {
                                zIndex: 10000,
                            },
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                color={color}
                                size={size}
                                helperText={errorMessage || helperText}
                                error={!!errorMessage}
                                required={required}
                            />
                        )}
                        inputRef={ref}
                        openTo={openTo}
                        className={clsx("grow", className)}
                        {...restProps}
                    />
                );
            case "time":
                return (
                    <TimePicker
                        label="Time picker"
                        value={value}
                        minTime={getDate(minDate)}
                        maxTime={getDate(maxDate)}
                        views={selectedView as ClockPickerView[]}
                        inputFormat={format}
                        PopperProps={{
                            style: {
                                zIndex: 10000,
                            },
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                color={color}
                                size={size}
                                helperText={errorMessage || helperText}
                                error={!!errorMessage}
                                required={required}
                            />
                        )}
                        inputRef={ref}
                        openTo={openTo}
                        ampm={ampm}
                        className={clsx("grow", className)}
                        {...restProps}
                    />
                );
            case "datetime":
                return (
                    <DateTimePicker
                        label="Date/Time picker"
                        minTime={getDate(minDate)}
                        maxTime={getDate(maxDate)}
                        views={selectedView as CalendarOrClockPickerView[]}
                        value={value}
                        ampm={ampm}
                        PopperProps={{
                            style: {
                                zIndex: 10000,
                            },
                        }}
                        inputFormat={format}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                size={size}
                                color={color}
                                helperText={errorMessage || helperText}
                                error={!!errorMessage}
                                required={required}
                            />
                        )}
                        inputRef={ref}
                        openTo={openTo}
                        className={clsx("grow", className)}
                        {...restProps}
                    />
                );
            default:
                return null;
        }
    };
    return renderObject();
};

const AppDatePicker = memo(forwardRef(LocalDatePicker));
AppDatePicker.displayName = "AppDatePicker";

export default AppDatePicker;
