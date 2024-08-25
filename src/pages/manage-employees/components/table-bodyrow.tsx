import React, { FC } from "react";
import { RowEventType } from "@/pages/users/components/table-bodyrow";
import { Delete, Edit } from "@mui/icons-material";
import { TableCell, Tooltip } from "@mui/material";
import clsx from "clsx";

import { EmployeeData, EmployeeStatus } from "@/models/responses/employee-data";
import { UserRoleData } from "@/models/responses/user-role-data";
import { CellAlignment, CommonRowEventType } from "@/models/types";
import { getFormattedDate } from "@/utils/date-utils";
import { AppButton, AppSwitch } from "@/components/form";
import { BodyRowComponentProps } from "@/components/tables/responsive-table";

interface BodyRowItemProps<T, K extends keyof T>
    extends BodyRowComponentProps<T, K> {
    // data: T;
    // alignments: Record<keyof T, CellAlignment>;
    onRowEvent: (id: string, eventType: RowEventType, value?: any) => void;
}

const TableBodyRowItem: FC<BodyRowItemProps<EmployeeData, "empId">> = (
    props
) => {
    const { data: row, alignments, onRowEvent, arrayData } = props;
    const handleClick = (id: string, event: RowEventType) => () =>
        onRowEvent(id, event);
    const getColor = (employeeStatus: string) => {
        switch (employeeStatus) {
            case "disabled":
                return "bg-red-400";
            case "active":
                return "bg-green-500";
            default:
                return "";
        }
    };
    const handleToggle =
        (id: string, event: RowEventType) =>
        (evt: React.ChangeEvent<{} | HTMLInputElement>, checked: boolean) =>
            onRowEvent(id, event, checked);
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
            <TableCell align={alignments?.dob || "left"}>
                {getFormattedDate(row.dob ? row.dob : undefined, "DD/MM/YYYY")}
            </TableCell>
            <TableCell align={alignments?.phone || "left"}>
                {row.phone}
            </TableCell>
            <TableCell align={alignments?.gender || "left"}>
                {row.gender}
            </TableCell>
            <TableCell align={alignments?.position || "left"}>
                {row.position}
            </TableCell>
            <TableCell align={alignments?.departmentName || "left"}>
                {row.departmentName}
            </TableCell>
            <TableCell align={alignments?.employmentType || "left"}>
                {row.employmentType}
            </TableCell>
            <TableCell align={alignments?.shift || "left"}>
                {row.shift}
            </TableCell>
            <TableCell align={alignments?.dateOfJoining || "left"}>
                {row.dateOfJoining}
            </TableCell>
            <TableCell align={alignments?.skill || "left"}>
                {row.skill}
            </TableCell>
            <TableCell align={alignments?.site || "left"}>{row.site}</TableCell>
            <TableCell
                className={clsx("capitalize", row.status)}
                key="status"
                align={alignments?.status || "left"}>
                {row.status}
            </TableCell>
            <TableCell
                align="right"
                className="right-0 bg-gradient-to-l from-[#ffffff] from-80% to-transparent to-100%  dark:from-[#1e1e1e] dark:from-80% dark:to-transparent dark:to-100%">
                <div className="flex gap-1">
                    <AppSwitch
                        label="Active"
                        checked={row.status === "Active"}
                        onChange={handleToggle(
                            row.empId ? row.empId : "",
                            "disable"
                        )}
                        size="small"
                        disabled={row.status === "Inactive"}
                    />
                    <Tooltip title="Edit">
                        <span>
                            <AppButton
                                variant="icon"
                                size="small"
                                onClick={handleClick(
                                    row.empId ? row.empId : "",
                                    "edit"
                                )}>
                                <Edit fontSize="small" />
                            </AppButton>
                        </span>
                    </Tooltip>
                </div>
            </TableCell>
        </>
    );
};

export default TableBodyRowItem;
