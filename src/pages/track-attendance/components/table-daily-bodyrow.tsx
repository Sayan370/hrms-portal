import { FC } from "react";
import { Delete, Edit } from "@mui/icons-material";
import { TableCell, Tooltip } from "@mui/material";
import clsx from "clsx";

import {
    AttendanceDailyData,
    AttendanceData,
    AttendanceStatus,
} from "@/models/responses/attendance-data";
import { UserRoleData } from "@/models/responses/user-role-data";
import { CellAlignment, CommonRowEventType } from "@/models/types";
import { getFormattedDate } from "@/utils/date-utils";
import ActionCell, {
    ActionCellBody,
    ActionCellInput,
} from "@/components/action-cell";
import { AppButton, AppInput } from "@/components/form";
import { BodyRowComponentProps } from "@/components/tables/responsive-table";

import CustomAppInput from "./custom-app-input";

interface BodyRowItemProps<T, K extends keyof T>
    extends BodyRowComponentProps<T, K> {
    // data: T;
    // alignments: Record<keyof T, CellAlignment>;
    onRowEvent: (id: string, eventType: CommonRowEventType) => void;
}

const TableDailyBodyRowItem: FC<BodyRowItemProps<AttendanceDailyData, "id">> = (
    props
) => {
    const { data: row, alignments, onRowEvent, arrayData } = props;
    const handleClick = (id: string, event: CommonRowEventType) => () =>
        onRowEvent(id, event);
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
                align={alignments?.id || "left"}>
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
            <TableCell align={alignments?.profileType || "left"}>
                {row.profileType}
            </TableCell>
            <TableCell align={alignments?.profile || "left"}>
                {row.profile}
            </TableCell>
            {/* <TableCell align={alignments?.date || "left"}>
                {getFormattedDate(row.date, "DD/MM/YYYY")}
            </TableCell> */}
            <TableCell align={alignments?.shift || "left"}>
                {row.shift}
            </TableCell>
            <TableCell align={alignments?.inTime || "left"}>
                <div className="flex flex-row items-center justify-center gap-1">
                    {getFormattedDate(row.inTime, "hh:mm A")} -{" "}
                    {getFormattedDate(row.outTime, "hh:mm A")}
                </div>
            </TableCell>
            <TableCell align={alignments?.workingHours || "left"}>
                {/* <ActionCell>
                    <ActionCellInput>
                        {({ inputRef }) => (
                            <AppInput
                                label="Working Hours"
                                size="small"
                                ref={inputRef}
                            />
                        )}
                    </ActionCellInput>
                    <ActionCellBody>{row.workingHours}</ActionCellBody>
                </ActionCell> */}
                {/* <CustomAppInput value={`${row?.workingHours}` ?? ""} /> */}
                {row?.workingHours}
            </TableCell>
            <TableCell align={alignments?.outTime || "left"}>
                {!["leave", "absent"].includes(row.attendanceStatus)
                    ? (row?.workingHours ?? 0) - 7
                    : 0}
            </TableCell>
            <TableCell
                className="capitalize"
                align={alignments?.attendanceStatus || "left"}>
                {/* {row.attendanceStatus.replace("-", " ")} */}
                <div className="flex flex-row items-center gap-2">
                    <div
                        className={clsx(
                            "block h-[10px] w-[10px] rounded-full",
                            getColor(row?.attendanceStatus)
                        )}
                    />
                    <span>{row?.attendanceStatus?.replace("-", " ")}</span>
                </div>
            </TableCell>
            <TableCell align="right">
                <Tooltip title="Edit">
                    <span>
                        <AppButton
                            variant="icon"
                            size="small"
                            onClick={handleClick(row.id, "edit")}>
                            <Edit fontSize="small" />
                        </AppButton>
                    </span>
                </Tooltip>
            </TableCell>
        </>
    );
};

export default TableDailyBodyRowItem;
