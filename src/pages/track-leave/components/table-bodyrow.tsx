import { FC } from "react";
import { Block, Delete, Done, Edit } from "@mui/icons-material";
import { Chip, TableCell, Tooltip } from "@mui/material";
import clsx from "clsx";

import { EmployeeData, EmployeeStatus } from "@/models/responses/employee-data";
import { LeaveApprovalStatus, LeaveData } from "@/models/responses/leave-data";
import { UserRoleData } from "@/models/responses/user-role-data";
import { CellAlignment, CommonRowEventType } from "@/models/types";
import { getFormattedDate } from "@/utils/date-utils";
import { AppButton } from "@/components/form";
import StepIndicator from "@/components/step-indicator";
import { BodyRowComponentProps } from "@/components/tables/responsive-table";

export type RowEventType = "approve" | "reject" | "cancel";

interface BodyRowItemProps<T, K extends keyof T>
    extends BodyRowComponentProps<T, K> {
    // data: T;
    // alignments: Record<keyof T, CellAlignment>;
    onRowEvent: (id: string, eventType: RowEventType) => void;
}

type StepStatus = "pending" | "processing" | "approved" | "rejected";

const TableBodyRowItem: FC<BodyRowItemProps<LeaveData, "id">> = (props) => {
    const { data: row, alignments, onRowEvent, arrayData } = props;
    const getColor = (employeeStatus: LeaveApprovalStatus) => {
        switch (employeeStatus) {
            case "approved":
                return "success";
            case "pending":
                return "warning";
            case "rejected":
                return "error";
            default:
                return "default";
        }
    };
    const steps: { date: string; label: string; state: StepStatus }[] = [
        {
            date: "",
            state: "approved",
            label: "Submitted",
        },
        { date: "", state: "rejected", label: "Approval" },
        { date: "", state: "pending", label: "Notified" },
    ];
    if (row.status) {
        switch (row.status) {
            case "approved":
                steps[1].state = "approved";
                break;
            case "pending":
                steps[1].state = "pending";
                break;
            case "rejected":
                steps[1].state = "rejected";
                break;
            default:
                break;
        }
    }
    return (
        <>
            <TableCell align={alignments?.name || "left"}>
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
            <TableCell align={alignments?.department || "left"}>
                {row.department}
            </TableCell>
            <TableCell
                className="capitalize"
                align={alignments?.leaveType || "left"}>
                {row.leaveType.split("-")[0]}
            </TableCell>
            <TableCell
                className="min-w-[200px]"
                align={alignments?.duration || "left"}>
                <div className="flex flex-col items-center justify-center">
                    <span>
                        <span className="font-bold">
                            {getFormattedDate(row.leaveStartDate)}
                        </span>{" "}
                        -{" "}
                        <span className="font-bold">
                            {getFormattedDate(row.leaveEndDate)}
                        </span>
                    </span>
                    <span>
                        <span className="font-bold">Duration: </span>{" "}
                        {row.duration}
                    </span>
                </div>
            </TableCell>
            <TableCell className="min-w-[250px]" align="left">
                {/* <Chip
                    color={getColor(row.status)}
                    className="capitalize"
                    label={row.status}
                    size="small"
                /> */}
                <div>
                    <StepIndicator
                        classes={{
                            root: "justify-center",
                        }}
                        steps={steps.map((item) => ({
                            label: item.label,
                            status: item.state,
                        }))}
                    />
                </div>
            </TableCell>
            <TableCell align={alignments?.approver || "left"}>
                {row.approver}
            </TableCell>
            <TableCell align={alignments?.reasonForLeave || "left"}>
                {row.reasonForLeave}
            </TableCell>
            <TableCell
                className="min-w-[150px]"
                align={alignments?.leaveBalance || "left"}>
                {row.leaveBalance && (
                    <div className="flex flex-col items-start">
                        <span>
                            <span className="font-bold">Annual Leave: </span>{" "}
                            {row.leaveBalance["annual-leave"]}
                        </span>
                        <span>
                            <span className="font-bold">Sick Leave: </span>{" "}
                            {row.leaveBalance["sick-leave"]}
                        </span>
                        <span>
                            <span className="font-bold">Casual Leave: </span>{" "}
                            {row.leaveBalance["casual-leave"]}
                        </span>
                    </div>
                )}
            </TableCell>
            <TableCell align="right">
                <div className="flex flex-row gap-2">
                    <Tooltip title="Cancel Leave">
                        <AppButton
                            variant="icon"
                            size="small"
                            onClick={() => {
                                onRowEvent(row.id, "reject");
                            }}>
                            <Block fontSize="small" />
                        </AppButton>
                    </Tooltip>
                    <Tooltip title="Approve">
                        <AppButton
                            variant="icon"
                            size="small"
                            onClick={() => {
                                onRowEvent(row.id, "approve");
                            }}>
                            <Done fontSize="small" />
                        </AppButton>
                    </Tooltip>
                </div>
            </TableCell>
        </>
    );
};

export default TableBodyRowItem;
