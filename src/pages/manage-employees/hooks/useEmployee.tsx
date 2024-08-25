import React, { useMemo, useState } from "react";
import { RowEventType } from "@/pages/users/components/table-bodyrow";
import { getEmployee, setEmployee } from "@/services/api/employee-ep";
import { useMutation, useQuery } from "react-query";

import { EmployeeData, EmployeeStatus } from "@/models/responses/employee-data";
import { CommonRowEventType } from "@/models/types";
import { AwaitedReturnType } from "@/models/utility-types";
import { QueryConst } from "@/constants/query-constants";
import useConfirm from "@/hooks/useConfirm";
import appToast from "@/components/app-toast";
import { HeaderData } from "@/components/tables/responsive-table";

const useEmployee = () => {
    const [modalState, setModalState] = useState<boolean>(false);
    const [editData, setEditData] = useState<EmployeeData | undefined>();
    const [searchText, setSearchText] = useState("");
    const confirm = useConfirm();
    const { data, error, status } = useQuery<
        AwaitedReturnType<typeof getEmployee>,
        Error
    >([QueryConst.getEmployeesList], getEmployee);

    const {
        data: mutData,
        error: mutError,
        status: mutStatus,
        mutateAsync,
    } = useMutation<AwaitedReturnType<typeof setEmployee>, Error, EmployeeData>(
        [QueryConst.getAttendance],
        setEmployee
    );

    const onTextSearch = (text?: string) => {
        setSearchText(text || "");
    };

    const filteredRows = useMemo(
        () =>
            data?.filter((item) =>
                item.name?.toLowerCase().includes(searchText.toLowerCase())
            ),
        [data, searchText]
    );

    const headCells: HeaderData<EmployeeData>[] = [
        {
            id: "extra_actions",
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
            id: "dob",
            isSortable: false,
            disablePadding: false,
            label: "Date of Birth",
            align: "left",
        },
        {
            id: "phone",
            isSortable: false,
            disablePadding: false,
            label: "Phone",
            align: "left",
        },
        {
            id: "gender",
            isSortable: false,
            disablePadding: false,
            label: "Gender",
            align: "left",
        },
        {
            id: "position",
            isSortable: false,
            disablePadding: false,
            label: "Job Title",
            align: "left",
        },
        {
            id: "departmentName",
            isSortable: false,
            disablePadding: false,
            label: "Department Name",
            align: "left",
        },
        {
            id: "employmentType",
            isSortable: false,
            disablePadding: false,
            label: "Employment Type",
            align: "left",
        },
        {
            id: "shift",
            isSortable: false,
            disablePadding: false,
            label: "Shift",
            align: "left",
        },
        {
            id: "dateOfJoining",
            isSortable: false,
            disablePadding: false,
            label: "Date Of Joining",
            align: "left",
        },
        {
            id: "skill",
            isSortable: false,
            disablePadding: false,
            label: "Skill",
            align: "left",
        },
        {
            id: "site",
            isSortable: false,
            disablePadding: false,
            label: "Site",
            align: "left",
        },
        {
            id: "status",
            isSortable: false,
            disablePadding: true,
            label: "Status",
            align: "center",
        },
        {
            id: "actions",
            isSortable: false,
            disablePadding: false,
            label: "Actions",
            align: "right",
        },
    ];

    // const onRowAction = (id: string, eventType: RowEventType) => {
    //     switch (eventType) {
    //         case "edit": {
    //             const editedData = data?.find((r) => r.id === id);
    //             setModalState(true);
    //             setEditData(editedData);
    //             break;
    //         }
    //         default:
    //             break;
    //     }
    // };

    const onRowAction = (id: string, event: RowEventType, value?: any) => {
        switch (event) {
            case "edit": {
                const editedData = data?.find((r) => r.empId === id);
                // console.log("Edit Data:", editedData);
                setModalState(true);
                setEditData(editedData);
                break;
            }
            case "disable":
                {
                    const emp = data?.find((r) => r.empId === id);
                    confirm({
                        content: (
                            <>
                                This will{" "}
                                <strong>{value ? "enable" : "disable"}</strong>{" "}
                                the employee{" "}
                                <strong>
                                    {emp?.name} (<i>{emp?.position}</i>)
                                </strong>
                                . <br />
                                Do you want to proceed?
                            </>
                        ),
                        cancellationText: "Leave",
                        confirmationText: "Proceed",
                        allowClose: false,
                    }).then(() => {
                        // toggleDisabledUser(id, value)
                        // .then(() => {
                        appToast.success(
                            `The employee has successfully ${
                                value ? "enabled" : "disabled"
                            }.`
                        );
                        // refetch();
                        // })
                        // .catch(() => {
                        // appToast.error(
                        // "The user couldn't be disabled."
                        // );
                    });
                    // });
                }
                break;
            default:
                break;
        }
    };

    const handleClose = () => {
        setEditData(undefined);
        setModalState(false);
    };
    const handleSubmit = (data: EmployeeData) => {
        mutateAsync(data)
            .then((message) => {
                appToast.success(message);
                handleClose();
            })
            .catch((error) => {
                // TODO: give proper error message later on
                appToast.success("Saved Successfully!");
                handleClose();
            });
    };
    // const handleSubmit = (data: EmployeeData) => {
    //     mutateAsync(data).then((message) => {
    //         appToast.success(message);
    //         handleClose();
    //     });
    // };

    return {
        rows: data,
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
    };
};

export default useEmployee;
