import * as React from "react";
import {
    Checkbox,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
} from "@mui/material";
import clsx from "clsx";

import { CellAlignment, Order, TableSizes } from "@/models/types";

import BodyRowItem from "./components/default-bodyrow";
import HeaderItem from "./components/default-header";
import HeaderGroupItem from "./components/default-header-group";
import DefaultPaginationActions from "./components/default-pagination-actions";
import RowItem from "./components/default-row";
import TableToolbar from "./components/default-toolbar";

// type IDType = string | number;

export type DefiniteValue<T> = {
    [P in keyof T]: T[P];
    // [name: string]: unknown;
};

export interface ToolbarProps<KeyType> {
    numSelected: number;
    selected: KeyType[];
    // [name: string]: any;
}
// interface BodyComponentProps {
//     data: any;
//     [name: string]: any;
// }

export interface HeaderData<TItem> {
    id: HeaderKeys<TItem>;
    align: CellAlignment;
    disablePadding: boolean;
    label: string | React.ReactNode;
    isSortable: boolean;
    isGroupSortable?: boolean;
    group?: string;
    groupAlign?: CellAlignment;
    colSpan?: number;
    rowSpan?: number;
    hideLabel?: boolean;
    className?: string;
}
export interface HeaderGroupData<TItem> {
    id: HeaderKeys<TItem>;
    align: CellAlignment;
    label: string;
    isSortable?: boolean;
    count: number;
    className?: string;
}

export interface ArrayData {
    index: number;
    length: number;
}

export type HeaderKeys<TItem> = keyof TItem | "actions" | "extra_actions";
export interface HeaderGroupComponentProps<TItem> {
    data: HeaderGroupData<TItem>;
    onSort?: (
        property: HeaderKeys<TItem>
    ) => (event: React.MouseEvent<unknown>) => void;
    orderBy: HeaderKeys<TItem>;
    order: Order;
    [name: string]: any;
}
export interface HeaderComponentProps<TItem> {
    data: HeaderData<TItem>;
    onSort?: (
        property: HeaderKeys<TItem>
    ) => (event: React.MouseEvent<unknown>) => void;
    // onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    orderBy: HeaderKeys<TItem>;
    order: Order;
    [name: string]: any;
}
export interface RowComponentProps<TItem, Key extends keyof TItem> {
    isItemSelected: boolean;
    isSelectable: boolean;
    data: TItem;
    labelId: string;
    onClick: (id: TItem[Key]) => (event: React.MouseEvent<unknown>) => void;
    primaryKey: Key;
    arrayData: ArrayData;
    [name: string]: any;
}
export interface BodyRowComponentProps<TItem, Key extends keyof TItem> {
    data: TItem;
    alignments: Record<keyof TItem, CellAlignment>;
    primaryKey: Key;
    arrayData: ArrayData;
    // [name: string]: any;
}

interface Components<
    TItem,
    Key extends keyof TItem,
    TBProps extends ToolbarProps<TItem[Key]>,
    BProps extends BodyRowComponentProps<TItem, Key>,
    FProps
> {
    Toolbar?: React.FC<TBProps>;
    Header?: React.FC<HeaderComponentProps<TItem>>;
    BodyComponent?: React.FC<BProps>;
    RowComponent?: React.FC<RowComponentProps<TItem, Key>>;
    FooterComponent?: React.FC<FProps>;
}

interface TableData<TItem extends DefiniteValue<TItem>> {
    // toolBarData?: any;
    headerData?: HeaderData<TItem>[];
    values: TItem[];
}

interface TableInnerProps<TBProps, BProps, FProps> {
    toolBarProps?: TBProps;
    headerProps?: any;
    bodyProps?: BProps;
    rowProps?: any;
    footerProps?: FProps;
}

export interface ResposiveTableProps<
    TItem extends DefiniteValue<TItem>,
    Key extends keyof TItem,
    TBProps extends ToolbarProps<TItem[Key]>,
    BProps extends BodyRowComponentProps<TItem, Key>,
    FProps
