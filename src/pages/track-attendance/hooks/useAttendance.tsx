import { useMemo, useState } from "react";
import {
    getAttendance,
    getDailyAttendance,
    setAttendance,
} from "@/services/api/attendance-ep";
import dayjs from "dayjs";
import { useMutation, useQuery } from "react-query";

import {
    AttendanceDailyData,
    AttendanceDailyFormData,
    AttendanceData,
    AttendanceStatus,
} from "@/models/responses/attendance-data";
import { CommonRowEventType } from "@/models/types";
import { AwaitedReturnType } from "@/models/utility-types";
import { QueryConst } from "@/constants/query-constants";
import { getFormattedDate, weekInMonth } from "@/utils/date-utils";
import { getFormattedNumber } from "@/utils/object-utils";
import appToast from "@/components/app-toast";
import { HeaderData } from "@/components/tables/responsive-table";

type SegmentType = "monthly" | "weekly" | "daily";

const useAttendance = () => {
    const maxSelectDate = dayjs().toISOString();
    const minSelectDate = dayjs().subtract(4, "day").toISOString();
    const [selectedDate, setCurrentDate] = useState(dayjs().toISOString());
    const [modalState, setModalState] = useState<boolean>(false);
    const [editData, setEditData] = useState<AttendanceDailyData | undefined>();
    const [searchText, setSearchText] = useState("");
    const [tab, setTab] = useState<SegmentType>("weekly");
    const { data, error, status } = useQuery<
        AwaitedReturnType<typeof getAttendance>,
        Error
    >([QueryConst.getAttendance], getAttendance);
    const {
        data: mutData,
        error: mutError,
        status: mutStatus,
        mutateAsync,
    } = useMutation<
        AwaitedReturnType<typeof setAttendance>,
        Error,
        AttendanceDailyFormData
    >([QueryConst.getAttendance], setAttendance);

    const {
        data: dailyData,
        error: dailyError,
        status: dailyStatus,
    } = useQuery<AwaitedReturnType<typeof getDailyAttendance>, Error>(
        [QueryConst.getDailyAttendance],
        getDailyAttendance
    );
    const headCells: HeaderData<Record<string, string>>[] = [
        {
            id: "id",
            isSortable: false,
            disablePadding: true,
            label: "S. No",
            group: "S. No",
            hideLabel: true,
            align: "left",
        },
        {
            id: "empId",
            isSortable: false,
            disablePadding: true,
            label: "Emp Id",
            group: "Emp Id",
            hideLabel: true,
            align: "left",
        },
        {
            id: "name",
            isSortable: true,
            disablePadding: true,
            label: "Name",
            group: "Name",
            hideLabel: true,
            align: "left",
        },
        // {
        //     id: "date",
        //     isSortable: false,
        //     disablePadding: false,
        //     label: "Date",
        //     group: "Date",
        //     hideLabel: true,
        //     align: "left",
        // },
    ];
    const modHeadCells = useMemo(() => {
        const mhc = headCells;
        if (tab === "weekly") {
            const ats = Object.entries(data?.[0].attendanceStatus ?? {})
                .filter(([key, val], i) => i < 7)
                .reduce<AttendanceData["attendanceStatus"]>(
                    (acc, [key, val]) => ({ ...acc, [key]: val }),
                    {}
                );
            Object.keys(ats).forEach((key, i, arr) => {
                mhc.push({
                    id: key,
                    isSortable: false,
                    disablePadding: true,
                    label: key,
                    align: "center",
                    group: `W${weekInMonth(
                        key,
                        "DD/MM/YYYY"
                    )}, ${getFormattedDate(
                        dayjs(key, "DD/MM/YYYY")?.toISOString(),
                        "MMM, YYYY"
                    )}`,
                    colSpan: 1,
                });
            });
            mhc.push({
                id: "workingHours",
                isSortable: false,
                disablePadding: true,
                label: "Avg. Working Hours",
                align: "center",
                group: "Avg. Working Hours",
                hideLabel: true,
                colSpan: 1,
            });
            mhc.push({
                id: "workingDays",
                isSortable: false,
                disablePadding: true,
                label: "Working Days",
                align: "center",
                group: "Working Days",
                hideLabel: true,
                colSpan: 1,
            });
        } else if (tab === "monthly") {
            Object.keys(data?.[0].attendanceStatus ?? {}).forEach(
                (key, i, arr) => {
                    mhc.push({
                        id: key,
                        isSortable: false,
                        disablePadding: true,
                        label: key,
                        align: "center",
                        group: getFormattedDate(
                            dayjs(key, "DD/MM/YYYY")?.toISOString(),
                            "MMM, YYYY"
                        ),
                        colSpan: 1,
                    });
                }
            );
            mhc.push({
                id: "workingHours",
                isSortable: false,
                disablePadding: true,
                label: "Avg. Working Hours",
                align: "center",
                group: "Avg. Working Hours",
                hideLabel: true,
                colSpan: 1,
            });
            mhc.push({
                id: "workingDays",
                isSortable: false,
                disablePadding: true,
                label: "Working Days",
                align: "center",
                group: "Working Days",
                hideLabel: true,
                colSpan: 1,
            });
        }
        return mhc;
    }, [data, tab]);

    const rows = useMemo<Record<string, string>[]>(() => {
        if (tab === "weekly") {
            return (data || []).map(({ attendanceStatus, ...props }) => {
                const ats = Object.entries(attendanceStatus)
                    .filter(([key, val], i) => i < 7)
                    .reduce<AttendanceData["attendanceStatus"]>(
                        (acc, [key, val]) => ({ ...acc, [key]: val }),
                        {}
                    );
                const row = {
                    ...props,
                    ...Object.entries(ats).reduce(
                        (acc, [key, val]) => ({ ...acc, [key]: val.status }),
                        {}
                    ),
                    workingHours: getFormattedNumber(
                        Object.values(ats).reduce(
                            (acc, val) =>
                                acc +
                                (!["leave", "absent"].includes(val.status)
                                    ? val.workingHours
                                    : 0),
                            0
                        ) / Object.values(ats).length
                    ),
                    workingDays: `${Object.values(ats).reduce(
                        (acc, val) =>
                            acc +
                            (!["leave", "absent"].includes(val.status) ? 1 : 0),
                        0
                    )}`,
                };

                return row;
            });
        }
        if (tab === "monthly") {
            return (data || []).map(({ attendanceStatus, ...props }) => {
                const row = {
                    ...props,
                    ...Object.entries(attendanceStatus).reduce(
                        (acc, [key, val]) => ({ ...acc, [key]: val.status }),
                        {}
                    ),
                    workingHours: getFormattedNumber(
                        Object.values(attendanceStatus).reduce(
                            (acc, val) =>
                                acc +
                                (!["leave", "absent"].includes(val.status)
                                    ? val.workingHours
                                    : 0),
                            0
                        ) / Object.values(attendanceStatus).length
                    ),
                    workingDays: `${Object.values(attendanceStatus).reduce(
                        (acc, val) =>
                            acc +
                            (!["leave", "absent"].includes(val.status) ? 1 : 0),
                        0
                    )}`,
                };

                return row;
            });
        }
        return [];
    }, [data, tab]);

    const handleTabChange = (selected: number) => {
        setTab(
            selected === 0 ? "daily" : selected === 1 ? "weekly" : "monthly"
        );
    };

    const headDailyCells: HeaderData<AttendanceDailyData>[] = [
        {
            id: "id",
            isSortable: false,
            disablePadding: true,
            label: "S. No",
            align: "left",
        },
        {
            id: "empId",
            isSortable: false,
            disablePadding: true,
            label: "Emp Id",
            align: "left",
        },
        {
            id: "name",
            isSortable: true,
            disablePadding: true,
            label: "Name",
            align: "left",
        },
        {
            id: "profileType",
            isSortable: false,
            disablePadding: false,
            label: "Profile Type",
            align: "left",
        },
        {
            id: "profile",
            isSortable: false,
            disablePadding: false,
            label: "Profile",
            align: "left",
        },
        // {
        //     id: "date",
        //     isSortable: false,
        //     disablePadding: false,
        //     label: "Date",
        //     align: "left",
        // },
        {
            id: "shift",
            isSortable: false,
            disablePadding: false,
            label: "Shift",
            align: "center",
        },
        {
            id: "inTime",
            isSortable: false,
            disablePadding: false,
            label: "In Time - Out Time",
            align: "center",
        },
        {
            id: "workingHours",
            isSortable: false,
            disablePadding: false,
            label: "Working Hours",
            align: "center",
        },
        {
            id: "outTime",
            isSortable: false,
            disablePadding: false,
            label: "Over Time",
            align: "center",
        },
        {
            id: "attendanceStatus",
            isSortable: false,
            disablePadding: false,
            label: "Attendance",
            align: "center",
        },
        {
            id: "actions",
            isSortable: false,
            disablePadding: false,
            label: "Actions",
            align: "right",
        },
    ];
    const onTextSearch = (text?: string) => {
        setSearchText(text || "");
    };
    const filteredRows = useMemo(
        () =>
            dailyData?.filter((item) =>
                item.name.toLowerCase().includes(searchText.toLowerCase())
            ),
        [dailyData, searchText]
    );
    const onRowAction = (id: string, eventType: CommonRowEventType) => {
        switch (eventType) {
            case "edit": {
                const data = dailyData?.find((r) => r.id === id);
                setModalState(true);
                setEditData(data);
                break;
            }
            default:
                break;
        }
    };
    const handleClose = () => {
        setEditData(undefined);
        setModalState(false);
    };
    const handleSubmit = (data: AttendanceDailyFormData) => {
        mutateAsync(data).then((message) => {
            appToast.success(message);
            handleClose();
        });
    };
    return {
        rows,
        error,
        status,
        modHeadCells,
        handleTabChange,
        dailyData,
        dailyError,
        dailyStatus,
        headDailyCells,
        onTextSearch,
        filteredRows,
        onRowAction,
        editData,
        modalState,
        handleClose,
        handleSubmit,
        mutStatus,
        selectedDate,
        setCurrentDate,
        maxSelectDate,
        minSelectDate,
    };
};

export default useAttendance;
