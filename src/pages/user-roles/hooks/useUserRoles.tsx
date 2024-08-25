import { useCallback, useMemo, useState } from "react";
import { getAllRoles, getUserRoles } from "@/services/api/user-ep";
import { useQuery } from "react-query";

import { UserRoleData } from "@/models/responses/user-role-data";
import { AlertEventType, CommonRowEventType } from "@/models/types";
import { AwaitedReturnType } from "@/models/utility-types";
import logger from "@/utils/log-utils";
import useConfirm from "@/hooks/useConfirm";
import useUserScope from "@/hooks/useUserScope";
import { HeaderData } from "@/components/tables/responsive-table";

export const useUserRoles = () => {
    const [isDrawerOpen, setDrawerState] = useState(false);
    const confirm = useConfirm();
    const { disabled: editDisabled } = useUserScope("users.role.edit");
    const { disabled: deleteDisabled } = useUserScope("users.role.delete");

    const [selectedRoleId, setSelectedRoleId] = useState<number | null>(null);
    const {
        data: rows,
        status: roleLoadState,
        error: rolesError,
    } = useQuery<AwaitedReturnType<typeof getUserRoles>, Error>(
        ["users/roles"],
        getUserRoles
    );
    const {
        data: allRoles,
        status: allRoleLoadState,
        error: allRolesError,
    } = useQuery<AwaitedReturnType<typeof getAllRoles>, Error>(
        ["user/allroles"],
        getAllRoles
    );

    const headCells: HeaderData<UserRoleData>[] = [
        {
            id: "name",
            isSortable: true,
            disablePadding: true,
            label: "Role",
            align: "left",
        },
        {
            id: "description",
            isSortable: true,
            disablePadding: false,
            label: "Description",
            align: "left",
        },
        {
            id: "scopes",
            isSortable: true,
            disablePadding: true,
            label: "Permissions",
            align: "center",
        },
        {
            id: "actions",
            isSortable: false,
            disablePadding: true,
            label: "Actions",
            align: "right",
        },
    ];

    const selectedRole = useMemo(
        () => rows?.find((r) => r.id === selectedRoleId),
        [selectedRoleId]
    );

    const handleTableRowClick = (id: number, event: CommonRowEventType) => {
        switch (event) {
            case "edit":
                setDrawerState(true);
                setSelectedRoleId(id);
                break;
            case "delete":
                {
                    setSelectedRoleId(id);
                    const selectedRoleName = rows?.find(
                        (r) => r.id === id
                    )?.name;
                    confirm({
                        content: (
                            <>
                                You want to delete the role
                                <strong>{selectedRoleName}</strong> ?
                            </>
                        ),
                        // allowClose: false
                    })
                        .then(() => {
                            setSelectedRoleId(null);
                            logger.log("Confirmed");
                        })
                        .catch(() => {
                            setSelectedRoleId(null);
                            logger.log("Cancelled");
                        });
                }
                break;
            default:
                break;
        }
    };

    const handleSidebarClose = () => setDrawerState(false);

    return {
        rows,
        editDisabled,
        deleteDisabled,
        roleLoadState,
        allRoleLoadState,
        allRolesError,
        allRoles,
        headCells,
        handleTableRowClick,
        isDrawerOpen,
        rolesError,
        handleSidebarClose,
        selectedRole,
    };
};