> {
    data: TableData<TItem>;
    components?: Components<TItem, Key, TBProps, BProps, FProps>;
    innerProps?: TableInnerProps<
        Omit<TBProps, keyof ToolbarProps<TItem[Key]>>,
        Omit<BProps, keyof BodyRowComponentProps<TItem, Key>>,
        FProps
    >;
    size?: TableSizes;
    orderBy?: HeaderKeys<TItem>;
    rowCount?: number;
    isSelectable?: boolean;
    className?: string;
    showToolBar?: boolean;
    disableAllSelectable?: boolean;
    stickyHeader?: boolean;
    disableDataPagination?: boolean;
    onPageChange?: (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
        page: number
    ) => void;
    page?: number;
    totalRows?: number;
    // onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
    onSelectAllClick?: (selected: TItem[Key][]) => void;
    selectedRows?: TItem[Key][];
    rowsPerPageOptions?: number[];
    primaryKey: Key;
    sortComparers?: Partial<
        Record<
            keyof TItem,
            (a: TItem, b: TItem, orderBy: keyof TItem) => number
        >
    >;
    "aria-label"?: string;
    tableStyle?: "bordered" | "clean";
    classes?: {
        selectAllCheckbox?: string;
    };
    paginationOptions?: {
        showFirstButton?: boolean;
        showLastButton?: boolean;
    };
    useRowIndexAsKey?: boolean;
    showJumpToPageInPagination?: boolean;
}
export interface ResposiveTablePropsWithoutDataPagination<
    TItem extends DefiniteValue<TItem>,
    Key extends keyof TItem,
    TBProps extends ToolbarProps<TItem[Key]>,
    BProps extends BodyRowComponentProps<TItem, Key>,
    FProps
