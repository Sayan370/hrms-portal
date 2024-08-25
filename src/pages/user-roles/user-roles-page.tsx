import PageWithHeaderFooter from "@/layouts/page-with-header-footer";
import ActionSidebar, {
    ActionSidebarActions,
    ActionSidebarBody,
    ActionSidebarTitle,
} from "@/components/action-sidebar";
import appToast from "@/components/app-toast";
import FailedMessage from "@/components/failed-message";
import { AppButton, AppSwitch } from "@/components/form";
import { Loading } from "@/components/loading";
import Scrollable from "@/components/scrollable";
import { ResponsiveTable } from "@/components/tables";

import TableBodyRowItem from "./components/table-bodyrow";
import { useUserRoles } from "./hooks/useUserRoles";

const UserRolesPage = () => {
    const {
        rows,
        headCells,
        isDrawerOpen,
        roleLoadState,
        rolesError,
        editDisabled,
        deleteDisabled,
        allRoleLoadState,
        allRoles,
        allRolesError,
        selectedRole,
        handleSidebarClose,
        handleTableRowClick,
    } = useUserRoles();
    return (
        <PageWithHeaderFooter>
            {roleLoadState === "loading" && <Loading grow />}
            {roleLoadState === "error" && (
                <FailedMessage text={rolesError?.message} grow size="large" />
            )}
            {roleLoadState === "success" && (
                <>
                    <div className="mx-auto w-full d:w-1/2">
                        <ResponsiveTable
                            primaryKey="id"
                            data={{ values: rows ?? [], headerData: headCells }}
                            components={{ BodyComponent: TableBodyRowItem }}
                            innerProps={{
                                bodyProps: {
                                    onRowEvent: handleTableRowClick,
                                    editDisabled,
                                    deleteDisabled,
                                },
                            }}
                        />
                    </div>
                    <ActionSidebar
                        open={isDrawerOpen}
                        onClose={handleSidebarClose}>
                        <ActionSidebarTitle>
                            Assigned Permissions
                        </ActionSidebarTitle>
                        <ActionSidebarBody>
                            <h3 className="my-2">Description</h3>
                            <p className="mt-1">{selectedRole?.description}</p>

                            <h4 className="my-2">
                                {selectedRole?.scopes?.length} Permissions
                            </h4>
                            {allRoleLoadState === "loading" && <Loading grow />}
                            {allRoleLoadState === "error" && (
                                <FailedMessage
                                    text={allRolesError?.message}
                                    grow
                                    size="large"
                                />
                            )}
                            {allRoleLoadState === "success" && (
                                <Scrollable className="mb-1">
                                    <div className="flex grow flex-col">
                                        {allRoles?.map((scope) => (
                                            <div
                                                className="flex justify-between"
                                                key={scope}>
                                                {scope}
                                                <AppSwitch
                                                    value={selectedRole?.scopes.includes(
                                                        scope
                                                    )}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </Scrollable>
                            )}
                        </ActionSidebarBody>
                        <ActionSidebarActions>
                            <AppButton
                                onClick={() => {
                                    appToast.success("Changes has been saved!");
                                    handleSidebarClose();
                                }}
                                className="!mr-2"
                                variant="contained">
                                Save
                            </AppButton>
                            <AppButton
                                variant="outlined"
                                color="error"
                                onClick={handleSidebarClose}>
                                Cancel
                            </AppButton>
                        </ActionSidebarActions>
                    </ActionSidebar>
                </>
            )}
        </PageWithHeaderFooter>
    );
};

export default UserRolesPage;
