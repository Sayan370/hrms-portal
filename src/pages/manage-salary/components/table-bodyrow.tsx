import { FC, useMemo } from "react";
import { Delete, Edit, RemoveRedEye } from "@mui/icons-material";
import { TableCell, Tooltip } from "@mui/material";
import clsx from "clsx";

import { EmployeeData, EmployeeStatus } from "@/models/responses/employee-data";
import { SalaryData } from "@/models/responses/salary-data";
import { UserRoleData } from "@/models/responses/user-role-data";
import { CellAlignment, CommonRowEventType } from "@/models/types";
import { getFormattedDate } from "@/utils/date-utils";
import { getFormattedNumber } from "@/utils/object-utils";
import { AppButton } from "@/components/form";
import { BodyRowComponentProps } from "@/components/tables/responsive-table";

interface BodyRowItemProps<T, K extends keyof T>
    extends BodyRowComponentProps<T, K> {
    // data: T;
    // alignments: Record<keyof T, CellAlignment>;
    onRowEvent: (id: string, eventType: CommonRowEventType) => void;
}

const TableBodyRowItem: FC<BodyRowItemProps<SalaryData, "id">> = (props) => {
    const { data: row, alignments, onRowEvent, arrayData } = props;
    const salary = useMemo(() => {
        const income = Object.values(row.salaryDetails.earnings).reduce(
            (acc, val) => acc + val,
            0
        );
        const deductions = Object.values(row.salaryDetails.deductions).reduce(
            (acc, val) => acc + val,
            0
        );
        return income - deductions;
    }, [row]);
    return (
        <>
            <TableCell
                // className="min-w-[100px]"
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
            <TableCell
                className="min-w-[200px]"
                align={alignments?.payDate || "left"}>
                {getFormattedDate(row.payDate, "DD/MM/YYYY")}
            </TableCell>
            <TableCell
                className="min-w-[200px]"
                align={alignments?.payPeriod || "left"}>
                {getFormattedDate(row.payPeriod, "MM-YYYY")}
            </TableCell>
            <TableCell align={alignments?.pfNo || "left"}>
                <div className="flex flex-col items-start justify-start">
                    <span>
                        <span className="font-bold">PF No: </span> {row.pfNo}
                    </span>
                    <span>
                        <span className="font-bold">PF UAN: </span> {row.pfUAN}
                    </span>
                </div>
            </TableCell>
            <TableCell align={alignments?.salaryDetails || "left"}>
                {getFormattedNumber(salary, "hi-IN")}
            </TableCell>
            {/* <TableCell align={alignments?.dob || "left"}>
                {getFormattedDate(row.dob, "DD/MM/YYYY")}
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
            <TableCell align={alignments?.skill || "left"}>
                {row.skill}
            </TableCell>
            <TableCell align={alignments?.site || "left"}>{row.site}</TableCell>
            <TableCell
                className={clsx("capitalize", row.status as EmployeeStatus)}
                key="status"
                align={alignments?.status || "left"}>
                {row.status?.replace("-", " ")}
            </TableCell> */}
            <TableCell align="right">
                <div className="flex flex-row justify-end gap-2">
                    <Tooltip title="View Payslip">
                        <AppButton
                            variant="icon"
                            size="small"
                            onClick={() => {
                                onRowEvent(row.id, "view");
                            }}>
                            <RemoveRedEye fontSize="small" />
                        </AppButton>
                    </Tooltip>
                </div>
            </TableCell>
        </>
    );
};

export default TableBodyRowItem;
