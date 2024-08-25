import { useMemo } from "react";
import { getEmployee } from "@/services/api/employee-ep";
import { useQuery } from "react-query";

import { EmployeeData, EmployeeStatus } from "@/models/responses/employee-data";
import { AwaitedReturnType } from "@/models/utility-types";
import { QueryConst } from "@/constants/query-constants";
import { HeaderData } from "@/components/tables/responsive-table";
import { getLeave } from "@/services/api/attendance-ep";
import { LeaveData } from "@/models/responses/leave-data";
import useConfirm from "@/hooks/useConfirm";
import appToast from "@/components/app-toast";
import { RowEventType } from "../components/table-bodyrow";

const useLeaveTracking = () => {
    const confirm = useConfirm();
    const { data, error, status } = useQuery<
        AwaitedReturnType<typeof getLeave>,
        Error
    >([QueryConst.getLeave], getLeave);
    const headCells: HeaderData<LeaveData>[] = [
        {
            id: "id",
            isSortable: false,
            disablePadding: true,
            label: "S. No",
            align: "left",
        },
        {
            id: "empId",
            isSortable: false,
            disablePadding: true,
            label: "Emp Id",
            align: "left",
        },
        {
            id: "name",
            isSortable: true,
            disablePadding: true,
            label: "Name",
            align: "left",
        },
        {
            id: "department",
            isSortable: false,
            disablePadding: false,
            label: "Department",
            align: "left",
        },
        {
            id: "leaveType",
            isSortable: false,
            disablePadding: false,
            label: "Leave Type",
            align: "left",
        },
        {
            id: "duration",
            isSortable: false,
            disablePadding: false,
            label: "Leave Duration",
            align: "center",
        },
        {
            id: "status",
            isSortable: false,
            disablePadding: false,
            label: "Status",
            align: "center",
        },
        {
            id: "approver",
            isSortable: false,
            disablePadding: false,
            label: "Approver",
            align: "left",
        },
        {
            id: "reasonForLeave",
            isSortable: false,
            disablePadding: false,
            label: "Reason",
            align: "left",
        },
        {
            id: "leaveBalance",
            isSortable: false,
            disablePadding: true,
            label: "Balance",
            align: "left",
        },
        {
            id: "actions",
            isSortable: false,
            disablePadding: true,
            label: "Actions",
            align: "right",
        }
    ];

    const onRowEvent = (id: string, eventType: RowEventType) => {
        switch (eventType) {
            case "approve": {
                confirm({
                    content: "You want to approve this leave?",
                })
                    .then(() => {
                        appToast.success("Leave Approved!");
                    });
                break;
            }
            case "reject": {
                confirm({
                    content: "You want to reject this leave?",
                })
                    .then(() => {
                        appToast.success("Leave Rejected!");
                    });
                break;
            }
            default:
                break;
        }
    };

    return { rows: data, error, status, headCells, onRowEvent };
};

export default useLeaveTracking;
