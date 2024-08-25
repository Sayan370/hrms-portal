import React, { FC } from "react";
import { Checkbox, TableCell, TableRow } from "@mui/material";

import { CellAlignment } from "@/models/types";
import { ArrayData } from "../responsive-table";

// type IDType = string | number;

interface RowItemProps<T, K extends keyof T> {
    isItemSelected: boolean;
    isSelectable: boolean;
    data: T;
    labelId: string;
    onClick: (id: T[K]) => (event: React.MouseEvent<unknown>) => void;
    BodyComponent?: React.FC<any>;
    alignments?: Record<keyof T, CellAlignment>;
    bodyProps?: any;
    primaryKey: keyof T;
    arrayData: ArrayData;
}

const RowItem: FC<RowItemProps<{ [name: string]: any }, "id">> = (props) => {
    const {
        data: row,
        isItemSelected,
        isSelectable,
        onClick,
        labelId,
        alignments,
        BodyComponent,
        bodyProps,
        primaryKey,
        arrayData
    } = props;
    return (
        <TableRow
            hover
            role="checkbox"
            aria-checked={isItemSelected}
            tabIndex={-1}
            key={row[primaryKey]}
            selected={isItemSelected}>
            {isSelectable && (
                <TableCell padding="checkbox">
                    <Checkbox
                        onClick={onClick(row[primaryKey])}
                        checked={isItemSelected}
                        inputProps={{ "aria-labelledby": labelId }}
                    />
                </TableCell>
            )}

            {!!BodyComponent && (
                <BodyComponent
                    data={row}
                    alignments={alignments}
                    primaryKey={primaryKey}
                    arrayData={arrayData}
                    {...bodyProps}
                />
            )}
        </TableRow>
    );
};

export default RowItem;
