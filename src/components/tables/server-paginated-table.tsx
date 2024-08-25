import ResponsiveTable, {
    BodyRowComponentProps,
    DefiniteValue,
    ResposiveTablePropsWithoutDataPagination,
    ToolbarProps,
} from "./responsive-table";

interface ServerPaginatedTableProps<TItem extends DefiniteValue<TItem>, Key extends keyof TItem, TBProps extends ToolbarProps<TItem[Key]>, BProps extends BodyRowComponentProps<TItem, Key>, FProps>
    extends Omit<
        ResposiveTablePropsWithoutDataPagination<TItem, Key, TBProps, BProps, FProps>,
        "disableDataPagination"
    > { }

const ServerPaginatedTable = <
    TItem extends DefiniteValue<TItem>,
    Key extends keyof TItem,
    TBProps extends ToolbarProps<TItem[Key]>,
    BProps extends BodyRowComponentProps<TItem, Key>,
    FProps
>(
    props: ServerPaginatedTableProps<TItem, Key, TBProps, BProps, FProps>
) => {
    return <ResponsiveTable {...props} disableDataPagination />;
};

export default ServerPaginatedTable;
