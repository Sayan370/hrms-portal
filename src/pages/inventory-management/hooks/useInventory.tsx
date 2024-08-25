import { useMemo, useState } from "react";
import { setAttendance } from "@/services/api/attendance-ep";
import { getStockHistoryInventory } from "@/services/api/inventory-ep";
import { useMutation, useQuery } from "react-query";

import { AttendanceDailyFormData } from "@/models/responses/attendance-data";
import {
    StockHistoryCategory,
    StockHistoryData,
} from "@/models/responses/inventory-data";
import { CommonRowEventType } from "@/models/types";
import { AwaitedReturnType } from "@/models/utility-types";
import { QueryConst } from "@/constants/query-constants";
import { getFormattedDate } from "@/utils/date-utils";
import { separateWords } from "@/utils/object-utils";
import appToast from "@/components/app-toast";
import { HeaderData } from "@/components/tables/responsive-table";

type SegmentType = "stock" | "requisition";

const useInventory = () => {
    const [modalState, setModalState] = useState<boolean>(false);
    const [editData, setEditData] = useState<StockHistoryData | undefined>();
    const [searchText, setSearchText] = useState("");
    const [tab, setTab] = useState<SegmentType>("stock");
    const {
        data: inventoryData,
        error: inventoryGetError,
        status: inventoryGetStatus,
    } = useQuery<AwaitedReturnType<typeof getStockHistoryInventory>, Error>(
        [QueryConst.getStockHistoryList],
        getStockHistoryInventory
    );
    const {
        data: mutData,
        error: mutError,
        status: mutStatus,
        mutateAsync,
    } = useMutation<
        AwaitedReturnType<typeof setAttendance>,
        Error,
        AttendanceDailyFormData
    >([QueryConst.getAttendance], setAttendance);

    const handleTabChange = (selected: number) => {
        if (selected === 0) {
            setTab("requisition");
        }
        if (selected === 1) {
            setTab("stock");
        }
    };

    const headCells: HeaderData<StockHistoryData>[] = [
        {
            id: "id",
            isSortable: false,
            disablePadding: true,
            label: "S. No",
            align: "left",
        },
        {
            id: "category",
            isSortable: false,
            disablePadding: true,
            label: "Item Category",
            align: "left",
        },
        {
            id: "name",
            isSortable: false,
            disablePadding: true,
            label: "Item Name",
            align: "left",
        },
        {
            id: "qty",
            isSortable: false,
            disablePadding: true,
            label: "Quantity in Stock",
            align: "right",
        },
        {
            id: "unit",
            isSortable: false,
            disablePadding: true,
            label: "Unit of Measurement",
            align: "left",
        },
        {
            id: "rateOfUnit",
            isSortable: false,
            disablePadding: true,
            label: "Rate per unit",
            align: "right",
        },
        {
            id: "amount",
            isSortable: false,
            disablePadding: true,
            label: "Amount (₹)",
            align: "right",
        },
        {
            id: "sellerName",
            isSortable: false,
            disablePadding: true,
            label: "Seller Name",
            align: "left",
        },
        {
            id: "dateOfPurchase",
            isSortable: false,
            disablePadding: true,
            label: "Date of Purchase",
            align: "left",
        },
        {
            id: "dateOfRecieving",
            isSortable: false,
            disablePadding: true,
            label: "Date of Receiving",
            align: "left",
        },
        {
            id: "qtyOfRecieving",
            isSortable: false,
            disablePadding: true,
            label: "Qty of Receiving",
            align: "right",
        },
        {
            id: "dateOfRequisition",
            isSortable: false,
            disablePadding: true,
            label: "Date of Requisition",
            align: "left",
        },
        {
            id: "qtyOfRequisition",
            isSortable: false,
            disablePadding: true,
            label: "Qty of Requisition",
            align: "right",
        },
        {
            id: "requesterName",
            isSortable: false,
            disablePadding: true,
            label: "Requester Name",
            align: "left",
        },
    ];
    const onTextSearch = (text?: string) => {
        setSearchText(text || "");
    };
    const getFilterString = (data: StockHistoryData) =>
        `${data.name}|${data.unit}|${data.rateOfUnit}|${
            data.qty
        }|${separateWords(StockHistoryCategory[data.category])}|${
            data.sellerName
        }|${data.requesterName}|${data.rateOfUnit}|${getFormattedDate(
            data.dateOfPurchase,
            "DD/MM/YYYY hh:mm:ssA"
        )}|${getFormattedDate(
            data.dateOfRecieving,
            "DD/MM/YYYY hh:mm:ssA"
        )}|${getFormattedDate(data.dateOfRequisition, "DD/MM/YYYY hh:mm:ssA")}`;
    const filteredRows = useMemo(
        () =>
            inventoryData?.filter((item) =>
                getFilterString(item)
                    .trim()
                    .toLowerCase()
                    .includes(searchText.toLowerCase())
            ),
        [inventoryData, searchText]
    );
    const onRowAction = (id: string, eventType: CommonRowEventType) => {
        switch (eventType) {
            case "edit": {
                const data = inventoryData?.find((r) => r.id === id);
                setModalState(true);
                setEditData(data);
                break;
            }
            default:
                break;
        }
    };
    const handleClose = () => {
        setEditData(undefined);
        setModalState(false);
    };
    const handleSubmit = (data: AttendanceDailyFormData) => {
        mutateAsync(data).then((message) => {
            appToast.success(message);
            handleClose();
        });
    };
    return {
        inventoryData,
        handleTabChange,
        headCells,
        onTextSearch,
        filteredRows,
        onRowAction,
        editData,
        modalState,
        handleClose,
        handleSubmit,
        mutStatus,
        inventoryGetError,
        inventoryGetStatus,
    };
};

export default useInventory;
