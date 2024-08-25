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
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@/components/tabs";

import EmployeeOnboardingDialog from "./components/onboard-employee";
import TableBodyRowItem from "./components/table-bodyrow";
import useEmployee from "./hooks/useEmployee";

const EmployeesPage = () => {
    const {
        rows,
        error,
        status,
        headCells,
        onTextSearch,
        filteredRows,
        onRowAction,
        editData,
        modalState,
        handleClose,
        handleSubmit,
        mutStatus,
    } = useEmployee();
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
                    tableStyle="bordered"
                    primaryKey="empId"
                    showToolBar
                    data={{
                        values: filteredRows ?? [],
                        headerData: headCells,
                    }}
                    components={{ BodyComponent: TableBodyRowItem }}
                    innerProps={{
                        bodyProps: {
                            onRowEvent: onRowAction,
                        },
                        toolBarProps: {
                            onTextSearch,
                        },
                    }}
                    rowCount={10}
                    rowsPerPageOptions={[5, 10, 20]}
                />
            )}

            <EmployeeOnboardingDialog
                isModalOpen={modalState}
                handleClose={handleClose}
                editData={editData}
                handleSubmit={handleSubmit}
                submitStatus={mutStatus}
            />
        </PageWithHeaderFooter>
    );
};

export default EmployeesPage;
