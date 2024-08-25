import { useState } from "react";

interface UseDateRangeProps<TDate> {
    defaultStartDate?: TDate;
    defaultEndDate?: TDate;
}

const useDateRange = <TDate = unknown>(props?: UseDateRangeProps<TDate>) => {
    const { defaultStartDate, defaultEndDate } = props ?? {};
    const [startDay, setStartDay] = useState<TDate | undefined>(
        defaultStartDate
    );
    const [endDay, setEndDay] = useState<TDate | undefined>(defaultEndDate);

    const handleStartDay = (date: TDate, keyboardInputValue?: string) => {
        setStartDay(date);
    };
    const handleEndDay = (date: TDate, keyboardInputValue?: string) => {
        setEndDay(date);
    };
    return {
        startDay,
        endDay,
        handleStartDay,
        handleEndDay,
    };
};

export default useDateRange;
