import { FC } from "react";
import { TableCell } from "@mui/material";

import {
    StockHistoryCategory,
    StockHistoryData,
} from "@/models/responses/inventory-data";
import { CommonRowEventType } from "@/models/types";
import { getFormattedDate } from "@/utils/date-utils";
import { getFormattedNumber, separateWords } from "@/utils/object-utils";
import { BodyRowComponentProps } from "@/components/tables/responsive-table";

interface BodyRowItemProps<T, K extends keyof T>
    extends BodyRowComponentProps<T, K> {
    // data: T;
    // alignments: Record<keyof T, CellAlignment>;
    onRowEvent: (id: string, eventType: CommonRowEventType) => void;
}

const TableBodyRowItem: FC<BodyRowItemProps<StockHistoryData, "id">> = (
    props
) => {
    const handleClick = (id: string, event: CommonRowEventType) => () =>
        onRowEvent(id, event);
    const { data: row, alignments, onRowEvent, arrayData } = props;
    return (
        <>
            <TableCell
                className="min-w-[100px]"
                align={alignments?.id || "left"}>
                {arrayData.index + 1}
            </TableCell>
            <TableCell
                className="min-w-[100px]"
                align={alignments?.category || "left"}>
                {separateWords(StockHistoryCategory[row.category])}
            </TableCell>
            <TableCell
                className="min-w-[200px]"
                align={alignments?.name || "left"}>
                {row.name}
            </TableCell>
            <TableCell
                className="min-w-[150px]"
                align={alignments?.qty || "left"}>
                {row.qty}
            </TableCell>
            <TableCell
                className="min-w-[100px]"
                align={alignments?.unit || "left"}>
                {row.unit}
            </TableCell>
            <TableCell
                className="min-w-[120px]"
                align={alignments?.rateOfUnit || "left"}>
                {row.rateOfUnit}
            </TableCell>
            <TableCell
                className="min-w-[150px]"
                align={alignments?.amount || "left"}>
                {getFormattedNumber(row.amount, "hi-IN")}
            </TableCell>
            <TableCell
                className="min-w-[200px]"
                align={alignments?.sellerName || "left"}>
                {row.sellerName}
            </TableCell>
            <TableCell
                className="min-w-[200px]"
                align={alignments?.dateOfPurchase || "left"}>
                {getFormattedDate(row.dateOfPurchase, "DD/MM/YYYY")}
            </TableCell>
            <TableCell
                className="min-w-[200px]"
                align={alignments?.dateOfRecieving || "left"}>
                {getFormattedDate(row.dateOfRecieving, "DD/MM/YYYY hh:mm A")}
            </TableCell>
            <TableCell
                className="min-w-[150px]"
                align={alignments?.qtyOfRecieving || "left"}>
                {row.qtyOfRecieving}
            </TableCell>
            <TableCell
                className="min-w-[200px]"
                align={alignments?.dateOfRequisition || "left"}>
                {getFormattedDate(row.dateOfRequisition, "DD/MM/YYYY hh:mm A")}
            </TableCell>
            <TableCell
                className="min-w-[150px]"
                align={alignments?.qtyOfRequisition || "left"}>
                {row.qtyOfRequisition}
            </TableCell>
            <TableCell
                className="min-w-[200px]"
                align={alignments?.requesterName || "left"}>
                {row.requesterName}
            </TableCell>
        </>
    );
};

export default TableBodyRowItem;
