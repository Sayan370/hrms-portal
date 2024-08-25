import { useMemo, useState } from "react";
import { getEmployee } from "@/services/api/employee-ep";
import { useQuery } from "react-query";
import { AwaitedReturnType } from "@/models/utility-types";
import { QueryConst } from "@/constants/query-constants";
import { HeaderData } from "@/components/tables/responsive-table";
import { getSalary } from "@/services/api/salary-ep";
import { SalaryData } from "@/models/responses/salary-data";
import { CommonRowEventType } from "@/models/types";

const useManageSalary = () => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const { data, error, status } = useQuery<
        AwaitedReturnType<typeof getSalary>,
        Error
    >([QueryConst.getSalary], getSalary);
    const headCells: HeaderData<SalaryData>[] = [
        {
            id: "extra_actions",
            isSortable: false,
            disablePadding: true,
            label: "",
            align: "left",
        },
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
            id: "payDate",
            isSortable: true,
            disablePadding: true,
            label: "Pay Date",
            align: "left",
        },
        {
            id: "payPeriod",
            isSortable: true,
            disablePadding: true,
            label: "Salary for the Period",
            align: "center",
        },
        {
            id: "pfNo",
            isSortable: true,
            disablePadding: true,
            label: "PF Details",
            align: "left",
        },
        {
            id: "salaryDetails",
            isSortable: true,
            disablePadding: true,
            label: "Amount (₹)",
            align: "right",
        },
        // {
        //     id: "dob",
        //     isSortable: false,
        //     disablePadding: false,
        //     label: "Date of Birth",
        //     align: "left",
        // },
        // {
        //     id: "phone",
        //     isSortable: false,
        //     disablePadding: false,
        //     label: "Phone",
        //     align: "left",
        // },
        // {
        //     id: "gender",
        //     isSortable: false,
        //     disablePadding: false,
        //     label: "Gender",
        //     align: "left",
        // },
        // {
        //     id: "position",
        //     isSortable: false,
        //     disablePadding: false,
        //     label: "Position",
        //     align: "left",
        // },
        // {
        //     id: "skill",
        //     isSortable: false,
        //     disablePadding: false,
        //     label: "Skill",
        //     align: "left",
        // },
        // {
        //     id: "site",
        //     isSortable: false,
        //     disablePadding: false,
        //     label: "Site",
        //     align: "left",
        // },
        {
            id: "actions",
            isSortable: false,
            disablePadding: true,
            label: "Actions",
            align: "right",
        }
    ];

    const onRowAction = (id: string, eventType: CommonRowEventType) => {
        switch (eventType) {
            case "view": {
                setPreviewUrl("/pdf/test-payslip.pdf");
                break;
            }
            default:
                break;
        }
    };
    const onPreviewClose = () => {
        setPreviewUrl(null);
    }

    return { rows: data, error, status, headCells, previewUrl, onPreviewClose, onRowAction };
};

export default useManageSalary;
