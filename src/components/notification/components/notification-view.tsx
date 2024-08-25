import { AppButton } from "@/components/form";
import { NotificationData, NotificationSeverity } from "@/models/responses/notification-data";
import { NotificationClickEventType } from "@/models/types";
import { getTimeDiff } from "@/utils/object-utils";
import { Cancel, Close, Done, Error, ErrorOutline, Info, InfoOutlined, TaskAlt, Warning } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import clsx from "clsx";
import dayjs from "dayjs";
import { MouseEvent, useMemo } from "react";

interface NotificationViewProps {
    data: NotificationData;
    onClick?: (data: NotificationData, action: NotificationClickEventType) => void;
    currentTime: string;
}

const NotificationView = ({ data, onClick, currentTime }: NotificationViewProps) => {
    const handleClick = (data: NotificationData, action: NotificationClickEventType) => (evt: MouseEvent<HTMLButtonElement>) => {
        evt.preventDefault();
        onClick?.call(this, data, action)
    };
    const timeDiff = useMemo(() => getTimeDiff(dayjs(currentTime).diff(data.date, "second")), [data]);
    const icon = useMemo(() => {
        switch (data.severity) {
            case NotificationSeverity.Error:
                return <ErrorOutline color="error" />
            case NotificationSeverity.Warning:
                return <Warning color="warning" />
            case NotificationSeverity.Success:
                return <TaskAlt color="success" />
            default:
                return <InfoOutlined />;
        }
    }, [data]);
    const containerClassname = useMemo(() => {
        if (data.read) {
            switch (data.severity) {
                // case NotificationSeverity.Error:
                //     return "border-red-300 bg-red-100 hover:bg-red-200  dark:border-red-900 dark:bg-red-800 dark:hover:bg-red-900"
                // case NotificationSeverity.Warning:
                //     return "border-yellow-300 bg-yellow-100 hover:bg-yellow-200  dark:border-yellow-900 dark:bg-yellow-800 dark:hover:bg-yellow-900"
                // case NotificationSeverity.Success:
                //     return "border-green-300 bg-green-100 hover:bg-green-200  dark:border-green-900 dark:bg-green-800 dark:hover:bg-green-900"
                default:
                    return "border-slate-300 bg-slate-200 hover:bg-slate-300 dark:border-slate-900 dark:bg-slate-900 dark:hover:bg-slate-950";
            }
        } else {
            switch (data.severity) {
                // case NotificationSeverity.Error:
                //     return "border-red-300 bg-red-100 hover:bg-red-200  dark:border-red-900 dark:bg-red-800 dark:hover:bg-red-900"
                // case NotificationSeverity.Warning:
                //     return "border-yellow-300 bg-yellow-100 hover:bg-yellow-200  dark:border-yellow-900 dark:bg-yellow-800 dark:hover:bg-yellow-900"
                // case NotificationSeverity.Success:
                //     return "border-green-300 bg-green-100 hover:bg-green-200  dark:border-green-900 dark:bg-green-800 dark:hover:bg-green-900"
                default:
                    return "border-slate-300 bg-slate-100 hover:bg-slate-200 dark:border-slate-900 dark:bg-slate-800 dark:hover:bg-slate-900";
            }
        }
    }, [data]);
    const iconClassname = useMemo(() => {
        switch (data.severity) {
            case NotificationSeverity.Error:
                return "!bg-red-300 dark:!bg-red-700"
            case NotificationSeverity.Warning:
                return "!bg-yellow-300 dark:!bg-yellow-700"
            case NotificationSeverity.Success:
                return "!bg-green-300 dark:!bg-green-700"
            default:
                return "";
        }
    }, [data]);

    return (
        <li className="relative list-none group/noti">
            <button className={clsx(
                "relative w-full transition-all font-primary text-left flex flex-row gap-2 border-[1px] border-solid hover:shadow-sm dark:shadow-slate-950 rounded-md py-1.5 px-2 cursor-pointer",
                containerClassname)} type="button" onClick={handleClick(data, "clicked")}>
                <Avatar classes={{
                    colorDefault: iconClassname
                }}>
                    {icon}
                </Avatar>
                <div className="flex flex-col grow">
                    <span className="text-slate-500 dark:text-slate-400 font-semibold text-sm">{data.title}</span>
                    <div className="flex flex-row gap-1 items-center">
                        <span className="text-slate-500 dark:text-slate-400 text-xs">{timeDiff} . </span>
                        <span className="text-slate-400 dark:text-slate-500 text-sm">{data.message}</span>
                    </div>
                </div>
            </button>
            {
                data.type === "approval" &&
                <div className="z-10 absolute right-1 bottom-1 p-1 gap-1 justify-end hidden group-focus-within/noti:flex group-hover/noti:flex group-focus/noti:flex rounded-md backdrop-blur-md bg-gray-50 group-focus-within/noti:bg-gray-50 group-hover/noti:bg-gray-50 group-focus/noti:bg-gray-50 dark:bg-slate-800 group-focus-within/noti:dark:bg-gray-700 group-hover/noti:dark:bg-gray-700 group-focus/noti:dark:bg-gray-700">
                    {/* <div className="absolute top-0 left-0 w-full h-full rounded-b-md blur-[3px] bg-gradient-to-l from-slate-100 from-80% to-transparent to-100%  dark:from-slate-800 dark:from-80% dark:to-transparent dark:to-100%" /> */}
                    <AppButton size="small" variant="icon" onClick={handleClick(data, "accepted")} className="!w-6 !h-6 !p-2">
                        <Done fontSize="small" className="!w-5 !h-5" />
                    </AppButton>
                    <AppButton size="small" variant="icon" onClick={handleClick(data, "canceled")} className="!w-6 !h-6 !p-2" >
                        <Close fontSize="small" className="!w-5 !h-5" />
                    </AppButton>
                </div>
            }
        </li >
    )
}

export default NotificationView;