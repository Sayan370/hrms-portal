import { FilterList } from "@mui/icons-material";
import { Tooltip } from "@mui/material";

import PageWithHeaderFooter, {
    PWHFHeaderActions,
} from "@/layouts/page-with-header-footer";
import FailedMessage from "@/components/failed-message";
import { AppButton } from "@/components/form";
import { ExcelExport } from "@/components/icons";
import { Loading } from "@/components/loading";
import { ResponsiveTable } from "@/components/tables";

import TableBodyRowItem from "./components/table-bodyrow";
import TableToolbar from "./components/table-toolbar";
import useStockMovement from "./hooks/useStockMovement";

const StockMovementPage = () => {
    const {
        headCells,
        onTextSearch,
        filteredRows,
        inventoryGetStatus,
        inventoryGetError,
    } = useStockMovement();
    return (
        <PageWithHeaderFooter>
            <PWHFHeaderActions className="items-center gap-2">
                <AppButton
                    onClick={() => {
                        window.open(
                            "https://docs.google.com/spreadsheets/d/1odemWls5b3MjxEZxRQi6S40uHS-xOKwX4MaRtXsQJoM/edit?gid=0#gid=0"
                        );
                    }}
                    variant="text"
                    buttonProps={{ startIcon: <ExcelExport /> }}>
                    Export
                </AppButton>
                <Tooltip title="Filter">
                    <AppButton variant="icon">
                        <FilterList />
                    </AppButton>
                </Tooltip>
            </PWHFHeaderActions>
            {inventoryGetStatus === "loading" && <Loading grow />}
            {inventoryGetStatus === "error" && (
                <FailedMessage grow text={inventoryGetError?.message} />
            )}
            {inventoryGetStatus === "success" && (
                <ResponsiveTable
                    tableStyle="bordered"
                    primaryKey="serialNo"
                    showToolBar
                    data={{
                        values: filteredRows ?? [],
                        headerData: headCells,
                    }}
                    components={{
                        BodyComponent: TableBodyRowItem,
                        Toolbar: TableToolbar,
                    }}
                    innerProps={{
                        toolBarProps: {
                            onTextSearch,
                        },
                    }}
                    rowCount={20}
                    rowsPerPageOptions={[5, 10, 20]}
                    size="small"
                />
            )}
        </PageWithHeaderFooter>
    );
};

export default StockMovementPage;
