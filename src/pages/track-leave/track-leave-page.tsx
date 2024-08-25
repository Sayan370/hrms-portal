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
import useLeaveTracking from "./hooks/useLeaveTracking";

const TrackLeavePage = () => {
    const { rows, error, status, headCells, onRowEvent } = useLeaveTracking();
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
            {status === "loading" && <Loading grow />}
            {status === "error" && <FailedMessage grow />}
            {status === "success" && (
                <ResponsiveTable
                    primaryKey="id"
                    data={{
                        values: rows ?? [],
                        headerData: headCells,
                    }}
                    components={{ BodyComponent: TableBodyRowItem }}
                    rowCount={10}
                    rowsPerPageOptions={[5, 10, 20]}
                    innerProps={{
                        bodyProps: {
                            onRowEvent,
                        },
                    }}
                />
            )}
        </PageWithHeaderFooter>
    );
};

export default TrackLeavePage;
