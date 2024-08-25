import dayjs from "dayjs";
import { useEffect, useState } from "react";

const useCountdown = (targetDate: string) => {
    const countDownDate = dayjs(targetDate);
    const [countDown, setCountDown] = useState<number>(
        dayjs().diff(countDownDate, 'seconds')
    );

    useEffect(() => {
        const interval = setInterval(() => {
            let realTimeDate = dayjs();
            setCountDown(realTimeDate.diff(countDownDate, 'seconds'));
        }, 1000);
        return () => clearInterval(interval);
    }, [targetDate]);

    return getReturnValues(countDown);
};

const getReturnValues = (countDown: number) => {
    if (isNaN(countDown) || countDown <= 0) {
        return ['00', '00', '00', '00'];
    }
    const days = dayjs.duration(countDown, 'seconds').format('DD') || "00";
    const hours = dayjs.duration(countDown, 'seconds').format('HH') || "00";
    const minutes = dayjs.duration(countDown, 'seconds').format('mm') || "00";
    const seconds = dayjs.duration(countDown, 'seconds').format('ss') || "00";
    return [days, hours, minutes, seconds];
};

export { useCountdown };