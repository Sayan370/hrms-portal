import { useCallback, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { TextField } from "@mui/material";
import { StaticDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

import { getFormattedDate } from "@/utils/date-utils";
import { AppButton, AppInput } from "@/components/form";
import Popup, { PopupAnchor } from "@/components/popup";

interface DateSwitcherProps {
    value?: string;
    onChange?: (value: string) => void;
    minDate?: string;
    maxDate?: string;
}

const DateSwitcher = ({
    value,
    onChange,
    minDate,
    maxDate,
}: DateSwitcherProps) => {
    const localDate = useMemo(() => {
        return value ? dayjs(value).toISOString() : dayjs().toISOString();
    }, [value]);
    const isCurrentDate = useMemo(() => {
        return dayjs(localDate).diff(dayjs(), "day") === 0;
    }, [localDate]);
    const handlePrevious = useCallback(() => {
        onChange?.(dayjs(localDate).subtract(1, "day").toISOString());
    }, [localDate]);
    const handleNext = useCallback(() => {
        onChange?.(dayjs(localDate).add(1, "day").toISOString());
    }, [localDate]);
    const switchToCurrentDate = useCallback(() => {
        onChange?.(dayjs().toISOString());
    }, [localDate]);
    const hasPrev = useMemo(() => {
        return minDate ? dayjs(localDate).isAfter(minDate, "day") : true;
    }, [localDate, minDate]);
    const hasNext = useMemo(() => {
        return maxDate ? dayjs(localDate).isBefore(maxDate, "day") : true;
    }, [localDate, maxDate]);
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-row items-center justify-center gap-2">
                <AppButton
                    disabled={!hasPrev}
                    onClick={handlePrevious}
                    variant="icon">
                    <ChevronLeft />
                </AppButton>
                <Popup>
                    {({ close, open }) => (
                        <>
                            <PopupAnchor>
                                <AppButton size="small">
                                    {getFormattedDate(localDate, "DD MMM")}
                                </AppButton>
                            </PopupAnchor>
                            <StaticDatePicker
                                value={value}
                                maxDate={maxDate}
                                minDate={minDate}
                                onChange={(value) => {
                                    if (value) {
                                        onChange?.(value);
                                        close();
                                    }
                                }}
                                showToolbar={false}
                                componentsProps={{ actionBar: { actions: [] } }}
                                renderInput={(params) => (
                                    <TextField {...params} size="small" />
                                )}
                            />
                        </>
                    )}
                </Popup>
                {/* <span>{getFormattedDate(localDate, "DD MMM")}</span> */}
                <AppButton
                    disabled={!hasNext}
                    onClick={handleNext}
                    variant="icon">
                    <ChevronRight />
                </AppButton>
            </div>
            {!isCurrentDate && (
                <AppButton onClick={switchToCurrentDate} size="small">
                    Jump to Current Date
                </AppButton>
            )}
        </div>
    );
};
export default DateSwitcher;
