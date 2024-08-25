import { Edit, EmailOutlined, PhoneOutlined } from "@mui/icons-material";
import { Avatar, Tooltip } from "@mui/material";

import ActionDialog, {
    ActionDialogActions,
    ActionDialogBody,
    ActionDialogTitle,
} from "@/components/action-dialog";
import { AppButton, AppInput, AppLoaderButton } from "@/components/form";

import { useOverview } from "../hooks/useOverview";

const OverviewForm = () => {
    const {
        user,
        handleClose,
        handleOpen,
        editUserData,
        formSchema,
        isModalOpen,
    } = useOverview();
    return (
        <>
            <div className="mt-4 flex flex-col justify-center gap-2">
                <span className="flex flex-row items-center justify-start gap-2">
                    <Avatar>
                        <EmailOutlined />
                    </Avatar>
                    <span className="flex flex-col gap-1 p:flex-row">
                        Email:{" "}
                        <span className="text-primary-800 dark:text-primary-300">
                            {user?.email}
                        </span>
                    </span>
                </span>
                <span className="flex flex-row items-center justify-start gap-2">
                    <Avatar>
                        <PhoneOutlined />
                    </Avatar>
                    <span className="flex flex-col gap-1 p:flex-row">
                        Phone:{" "}
                        <span className="text-primary-800 dark:text-primary-300">
                            {user?.phone_number}
                        </span>{" "}
                    </span>
                    {/* <Tooltip title="Edit">
                        <span>
                            <AppButton
                                variant="icon"
                                size="small"
                                onClick={handleOpen}>
                                <Edit fontSize="small" />
                            </AppButton>
                        </span>
                    </Tooltip> */}
                </span>
            </div>
            <ActionDialog open={isModalOpen} onClose={handleClose}>
                <ActionDialogTitle classes={{ root: "px-2" }}>
                    User Details
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
                        Save
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
    );
};

export default OverviewForm;
