import { FC } from "react";
import { Box, TableCell, TableSortLabel } from "@mui/material";
import { visuallyHidden } from "@mui/utils";

import clsx from "clsx";
import { HeaderComponentProps, HeaderData, HeaderGroupComponentProps } from "../responsive-table";

type HeadCell = HeaderData<unknown>;

type HeaderGroupItemProps<TItem> = HeaderGroupComponentProps<TItem>;

const HeaderGroupItem = <TItem,>(props: HeaderGroupItemProps<TItem>) => {
    const { data: r, orderBy, order, onSort } = props;

    return (
        <TableCell className={clsx(r.className)} align={r.align} rowSpan={r.count === 1 ? 2 : 1} colSpan={r.count === 1 ? undefined : r.count} scope="col" sortDirection={orderBy === r.id ? order : false}>
            {!r.isSortable ? (
                <span>{r.label}</span>
            ) : (
                <TableSortLabel
                    active={orderBy === r.id}
                    direction={orderBy === r.id ? order : "asc"}
                    onClick={onSort ? onSort(r.id) : undefined}>
                    {r.label}
                    {orderBy === r.id ? (
                        <Box component="span" sx={visuallyHidden}>
                            {order === "desc"
                                ? "sorted descending"
                                : "sorted ascending"}
                        </Box>
                    ) : null}
                </TableSortLabel>
            )}
        </TableCell>
    );
};

export default HeaderGroupItem;
