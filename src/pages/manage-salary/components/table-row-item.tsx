import React, { FC, useState } from "react";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import {
    Checkbox,
    Collapse,
    TableCell,
    tableCellClasses,
    TableRow,
    Tooltip,
} from "@mui/material";
import clsx from "clsx";

import { SalaryData } from "@/models/responses/salary-data";
import { getFormattedNumber } from "@/utils/object-utils";
import FailedMessage from "@/components/failed-message";
import { AppButton } from "@/components/form";
import { Loading } from "@/components/loading";
import { DataTable } from "@/components/tables";
import ResponsiveTable, {
    RowComponentProps,
} from "@/components/tables/responsive-table";

import useSalaryBreakdown from "../hooks/useSalaryBreakdown";

const TableRowItem: FC<RowComponentProps<SalaryData, "id">> = (props) => {
    const {
        data: row,
        isItemSelected,
        isSelectable,
        onClick,
        labelId,
        alignments,
        BodyComponent,
        bodyProps,
        arrayData,
        primaryKey,
    } = props;
    const { open, toggleCollapse } = useSalaryBreakdown(row);

    return (
        <>
            <TableRow
                hover
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={row[primaryKey]}
                selected={isItemSelected}
                sx={{
                    [`& .${tableCellClasses.root}`]: {
                        borderBottom: "none",
                    },
                }}>
                {isSelectable && (
                    <TableCell padding="checkbox">
                        <Checkbox
                            onClick={onClick(row[primaryKey])}
                            checked={isItemSelected}
                            inputProps={{ "aria-labelledby": labelId }}
                        />
                    </TableCell>
                )}
                <TableCell>
                    <Tooltip title={open ? "Collapse" : "Expand"}>
                        <span>
                            <AppButton
                                aria-label="expand row"
                                size="small"
                                onClick={toggleCollapse}
                                variant="icon">
                                {open ? (
                                    <KeyboardArrowUp />
                                ) : (
                                    <KeyboardArrowDown />
                                )}
                            </AppButton>
                        </span>
                    </Tooltip>
                </TableCell>

                {!!BodyComponent && (
                    <BodyComponent
                        data={row}
                        alignments={alignments}
                        arrayData={arrayData}
                        {...bodyProps}
                    />
                )}
            </TableRow>
            <TableRow className="bg-slate-50 dark:bg-slate-950">
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={9}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <div className="my-2 flex flex-col gap-2 p:flex-row">
                            <DataTable
                                className="h-48"
                                density="compact"
                                columns={[
                                    {
                                        field: "label",
                                        minWidth: 300,
                                        headerName: "Earnings",
                                    },
                                    {
                                        field: "value",
                                        headerName: "Amount",
                                        align: "right",
                                    },
                                ]}
                                rows={[
                                    ...Object.entries(
                                        row.salaryDetails.earnings
                                    ).map(([label, val], i) => ({
                                        id: i,
                                        label,
                                        value: `₹ ${getFormattedNumber(
                                            val,
                                            "hi-IN"
                                        )}`,
                                    })),
                                    {
                                        id: "total",
                                        label: "Total Amount",
                                        value: `₹ ${getFormattedNumber(
                                            Object.values(
                                                row.salaryDetails.earnings
                                            ).reduce(
                                                (acc, val) => acc + val,
                                                0
                                            ),
                                            "hi-IN"
                                        )}`,
                                    },
                                ]}
                            />
                            <DataTable
                                className="h-48"
                                density="compact"
                                columns={[
                                    {
                                        field: "label",
                                        minWidth: 300,
                                        headerName: "Deductions",
                                    },
                                    {
                                        field: "value",
                                        headerName: "Amount",
                                        align: "right",
                                    },
                                ]}
                                rows={[
                                    ...Object.entries(
                                        row.salaryDetails.deductions
                                    ).map(([label, val], i) => ({
                                        id: i,
                                        label,
                                        value: `₹ ${getFormattedNumber(
                                            val,
                                            "hi-IN"
                                        )}`,
                                    })),
                                    {
                                        id: "total",
                                        label: "Total Amount",
                                        value: `₹ ${getFormattedNumber(
                                            Object.values(
                                                row.salaryDetails.deductions
                                            ).reduce(
                                                (acc, val) => acc + val,
                                                0
                                            ),
                                            "hi-IN"
                                        )}`,
                                    },
                                ]}
                            />
                        </div>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};

export default TableRowItem;
