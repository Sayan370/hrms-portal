import { FC } from "react";
import { Delete, Edit } from "@mui/icons-material";
import { TableCell, Tooltip } from "@mui/material";
import clsx from "clsx";

import {
    AttendanceData,
    AttendanceStatus,
} from "@/models/responses/attendance-data";
import { UserRoleData } from "@/models/responses/user-role-data";
import { CellAlignment, CommonRowEventType } from "@/models/types";
import { getFormattedDate } from "@/utils/date-utils";
import { AppButton } from "@/components/form";
import { BodyRowComponentProps } from "@/components/tables/responsive-table";

interface BodyRowItemProps<T, K extends keyof T>
    extends BodyRowComponentProps<T, K> {
    // data: T;
    // alignments: Record<keyof T, CellAlignment>;
    onRowEvent: (id: number, eventType: CommonRowEventType) => void;
}

const TableBodyRowItem: FC<BodyRowItemProps<Record<string, string>, "id">> = (
    props
) => {
    const { data: row, alignments, onRowEvent, arrayData } = props;
    const getColor = (acceptanceStatus: AttendanceStatus) => {
        switch (acceptanceStatus) {
            case "absent":
                return "bg-red-500";
            case "leave":
                return "bg-orange-400";
            case "present":
                return "bg-green-600";
            case "late-arrival":
                return "bg-green-300";
            case "over-time":
                return "bg-yellow-500";
            default:
                return "";
        }
    };
    return (
        <>
            <TableCell
                className="min-w-[100px]"
                align={alignments?.name || "left"}>
                {arrayData.index + 1}
            </TableCell>
            <TableCell
                className="min-w-[100px]"
                align={alignments?.empId || "left"}>
                {row.empId}
            </TableCell>
            <TableCell
                className="min-w-[200px]"
                align={alignments?.name || "left"}>
                {row.name}
            </TableCell>
            {/* <TableCell align={alignments?.date || "left"}>
                {getFormattedDate(row.date, "DD/MM/YYYY")}
            </TableCell> */}
            {Object.keys(row)
                .filter(
                    (key) =>
                        ![
                            "name",
                            "date",
                            "empId",
                            "id",
                            "workingHours",
                            "workingDays",
                        ].includes(key)
                )
                .map((key, i) => (
                    <TableCell
                        className="capitalize"
                        key={i}
                        align={alignments?.[key] || "left"}>
                        <div className="flex flex-row items-center gap-2">
                            <div
                                className={clsx(
                                    "block h-[10px] w-[10px] rounded-full",
                                    getColor(row?.[key] as AttendanceStatus)
                                )}
                            />
                            <span>{row?.[key]?.replace("-", " ")}</span>
                        </div>
                        {/* <div className="flex flex-row items-center justify-center">
                            <Tooltip
                                classes={{
                                    popper: "capitalize",
                                }}
                                title={row?.[key]?.replace("-", " ")}>
                                <div
                                    className={clsx(
                                        "block h-3 w-3 rounded-full",
                                        getColor(row?.[key] as AttendanceStatus)
                                    )}
                                />
                            </Tooltip>
                        </div> */}
                    </TableCell>
                ))}
            <TableCell align={alignments?.workingHours || "left"}>
                {row.workingHours}
            </TableCell>
            <TableCell align={alignments?.workingDays || "left"}>
                {row.workingDays}
            </TableCell>
        </>
    );
};

export default TableBodyRowItem;
