import dayjs from "dayjs";

export const getFormattedDate = (
    date?: string,
    format: string = "DD-MM-YYYY"
) => {
    return date ? dayjs(date)?.format(format) : "";
};

export const totalWeekInMonth = (
    date?: string,
    format: string = "DD-MM-YYYY"
) => {
    const firstOfMonth = dayjs(date, format).startOf("month");
    const lastOfMonth = dayjs(date, format).endOf("month");

    const diff = lastOfMonth.diff(firstOfMonth, "day") + 1;

    return Math.ceil(diff / 7);
};

export const weekInMonth = (date?: string, format: string = "DD-MM-YYYY") => {
    const firstOfMonth = dayjs(date, format).startOf("month");
    const lastOfMonth = dayjs(date, format);

    const diff = lastOfMonth.diff(firstOfMonth, "day") + 1;

    return Math.ceil(diff / 7);
};
