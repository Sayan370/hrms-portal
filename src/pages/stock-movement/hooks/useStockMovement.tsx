import { useMemo, useState } from "react";
import { getInventoryMovementData } from "@/services/api/inventory-ep";
import { useQuery } from "react-query";

import { StockMovementItem } from "@/models/responses/stock-movement-data";
import { AwaitedReturnType } from "@/models/utility-types";
import { QueryConst } from "@/constants/query-constants";
import { getFormattedDate } from "@/utils/date-utils";
import { HeaderData } from "@/components/tables/responsive-table";

type SegmentType = "stock";

const useStockMovement = () => {
    const [modalState, setModalState] = useState<boolean>(false);
    const [searchText, setSearchText] = useState("");
    const [tab, setTab] = useState<SegmentType>("stock");
    const {
        data: maintenanceData,
        error: inventoryGetError,
        status: inventoryGetStatus,
    } = useQuery<AwaitedReturnType<typeof getInventoryMovementData>, Error>(
        [QueryConst.getMaintenanceHistoryList],
        getInventoryMovementData
    );

    const handleTabChange = (selected: number) => {
        setTab("stock");
    };
    const headCells: HeaderData<StockMovementItem>[] = [
        {
            id: "serialNo",
            isSortable: false,
            disablePadding: true,
            label: "S. No",
            align: "left",
        },
        {
            id: "siteName",
            isSortable: false,
            disablePadding: true,
            label: "Site Name",
            align: "left",
        },
        {
            id: "itemName",
            isSortable: false,
            disablePadding: true,
            label: "Item Name",
            align: "left",
        },
        {
            id: "stockInDate",
            isSortable: false,
            disablePadding: true,
            label: "Stock In Date",
            align: "left",
        },
        {
            id: "stockOutDate",
            isSortable: false,
            disablePadding: true,
            label: "Stock Out Date",
            align: "left",
        },
        {
            id: "balanceStock",
            isSortable: false,
            disablePadding: true,
            label: "Balance Stock",
            align: "right",
        },
        {
            id: "daysInventoryOutstanding",
            isSortable: false,
            disablePadding: true,
            label: "Days Inventory Outstanding (DIO)",
            align: "right",
        },
    ];
    const onTextSearch = (text?: string) => {
        setSearchText(text || "");
    };
    const getFilterString = (data: StockMovementItem) =>
        `${data.siteName}|${data.itemName}|${data.serialNo}|${
            data.daysInventoryOutstanding
        }|${getFormattedDate(
            data.stockInDate,
            "DD/MM/YYYY hh:mm:ssA"
        )}|${getFormattedDate(data.stockOutDate, "DD/MM/YYYY hh:mm:ssA")}`;
    const filteredRows = useMemo(
        () =>
            maintenanceData?.filter((item) =>
                getFilterString(item)
                    .trim()
                    .toLowerCase()
                    .includes(searchText.toLowerCase())
            ),
        [maintenanceData, searchText]
    );
    const handleClose = () => {
        setModalState(false);
    };
    return {
        maintenanceData,
        handleTabChange,
        headCells,
        onTextSearch,
        filteredRows,
        modalState,
        handleClose,
        inventoryGetError,
        inventoryGetStatus,
    };
};

export default useStockMovement;
