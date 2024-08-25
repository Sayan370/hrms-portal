import React, { FC } from "react";
import { Edit, Mail } from "@mui/icons-material";
import { TableCell, Tooltip } from "@mui/material";

import { UserData, UserStatus } from "@/models/responses/user-data";
import { UserRole } from "@/models/responses/user-role-data";
import { getFormattedDate } from "@/utils/date-utils";
import { separateWords } from "@/utils/object-utils";
import { AppButton, AppSwitch } from "@/components/form";
import { BodyRowComponentProps } from "@/components/tables/responsive-table";

export type RowEventType = "edit" | "disable" | "reset";

interface BodyRowItemProps<T, K extends keyof T>
    extends BodyRowComponentProps<T, K> {
    // data: T;
    // alignments: Record<keyof T, CellAlignment>;
    onRowEvent: (id: string, eventType: RowEventType, value?: any) => void;
    editDisabled: boolean;
    loggedInUserEmail?: string;
}

const TableBodyRowItem: FC<BodyRowItemProps<UserData, "email">> = (props) => {
    const {
        data: row,
        alignments,
        onRowEvent,
        loggedInUserEmail,
        editDisabled,
    } = props;
    const handleClick = (id: string, event: RowEventType) => () =>
        onRowEvent(id, event);
    const handleToggle =
        (id: string, event: RowEventType) =>
        (evt: React.ChangeEvent<{} | HTMLInputElement>, checked: boolean) =>
            onRowEvent(id, event, checked);
    return (
        <>
            <TableCell align="left">
                {row.firstName} {row.lastName}
            </TableCell>
            <TableCell align={alignments?.email || "left"}>
                {row.email}
            </TableCell>
            <TableCell align={alignments?.phone || "left"}>
                {row.phone}
            </TableCell>
            <TableCell align={alignments?.role || "left"}>
                {separateWords(UserRole[row.role])}
            </TableCell>
            <TableCell align={alignments?.created || "left"}>
                {row.created &&
                    getFormattedDate(row.created, "DD/MM/YYYY hh:mm:ssA")}
            </TableCell>
            <TableCell align={alignments?.updated || "left"}>
                {row.updated &&
                    getFormattedDate(row.updated, "DD/MM/YYYY hh:mm:ssA")}
            </TableCell>
            <TableCell
                align="right"
                className="sticky right-0 bg-gradient-to-l from-[#ffffff] from-80% to-transparent to-100%  dark:from-[#1e1e1e] dark:from-80% dark:to-transparent dark:to-100%">
                <div className="flex gap-1">
                    <AppSwitch
                        label="Active"
                        checked={row.status === UserStatus.Active}
                        onChange={handleToggle(row.email, "disable")}
                        size="small"
                        disabled={
                            row.status === UserStatus.Uninitialized ||
                            row.role === UserRole.SuperAdmin ||
                            loggedInUserEmail === row.email
                        }
                    />
                    <Tooltip title="Send password reset mail">
                        <span>
                            <AppButton
                                variant="icon"
                                size="small"
                                onClick={handleClick(row.email, "reset")}
                                disabled={
                                    editDisabled ||
                                    loggedInUserEmail === row.email ||
                                    row.role === UserRole.SuperAdmin ||
                                    row.status === UserStatus.Disabled
                                }>
                                <Mail fontSize="small" />
                            </AppButton>
                        </span>
                    </Tooltip>
                    <Tooltip title="Edit">
                        <span>
                            <AppButton
                                variant="icon"
                                size="small"
                                onClick={handleClick(row.email, "edit")}
                                disabled={
                                    editDisabled ||
                                    row.role === UserRole.SuperAdmin ||
                                    loggedInUserEmail === row.email
                                }>
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
