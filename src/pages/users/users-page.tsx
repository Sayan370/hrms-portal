import { AddOutlined, Search } from "@mui/icons-material";
import { Alert, AlertTitle } from "@mui/material";

import { UserRole } from "@/models/responses/user-role-data";
import {
    handleAutcompleteChange,
    handleAutcompleteMultiChange,
} from "@/utils/func-utills";
import PageWithHeaderFooter, {
    PWHFHeaderActions,
} from "@/layouts/page-with-header-footer";
import ActionDialog, {
    ActionDialogActions,
    ActionDialogBody,
    ActionDialogTitle,
} from "@/components/action-dialog";
import appToast from "@/components/app-toast";
import CopyToClipboard from "@/components/copy-to-clipboard";
import FailedMessage from "@/components/failed-message";
import {
    AppButton,
    AppInput,
    AppLoaderButton,
    AppSelect,
} from "@/components/form";
import { AutocompleteXSmallListItem } from "@/components/form/inputElements/app-autocomplete";
import { Loading } from "@/components/loading";
import { ResponsiveTable, ServerPaginatedTable } from "@/components/tables";
import TableToolbar from "@/components/tables/components/default-toolbar";

import TableBodyRowItem from "./components/table-bodyrow";
import { useUsers } from "./hooks/useUsers";

const UsersPage = () => {
    const {
        rows,
        filteredUsers,
        usersError,
        page,
        MAX_ROWS_PER_PAGE,
        isModalOpen,
        editUserData,
        handlePageChange,
        handleTableRowClick,
        handleClose,
        headCells,
        userLoadState,
        formSchema,
        editDisabled,
        user,
        addUser,
        selectedUserId,
        handleGeneratePassword,
        onTextSearch,
        onIconClick,
    } = useUsers();
    return (
        <PageWithHeaderFooter>
            {/* <PWHFHeaderActions className="gap-2 items-center">
                <AppButton
                    className="w-44"
                    variant="contained"
                    buttonProps={{ startIcon: <AddOutlined /> }}
                    onClick={addUser}>
                    New User
                </AppButton>
            </PWHFHeaderActions> */}
            {userLoadState === "loading" && <Loading grow />}
            {userLoadState === "error" && (
                <FailedMessage text={usersError?.message} grow size="large" />
            )}
            {userLoadState === "success" && (
                <>
                    <div className="mx-auto w-full ld:w-3/4">
                        <ResponsiveTable
                            primaryKey="email"
                            data={{
                                values: filteredUsers ?? [],
                                headerData: headCells,
                            }}
                            components={{
                                BodyComponent: TableBodyRowItem,
                                Toolbar: TableToolbar,
                            }}
                            showToolBar
                            // page={page}
                            // onPageChange={handlePageChange}
                            // totalRows={rows?.totalnumber}
                            // rowCount={MAX_ROWS_PER_PAGE}
                            innerProps={{
                                bodyProps: {
                                    onRowEvent: handleTableRowClick,
                                    editDisabled,
                                    loggedInUserEmail: user?.email,
                                },
                                toolBarProps: {
                                    onIconClick,
                                    onTextSearch,
                                },
                            }}
                        />
                    </div>
                    <ActionDialog open={isModalOpen} onClose={handleClose}>
                        <ActionDialogTitle classes={{ root: "px-2" }}>
                            {selectedUserId ? "Edit" : "Add"} User
                        </ActionDialogTitle>
                        <ActionDialogBody>
                            <form
                                className="mt-2"
                                id="user-edit"
                                onSubmit={editUserData?.handleSubmit}
                                onReset={editUserData?.handleReset}>
                                <div className="flex gap-3">
                                    <AppInput
                                        {...formSchema?.firstName}
                                        onChange={editUserData?.handleChange}
                                    />
                                    <AppInput
                                        {...formSchema?.lastName}
                                        onChange={editUserData?.handleChange}
                                    />
                                </div>
                                <div className="mt-3 flex gap-3">
                                    <AppInput
                                        {...formSchema?.email}
                                        onChange={editUserData?.handleChange}
                                    />
                                    <AppInput
                                        {...formSchema?.phone}
                                        onChange={editUserData?.handleChange}
                                    />
                                </div>
                                <AppSelect
                                    className="mt-3"
                                    {...formSchema?.role}
                                    onChange={(evt) => {
                                        editUserData?.setValues(
                                            (values) => ({
                                                ...values,
                                                buildingCode: null,
                                                customerId: null,
                                            }),
                                            false
                                        );
                                        editUserData?.handleChange(evt);
                                    }}
                                />
                                {!selectedUserId && (
                                    <div className="mt-3 flex flex-col gap-2">
                                        <AppInput
                                            {...formSchema?.password}
                                            inputProps={{
                                                InputProps: {
                                                    endAdornment: editUserData
                                                        .values.password ? (
                                                        <CopyToClipboard
                                                            copy={
                                                                editUserData
                                                                    .values
                                                                    .password
                                                            }
                                                        />
                                                    ) : undefined,
                                                    startAdornment: (
                                                        <AppButton
                                                            className="!mr-2 !px-3"
                                                            variant="text"
                                                            size="small"
                                                            onClick={
                                                                handleGeneratePassword
                                                            }>
                                                            {editUserData.values
                                                                .password
                                                                ? "Regenerate"
                                                                : "Generate"}
                                                        </AppButton>
                                                    ),
                                                },
                                            }}
                                        />
                                        {/* <AppButton variant="text" size="small" onClick={handleGeneratePassword}>
                                            {editUserData.values.password ? "Regenerate" : "Generate"} Password
                                        </AppButton> */}
                                        {editUserData.values.password && (
                                            <Alert
                                                variant="outlined"
                                                severity="warning">
                                                <AlertTitle>Warning</AlertTitle>
                                                After user creation the password
                                                can not be copied. <br /> Please
                                                copy the password and send it to
                                                the concerned user
                                            </Alert>
                                        )}
                                    </div>
                                )}
                            </form>
                        </ActionDialogBody>
                        <ActionDialogActions classes={{ root: "px-2" }}>
                            <AppLoaderButton
                                isLoading={editUserData?.isSubmitting}
                                shouldBeDisabledWhileLoading
                                type="submit"
                                className="!mr-2"
                                variant="contained"
                                form="user-edit">
                                {selectedUserId ? "Save" : "Submit"}
                            </AppLoaderButton>
                            <AppButton
                                type="reset"
                                color="error"
                                variant="outlined"
                                form="user-edit">
                                Reset
                            </AppButton>
                        </ActionDialogActions>
                    </ActionDialog>
                </>
            )}
        </PageWithHeaderFooter>
    );
};

export default UsersPage;
