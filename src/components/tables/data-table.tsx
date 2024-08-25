import { Paper } from "@mui/material";
import {
    DataGrid,
    GridColDef,
    GridDensity,
    GridFooter,
    GridRowsProp,
    GridToolbar,
} from "@mui/x-data-grid";
import clsx from "clsx";

export type DTRowsData = GridRowsProp;
export type DTColumnsData = GridColDef[];

interface DataTableProps {
    rows: DTRowsData;
    columns: DTColumnsData;
    enableToolbar?: boolean;
    enableFooter?: boolean;
    density?: GridDensity;
    className?: string;
}

const DataTable = (props: DataTableProps) => {
    const {
        rows,
        columns,
        enableToolbar = false,
        enableFooter = false,
        className = "h-80",
        ...restProps
    } = props;
    return (
        <Paper className={clsx("w-full !shadow-md", className)}>
            <DataGrid
                rows={rows}
                columns={columns}
                hideFooter={!enableFooter}
                components={{
                    Toolbar: enableToolbar ? GridToolbar : undefined,
                    Footer: enableFooter ? GridFooter : undefined,
                }}
                {...restProps}
            />
        </Paper>
    );
};

export default DataTable;
