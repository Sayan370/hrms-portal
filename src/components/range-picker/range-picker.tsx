import { useEffect, useMemo, useState } from "react";
import { ChevronRight, Done } from "@mui/icons-material";
import {
    Collapse,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import clsx from "clsx";
import dayjs, { Dayjs } from "dayjs";

import { SizeProps } from "@/models/types";
import useDateRange from "@/hooks/useDateRange";

import { AppButton, AppDatePicker } from "../form";
import {
    DateProps,
    DateTimeProps,
    TimeProps,
} from "../form/inputElements/app-datepicker";

type RangeButtonList<TDate> = Array<{
    label: string;
    key: string;
    comparer: (startDate: TDate, endDate: TDate) => boolean;
    startdate?: TDate;
    endDate?: TDate;
}>;

export interface RangePickerProps<TDate> {
    startDate?: TDate;
    endDate?: TDate;
    format?: string;
    size?: Exclude<SizeProps, "large">;
    rangeButtons?: RangeButtonList<TDate>;
    onRangeChange?: (startDate: TDate, endDate: TDate) => void;
    clearable?: boolean;
    rangeLock?: boolean;
    color?: "primary" | "secondary";
    labels?: {
        startDate?: string;
        endDate?: string;
    };
    classes?: {
        datepickerWrapper?: string;
    };
    onRangeApplied?: () => void;
}

const RangePicker = (
    props: RangePickerProps<Dayjs | null> &
        (DateProps | TimeProps | DateTimeProps)
) => {
    const {
        startDate,
        endDate,
        classes,
        rangeButtons,
        clearable = true,
        rangeLock = false,
        labels,
        size = "small",
        color,
        onRangeChange,
        onRangeApplied,
        ...restProps
    } = props;
    const { startDay, endDay, handleStartDay, handleEndDay } =
        useDateRange<Dayjs | null>({
            defaultStartDate: startDate || dayjs(),
            defaultEndDate: endDate || dayjs(),
        });
    const [collapsed, toggle] = useState(false);

    const onStartDayChange = (
        date: dayjs.Dayjs | null,
        keyboardInputValue?: string | undefined
    ) => {
        handleStartDay(date, keyboardInputValue);
    };
    const onEndDayChange = (
        date: dayjs.Dayjs | null,
        keyboardInputValue?: string | undefined
    ) => {
        handleEndDay(date, keyboardInputValue);
    };

    const onChange = (start?: Dayjs | null, end?: Dayjs | null) => {
        if (start !== undefined) handleStartDay(start);
        if (end !== undefined) handleEndDay(end);
        if (onRangeChange)
            onRangeChange((start ?? startDay) || null, (end ?? endDay) || null);
        if (onRangeApplied) {
            onRangeApplied();
        }
    };

    const onClear = () => {
        if (startDate !== undefined) handleStartDay(startDate);
        if (endDate !== undefined) handleEndDay(endDate);
        if (onRangeApplied) {
            onRangeApplied();
        }
    };

    useEffect(() => {
        if (startDate !== undefined) handleStartDay(startDate || null);
        if (endDate !== undefined) handleEndDay(endDate || null);
    }, [startDate, endDate]);

    const isCustom = useMemo(() => {
        return !rangeButtons?.reduce(
            (acc, val) =>
                acc || val.comparer(startDate || null, endDate || null),
            false
        );
    }, [rangeButtons, startDate, endDate]);

    const isApplyEnabled = useMemo(() => {
        return (
            !(
                dayjs(startDay).isSame(startDate) ||
                (startDay === startDate && startDate === null)
            ) ||
            !(
                dayjs(endDay).isSame(endDate) ||
                (endDay === endDate && endDate === null)
            )
        );
    }, [startDate, endDate, startDay, endDay]);

    const isClearDisabled = useMemo(() => {
        return (
            startDay === startDate &&
            startDate === null &&
            endDay === endDate &&
            endDate === null
        );
    }, [startDate, endDate, startDay, endDay]);

    return (
        <div className="flex min-w-max flex-col">
            <div className="flex flex-row">
                <div className="flex flex-grow flex-col">
                    <List disablePadding dense={size === "small"}>
                        {rangeButtons?.map((r, i) => (
                            <ListItem
                                disablePadding
                                key={r.key}
                                onClick={() =>
                                    onChange(r.startdate, r.endDate)
                                }>
                                <ListItemButton
                                    className={clsx(
                                        r.comparer(
                                            startDate || null,
                                            endDate || null
                                        ) &&
                                            "!bg-primary-100 dark:!bg-primary-800 "
                                    )}>
                                    <ListItemIcon>
                                        {r.comparer(
                                            startDate || null,
                                            endDate || null
                                        ) && (
                                            <Done
                                                className={clsx(
                                                    r.comparer(
                                                        startDate || null,
                                                        endDate || null
                                                    ) && "!text-primary-500"
                                                )}
                                            />
                                        )}
                                    </ListItemIcon>
                                    <ListItemText primary={r.label} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                        <ListItem
                            disablePadding
                            onClick={() => toggle((state) => !state)}
                            secondaryAction={
                                <ChevronRight className="align-middle" />
                            }>
                            <ListItemButton
                                className={clsx(
                                    isCustom &&
                                        "!bg-primary-100 dark:!bg-primary-800"
                                )}>
                                <ListItemIcon>
                                    {isCustom && (
                                        <Done
                                            className={clsx(
                                                isCustom && "!text-primary-500"
                                            )}
                                        />
                                    )}
                                </ListItemIcon>
                                <ListItemText primary="Custom" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </div>
                <Collapse
                    in={collapsed || isCustom}
                    classes={{ root: "flex flex-grow" }}
                    orientation="horizontal"
                    unmountOnExit>
                    <div
                        className={clsx(
                            "h-full border-[1px] border-solid border-transparent border-l-gray-300 p-2 dark:border-l-gray-600",
                            classes?.datepickerWrapper
                        )}>
                        <div className="flex flex-col gap-3">
                            <AppDatePicker
                                format="DD/MM/YYYY"
                                size={size}
                                color={color}
                                label={labels?.startDate ?? "Start Date"}
                                value={startDay}
                                onChange={onStartDayChange}
                                maxDate={rangeLock ? endDay : undefined}
                                {...restProps}
                            />
                            <AppDatePicker
                                size={size}
                                color={color}
                                format="DD/MM/YYYY"
                                label={labels?.endDate ?? "End Date"}
                                value={endDay}
                                onChange={onEndDayChange}
                                minDate={rangeLock ? startDay : undefined}
                                {...restProps}
                            />
                        </div>
                    </div>
                </Collapse>
            </div>
            <div className="flex flex-row justify-between gap-1 border-[1px] border-solid border-transparent border-t-gray-300 px-2 py-1 dark:border-t-gray-600">
                <AppButton
                    size={size}
                    color={color}
                    variant="text"
                    disabled={clearable ? isClearDisabled : true}
                    onClick={() => onChange(null, null)}>
                    Clear All
                </AppButton>
                <div className="flex flex-row gap-1">
                    <AppButton
                        size={size}
                        color={color}
                        variant="text"
                        onClick={onClear}
                        disabled={!isApplyEnabled}>
                        Cancel
                    </AppButton>
                    <AppButton
                        size={size}
                        color={color}
                        variant="text"
                        onClick={() => onChange()}
                        disabled={!isApplyEnabled}>
                        Apply
                    </AppButton>
                </div>
            </div>
        </div>
    );
};

export default RangePicker;
