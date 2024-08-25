import { FC } from "react";
import { TableCell } from "@mui/material";

import { StockMovementItem } from "@/models/responses/stock-movement-data";
import { getFormattedDate } from "@/utils/date-utils";
import { BodyRowComponentProps } from "@/components/tables/responsive-table";

interface BodyRowItemProps<T, K extends keyof T>
    extends BodyRowComponentProps<T, K> {
    // data: T;
    // alignments: Record<keyof T, CellAlignment>;
    // onRowEvent: (id: string, eventType: CommonRowEventType) => void;
}

const TableBodyRowItem: FC<BodyRowItemProps<StockMovementItem, "serialNo">> = (
    props
) => {
    const { data: row, alignments, arrayData } = props;

    return (
        <>
            <TableCell align={alignments?.serialNo || "left"}>
                {arrayData.index + 1}
            </TableCell>
            <TableCell
                className="min-w-[100px]"
                align={alignments?.siteName || "left"}>
                {row.siteName}
            </TableCell>
            <TableCell
                className="min-w-[100px]"
                align={alignments?.itemName || "left"}>
                {row.itemName}
            </TableCell>
            <TableCell align={alignments?.stockInDate || "left"}>
                {getFormattedDate(row.stockInDate, "DD/MM/YYYY")}
            </TableCell>
            <TableCell align={alignments?.stockOutDate || "left"}>
                {getFormattedDate(row.stockOutDate, "DD/MM/YYYY")}
            </TableCell>
            <TableCell align={alignments?.balanceStock || "left"}>
                {row.balanceStock}
            </TableCell>
            <TableCell align={alignments?.daysInventoryOutstanding || "left"}>
                {row.daysInventoryOutstanding}
            </TableCell>
        </>
    );
};

export default TableBodyRowItem;
