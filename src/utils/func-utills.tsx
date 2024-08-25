import { Dayjs } from "dayjs";
import { FormikHelpers } from "formik";

import { ExtractKeyType } from "@/models/utility-types";
import React from "react";
import { AutocompleteChangeDetails, AutocompleteChangeReason, AutocompleteValue } from "@mui/material";

export const handleDateChange = <T,>(
    name: string,
    setFieldValue: ExtractKeyType<FormikHelpers<T>, "setFieldValue">
) => (date: Dayjs | null, value?: string | undefined) => {
    setFieldValue(name, date?.isValid() ? date?.toISOString() : null, true);
};
export const handleDateRangeChange = <T,>(
    startDateName: string,
    endDateName: string,
    setValues: ExtractKeyType<FormikHelpers<T>, "setValues">
) => (startDate: Dayjs | null, endDate: Dayjs | null) => {
    setValues((state) => ({
        ...state,
        [startDateName]: startDate?.isValid() ? startDate?.toISOString() : null,
        [endDateName]: endDate?.isValid() ? endDate?.toISOString() : null,
    }), true);
};

export const handleAutcompleteChange = <
    T,
    TItem,
    Multiple extends boolean | undefined,
    DisableClearable extends boolean | undefined,
    FreeSolo extends boolean | undefined
>(
    name: string,
    setFieldValue: ExtractKeyType<FormikHelpers<T>, "setFieldValue">,
    getValue?: (value: AutocompleteValue<TItem, Multiple, DisableClearable, FreeSolo>) => any,
    then?: (reason: AutocompleteChangeReason) => void
) => (
    event: React.SyntheticEvent,
    value: AutocompleteValue<TItem, Multiple, DisableClearable, FreeSolo>,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<TItem>,
) => {
        if (then) then(reason);
        switch (reason) {
            case "selectOption":
                setFieldValue(name, typeof value === "object" && getValue ? getValue(value) : value, true);
                break;
            case "clear":
                setFieldValue(name, null, true);
                break;
            default:
                break;
        }
    };

export const handleAutcompleteMultiChange = <
    T,
    TItem,
    Multiple extends boolean | undefined,
    DisableClearable extends boolean | undefined,
    FreeSolo extends boolean | undefined
>(
    multiple: Multiple,
    name: string,
    setFieldValue: ExtractKeyType<FormikHelpers<T>, "setFieldValue">,
    getValue?: (value: AutocompleteValue<TItem, Multiple, DisableClearable, FreeSolo>) => any,
    then?: (reason: AutocompleteChangeReason) => void
) => (
    event: React.SyntheticEvent,
    value: AutocompleteValue<TItem, Multiple, DisableClearable, FreeSolo>,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<TItem>,
) => {
        if (then) then(reason);
        switch (reason) {
            case "selectOption":
            case "removeOption":
                setFieldValue(name, typeof value === "object" && getValue ? getValue(value) : value, true);
                break;
            case "clear":
                setFieldValue(name, multiple ? [] : null, true);
                break;
            default:
                break;
        }
    };


export const dateComparer = (a: Dayjs, b: Dayjs): number => {
    if (b.isBefore(a)) return -1;
    if (b.isAfter(a)) return 1;
    return 0;
}