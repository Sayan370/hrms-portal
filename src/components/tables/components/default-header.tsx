import { FC } from "react";
import { Box, TableCell, TableSortLabel } from "@mui/material";
import { visuallyHidden } from "@mui/utils";

import clsx from "clsx";
import { HeaderComponentProps, HeaderData } from "../responsive-table";

type HeadCell = HeaderData<unknown>;

type HeaderItemProps = HeaderComponentProps<unknown>;

const HeaderItem: FC<HeaderItemProps> = (props) => {
    const { data: headCell, orderBy, order, onSort } = props;

    return (
        !headCell?.hideLabel ?
            <TableCell
                key={headCell.id}
                align={headCell.align}
                className={clsx(headCell.className)}
                rowSpan={headCell?.rowSpan}
                colSpan={headCell?.colSpan}
                sortDirection={orderBy === headCell.id ? order : false}>
                {!headCell.isSortable ? (
                    <span>{headCell.label}</span>
                ) : (
                    <TableSortLabel
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : "asc"}
                        onClick={onSort ? onSort(headCell.id) : undefined}>
                        {headCell.label}
                        {orderBy === headCell.id ? (
                            <Box component="span" sx={visuallyHidden}>
                                {order === "desc"
                                    ? "sorted descending"
                                    : "sorted ascending"}
                            </Box>
                        ) : null}
                    </TableSortLabel>
                )}
            </TableCell> : null
    );
};

export default HeaderItem;
