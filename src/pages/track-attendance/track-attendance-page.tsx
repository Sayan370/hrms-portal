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

import AttendanceDialog from "./components/attendance-dialog";
import DateSwitcher from "./components/date-switcher";
import TableBodyRowItem from "./components/table-bodyrow";
import TableDailyBodyRowItem from "./components/table-daily-bodyrow";
import TableToolbar from "./components/table-toolbar";
import useAttendance from "./hooks/useAttendance";

const TrackAttendancePage = () => {
    const {
        rows,
        error,
        status,
        modHeadCells,
        handleTabChange,
        dailyData,
        dailyError,
        dailyStatus,
        headDailyCells,
        onTextSearch,
        filteredRows,
        onRowAction,
        editData,
        modalState,
        handleClose,
        handleSubmit,
        mutStatus,
        selectedDate,
        setCurrentDate,
        maxSelectDate,
        minSelectDate,
    } = useAttendance();
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
            <TabGroup
                defaultValue={0}
                orientation="horizontal"
                onTabChange={handleTabChange}>
                <TabList scrollButtons variant="standard">
                    <Tab label="Daily" value={0} />
                    <Tab label="Weekly" value={1} />
                    <Tab label="Monthly" value={2} />
                </TabList>
                <TabPanels>
                    <TabPanel value={0}>
                        {dailyStatus === "loading" && <Loading grow />}
                        {dailyStatus === "error" && (
                            <FailedMessage grow text={dailyError?.message} />
                        )}
                        {dailyStatus === "success" && (
                            <div className="space-y-2">
                                <DateSwitcher
                                    onChange={setCurrentDate}
                                    value={selectedDate}
                                    maxDate={maxSelectDate}
                                    // minDate={minSelectDate}
                                />
                                <ResponsiveTable
                                    tableStyle="bordered"
                                    primaryKey="id"
                                    showToolBar
                                    data={{
                                        values: filteredRows ?? [],
                                        headerData: headDailyCells,
                                    }}
                                    components={{
                                        BodyComponent: TableDailyBodyRowItem,
                                        Toolbar: TableToolbar,
                                    }}
                                    innerProps={{
                                        bodyProps: {
                                            onRowEvent: onRowAction,
                                        },
                                        toolBarProps: {
                                            // onIconClick,
                                            onTextSearch,
                                        },
                                    }}
                                    rowCount={20}
                                    rowsPerPageOptions={[5, 10, 20]}
                                    size="small"
                                />
                            </div>
                        )}
                    </TabPanel>
                    <TabPanel value={1}>
                        {status === "loading" && <Loading grow />}
                        {status === "error" && (
                            <FailedMessage grow text={error?.message} />
                        )}
                        {status === "success" && (
                            <ResponsiveTable
                                tableStyle="bordered"
                                primaryKey="id"
                                data={{
                                    values: rows ?? [],
                                    headerData: modHeadCells,
                                }}
                                components={{
                                    BodyComponent: TableBodyRowItem,
                                }}
                                rowCount={20}
                                rowsPerPageOptions={[5, 10, 20]}
                                size="small"
                            />
                        )}
                    </TabPanel>
                    <TabPanel value={2}>
                        {status === "loading" && <Loading grow />}
                        {status === "error" && (
                            <FailedMessage grow text={error?.message} />
                        )}
                        {status === "success" && (
                            <ResponsiveTable
                                tableStyle="bordered"
                                primaryKey="id"
                                data={{
                                    values: rows ?? [],
                                    headerData: modHeadCells,
                                }}
                                components={{
                                    BodyComponent: TableBodyRowItem,
                                }}
                                rowCount={20}
                                rowsPerPageOptions={[5, 10, 20]}
                                size="small"
                            />
                        )}
                    </TabPanel>
                </TabPanels>
            </TabGroup>
            <AttendanceDialog
                isModalOpen={modalState}
                handleClose={handleClose}
                editData={editData}
                handleSubmit={handleSubmit}
                submitStatus={mutStatus}
            />
        </PageWithHeaderFooter>
    );
};

export default TrackAttendancePage;
