import { useMemo, useState } from "react";
import { useQuery } from "react-query";

import { AwaitedReturnType } from "@/models/utility-types";
import { QueryConst } from "@/constants/query-constants";
import { HeaderData } from "@/components/tables/responsive-table";
import { separateWords } from "@/utils/object-utils";
import { getFormattedDate } from "@/utils/date-utils";
import { getMaintenanceHistoryData } from "@/services/api/maintenance-ep";
import { MaintenanceData, MaintenanceType } from "@/models/responses/maintenance-data";

type SegmentType = "stock";

const useMaintenance = () => {
    const [modalState, setModalState] = useState<boolean>(false);
    const [editData, setEditData] = useState<MaintenanceData | undefined>();
    const [searchText, setSearchText] = useState("");
    const [tab, setTab] = useState<SegmentType>("stock");
    const { data: maintenanceData, error: inventoryGetError, status: inventoryGetStatus } = useQuery<
        AwaitedReturnType<typeof getMaintenanceHistoryData>,
        Error
    >([QueryConst.getMaintenanceHistoryList], getMaintenanceHistoryData);


    const handleTabChange = (selected: number) => {
        setTab("stock");
    };
    const headCells: HeaderData<MaintenanceData>[] = [
        {
            id: "id",
            isSortable: false,
            disablePadding: true,
            label: "S. No",
            align: "left",
        },
        {
            id: "doorNo",
            isSortable: false,
            disablePadding: true,
            label: "Door No",
            align: "left",
        },
        {
            id: "date",
            isSortable: false,
            disablePadding: true,
            label: "Date",
            align: "left",
        },
        {
            id: "maintenanceType",
            isSortable: false,
            disablePadding: true,
            label: "Maintenance Type",
            align: "left",
        },
        {
            id: "timeTaken",
            isSortable: false,
            disablePadding: true,
            label: "Time Taken",
            align: "left",
        },
        {
            id: "maintenanceDone",
            isSortable: false,
            disablePadding: true,
            label: "Maintenance Done",
            align: "left",
        },
        {
            id: "totalTimeTakenDay",
            isSortable: false,
            disablePadding: true,
            label: "Total Time Taken (Day)",
            align: "left",
        },
        {
            id: "totalTimeTakenVehicle",
            isSortable: false,
            disablePadding: true,
            label: "Total Time Taken (Vehicle)",
            align: "left",
        },
    ];
    const onTextSearch = (text?: string) => {
        setSearchText(text || "");
    };
    const getFilterString = (data: MaintenanceData) =>
        `${data.maintenanceDone}|${data.doorNo}|${data.timeTaken}|${separateWords(MaintenanceType[data.maintenanceType])}|${data.totalTimeTakenDay}|${data.totalTimeTakenVehicle
        }|${getFormattedDate(
            data.date,
            "DD/MM/YYYY hh:mm:ssA"
        )}`;
    const filteredRows = useMemo(
        () =>
            maintenanceData?.filter((item) =>
                getFilterString(item)
                    .trim()
                    .toLowerCase().includes(searchText.toLowerCase())
            ),
        [maintenanceData, searchText]
    );
    const handleClose = () => {
        setModalState(false);
    };
    const onIconClick = (eventType: "add" | "delete") => {
        switch (eventType) {
            case "add":
                setModalState(true);
                break;
            default:
                break;
        }
    };
    return {
        maintenanceData,
        handleTabChange,
        headCells,
        onTextSearch,
        filteredRows,
        editData,
        modalState,
        handleClose,
        inventoryGetError,
        inventoryGetStatus,
        onIconClick
    };
};

export default useMaintenance;
