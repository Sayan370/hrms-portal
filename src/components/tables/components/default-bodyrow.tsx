import { FC } from "react";
import { TableCell } from "@mui/material";

import { CellAlignment } from "@/models/types";

import { HeaderData } from "../responsive-table";

interface BodyRowItemProps<T> {
    data: T;
    alignments: Record<keyof T, CellAlignment>;
    primaryKey: keyof T;
    // onRowEvent: (id: string, eventType: RowEventType) => void;
}

const BodyRowItem: FC<BodyRowItemProps<{ [name: string]: any }>> = (props) => {
    const { data: row, alignments, primaryKey } = props;
    return (
        <>
            {Object.entries(row)
                .filter(([key]) => key !== primaryKey)
                .map(([key, item], i) => (
                    <TableCell
                        key={key || i}
                        align={alignments?.[key] || "left"}>
                        {item || ""}
                    </TableCell>
                ))}
        </>
    );
};

export default BodyRowItem;
