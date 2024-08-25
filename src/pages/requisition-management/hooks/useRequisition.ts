import { useMemo } from "react";
import { getEmployee } from "@/services/api/employee-ep";
import { useQuery } from "react-query";

import { EmployeeData, EmployeeStatus } from "@/models/responses/employee-data";
import { AwaitedReturnType } from "@/models/utility-types";
import { QueryConst } from "@/constants/query-constants";
import { HeaderData } from "@/components/tables/responsive-table";
import { getRequisitionList } from "@/services/api/inventory-ep";
import { RequisitionData } from "@/models/responses/inventory-data";

const useRequisition = () => {
    const { data, error, status } = useQuery<
        AwaitedReturnType<typeof getRequisitionList>,
        Error
    >([QueryConst.getRequisitionList], getRequisitionList);
    const headCells: HeaderData<RequisitionData>[] = [
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
            id: "dateOfRequisition",
            isSortable: false,
            disablePadding: true,
            label: "Requisition Date",
            align: "left",
        },
        {
            id: "id",
            isSortable: false,
            disablePadding: true,
            label: "Requisition No.",
            align: "left",
        },
        {
            id: "dateOfRecieving",
            isSortable: false,
            disablePadding: true,
            label: "Delivered Date",
            align: "left",
        },
        {
            id: "qty",
            isSortable: false,
            disablePadding: true,
            label: "Qty",
            align: "right",
        },
        {
            id: "unit",
            isSortable: false,
            disablePadding: true,
            label: "UoM",
            align: "left",
        },
        // {
        //     id: "rateOfUnit",
        //     isSortable: false,
        //     disablePadding: true,
        //     label: "Rate",
        //     align: "right",
        // },
        // {
        //     id: "amount",
        //     isSortable: false,
        //     disablePadding: true,
        //     label: "Amount (₹)",
        //     align: "right",
        // },
        {
            id: "requesterName",
            isSortable: false,
            disablePadding: true,
            label: "Requester",
            align: "center",
        },
        {
            id: "authorizerL1",
            isSortable: false,
            disablePadding: true,
            label: "Authorizer L1",
            align: "right",
        },
        {
            id: "authorizerL2",
            isSortable: false,
            disablePadding: true,
            label: "Authorizer L2",
            align: "right",
        },
    ];

    return { rows: data, error, status, headCells };
};

export default useRequisition;