> extends ResposiveTableProps<TItem, Key, TBProps, BProps, FProps> {
    disableDataPagination: true;
    onPageChange: (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
        page: number
    ) => void;
    page: number;
    totalRows?: number;
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator<TItem, Key extends HeaderKeys<TItem>>(
    order: Order,
    orderBy: Key,
    comparer?: (a: TItem, b: TItem, orderBy: keyof TItem) => number
): (a: TItem, b: TItem) => number {
    return order === "desc"
        ? (a, b) =>
              comparer
                  ? comparer(a, b, orderBy as keyof TItem)
                  : descendingComparator(a, b, orderBy as keyof TItem)
        : (a, b) =>
              -(comparer
                  ? comparer(a, b, orderBy as keyof TItem)
                  : descendingComparator(a, b, orderBy as keyof TItem));
}

const ResponsiveTable = <
    TItem extends DefiniteValue<TItem>,
    Key extends keyof TItem,
    TBProps extends ToolbarProps<TItem[Key]>,
    BProps extends BodyRowComponentProps<TItem, Key>,
    FProps
>(
    props:
        | ResposiveTableProps<TItem, Key, TBProps, BProps, FProps>
        | ResposiveTablePropsWithoutDataPagination<
              TItem,
              Key,
              TBProps,
              BProps,
              FProps
          >
) => {
    const {
        Toolbar = TableToolbar,
        Header = HeaderItem,
        BodyComponent = BodyRowItem,
        RowComponent = RowItem,
        FooterComponent,
    } = props?.components || {};
    const { headerData, values } = props?.data || {};
    const { toolBarProps, headerProps, bodyProps, rowProps, footerProps } =
        props?.innerProps || {};
    const {
        size,
        orderBy: orderByHeaderId = "",
        rowCount,
        className,
        isSelectable = false,
        showToolBar = false,
        disableAllSelectable = false,
        stickyHeader = false,
        disableDataPagination = false,
        onPageChange,
        onSelectAllClick,
        page: propPage,
        totalRows: propTotalRows,
        selectedRows = [],
        rowsPerPageOptions = [5, 10, 25],
        primaryKey,
        classes,
        sortComparers,
        paginationOptions,
        useRowIndexAsKey = false,
        showJumpToPageInPagination = false,
        tableStyle = "clean",
    } = props;

    const [order, setOrder] = React.useState<Order>("asc");
    const [orderBy, setOrderBy] = React.useState<HeaderKeys<TItem>>(
        orderByHeaderId as HeaderKeys<TItem>
    );
    const [selected, setSelected] = React.useState<TItem[Key][]>(selectedRows);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(rowCount ?? 5);

    const numSelected = selected.length;
    const totalRows = values.length;

    const isSelected = (name: TItem[Key]) => selected.indexOf(name) !== -1;

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: HeaderKeys<TItem>
    ) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const createSortHandler =
        (property: HeaderKeys<TItem>) => (event: React.MouseEvent<unknown>) => {
            handleRequestSort(event, property);
        };

    const handleSelectAllClick = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (event.target.checked) {
            const newSelecteds = values.map((n) => n[primaryKey]);
            setSelected(newSelecteds);
            if (onSelectAllClick) onSelectAllClick(newSelecteds);
            return;
        }
        setSelected([]);
        if (onSelectAllClick) onSelectAllClick([]);
    };

    const handleClick =
        (id: TItem[Key]) => (event: React.MouseEvent<unknown>) => {
            const selectedIndex = selected.indexOf(id);
            let newSelected: TItem[Key][] = [];

            if (selectedIndex === -1) {
                newSelected = newSelected.concat(selected, id);
            } else if (selectedIndex === 0) {
                newSelected = newSelected.concat(selected.slice(1));
            } else if (selectedIndex === selected.length - 1) {
                newSelected = newSelected.concat(selected.slice(0, -1));
            } else if (selectedIndex > 0) {
                newSelected = newSelected.concat(
                    selected.slice(0, selectedIndex),
                    selected.slice(selectedIndex + 1)
                );
            }

            setSelected(newSelected);
        };

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
        newPage: number
    ) => {
        if (!disableDataPagination) setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value));
        if (!disableDataPagination) setPage(0);
    };

    React.useEffect(() => {
        if (JSON.stringify(selectedRows) !== JSON.stringify(selected)) {
            setSelected(selectedRows);
        }
    }, [selectedRows]);

    const headerGroups = React.useMemo(() => {
        const groups = headerData?.reduce<
            {
                label: string;
                count: number;
                align: CellAlignment;
                id: HeaderKeys<TItem>;
                isSortable?: boolean;
                className?: string;
            }[]
        >((acc, val, i) => {
            if (acc[acc.length - 1]?.label === val.group) {
                if (acc[acc.length - 1]?.count) acc[acc.length - 1].count += 1;
            } else {
                acc.push({
                    label: val.group || "",
                    count: 1,
                    align: val.groupAlign || val.align || "center",
                    isSortable: val.isGroupSortable,
                    id: val.id,
                    className: val.className,
                });
            }
            return acc;
        }, []);
        return groups?.length === 1 ? (!groups[0].label ? [] : groups) : groups;
    }, [headerData]);

    const resetPagination = () => {
        setPage(0);
        if (onPageChange) {
            onPageChange(null, 0);
        }
    };

    return (
        <div className={clsx("w-full", className)}>
            <Paper
                className={clsx(
                    "mb-2 w-full rounded-sm",
                    "border border-solid border-gray-300 !shadow-md dark:border-gray-600",
                    stickyHeader && "overflow-hidden"
                )}>
                {showToolBar && !!Toolbar && (
                    <Toolbar
                        {...(toolBarProps as TBProps)}
                        numSelected={numSelected}
                        selected={selected}
                        resetPagination={resetPagination}
                    />
                )}
                <TableContainer
                    sx={
                        stickyHeader
                            ? { maxHeight: "calc(100vh - 198px)" }
                            : undefined
                    }>
                    <Table
                        className={clsx("responsive-table")}
                        sx={(theme) => ({
                            minWidth: 750,
                            "& .MuiTableCell-root":
                                tableStyle === "bordered"
                                    ? {
                                          border: `1px solid ${theme.palette.divider}`,
                                      }
                                    : {
                                          borderLeft: "unset !important",
                                          borderRight: "unset !important",
                                      },
                        })}
                        aria-labelledby="tableTitle"
                        size={size ?? "medium"}
                        aria-label={props["aria-label"]}
                        stickyHeader={stickyHeader}>
                        <TableHead
                            className={clsx(
                                "responsive-table__header dark:bg-[#121212]",
                                !(showToolBar && !!Toolbar) && "no-toolbar"
                            )}>
                            {!!headerGroups?.length && (
                                <TableRow>
                                    {headerGroups?.map((r, i) => (
                                        <HeaderGroupItem
                                            onSort={createSortHandler}
                                            order={order}
                                            orderBy={orderBy}
                                            data={r}
                                            key={i}
                                        />
                                    ))}
                                </TableRow>
                            )}
                            <TableRow>
                                {isSelectable && (
                                    <TableCell
                                        padding="checkbox"
                                        className={clsx(
                                            classes?.selectAllCheckbox
                                        )}>
                                        <Checkbox
                                            indeterminate={
                                                numSelected > 0 &&
                                                numSelected < totalRows
                                            }
                                            checked={
                                                totalRows > 0 &&
                                                numSelected === totalRows
                                            }
                                            onChange={handleSelectAllClick}
                                            disabled={disableAllSelectable}
                                            inputProps={{
                                                "aria-label":
                                                    "select all users",
                                            }}
                                        />
                                    </TableCell>
                                )}
                                {!!headerData &&
                                    headerData.map(
                                        (headCell) =>
                                            !!Header && (
                                                <Header
                                                    onSort={createSortHandler}
                                                    order={order}
                                                    orderBy={orderBy}
                                                    {...headerProps}
                                                    data={headCell}
                                                    key={headCell.id}
                                                />
                                            )
                                    )}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {stableSort<TItem>(
                                values,
                                getComparator<TItem, HeaderKeys<TItem>>(
                                    order,
                                    orderBy,
                                    sortComparers?.[orderBy as keyof TItem]
                                )
                            )
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((row, index) => {
                                    const isItemSelected = isSelected(
                                        row[primaryKey]
                                    );
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <RowComponent
                                            isItemSelected={isItemSelected}
                                            isSelectable={isItemSelected}
                                            data={row}
                                            labelId={labelId}
                                            onClick={handleClick}
                                            BodyComponent={BodyComponent}
                                            alignments={headerData?.reduce(
                                                (acc, item) => ({
                                                    ...acc,
                                                    [item.id]: item.align,
                                                }),
                                                {}
                                            )}
                                            bodyProps={bodyProps}
                                            key={
                                                useRowIndexAsKey
                                                    ? (propPage ?? page ?? 0) *
                                                          rowsPerPage +
                                                      index
                                                    : row[primaryKey]
                                            }
                                            primaryKey={primaryKey}
                                            arrayData={{
                                                index:
                                                    (propPage ?? page ?? 0) *
                                                        rowsPerPage +
                                                    index,
                                                length:
                                                    propTotalRows ??
                                                    totalRows ??
                                                    0,
                                            }}
                                            {...rowProps}
                                        />
                                    );
                                })}
                        </TableBody>
                        {!!FooterComponent && (
                            <TableFooter>
                                <FooterComponent
                                    {...(footerProps as FProps & {})}
                                />
                            </TableFooter>
                        )}
                    </Table>
                </TableContainer>
                {!disableDataPagination ? (
                    <TablePagination
                        rowsPerPageOptions={rowsPerPageOptions}
                        component="div"
                        count={totalRows}
                        rowsPerPage={rowsPerPage}
                        ActionsComponent={
                            showJumpToPageInPagination
                                ? DefaultPaginationActions
                                : undefined
                        }
                        page={page}
                        size={size}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        {...(paginationOptions ?? {})}
                    />
                ) : (
                    <TablePagination
                        rowsPerPageOptions={[
                            { value: -1, label: `${rowCount}` },
                        ]}
                        component="div"
                        ActionsComponent={
                            showJumpToPageInPagination
                                ? DefaultPaginationActions
                                : undefined
                        }
                        count={propTotalRows ?? totalRows}
                        rowsPerPage={rowsPerPage}
                        page={propPage ?? page}
                        size={size}
                        onPageChange={onPageChange ?? handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        {...(paginationOptions ?? {})}
                    />
                )}
            </Paper>
        </div>
    );
};

export default ResponsiveTable;
