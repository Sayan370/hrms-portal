import React, { PropsWithChildren } from "react";

import { OnCloseType } from "@/models/func-types";
import { AlertEventType } from "@/models/types";

import ActionDialog, {
    ActionDialogActions,
    ActionDialogBody,
    ActionDialogTitle,
} from "../action-dialog";
import { AppButton } from "../form";

interface AlertDialogProps {
    title?: string;
    open?: boolean;
    onClose?: OnCloseType;
    onClick?: (event: AlertEventType) => void;
    confirmationText?: string;
    cancellationText?: string;
    buttonOrder?: [AlertEventType, AlertEventType];
    hideCancelButton?: boolean;
    hideCloseButton?: boolean;
    style?: React.CSSProperties;
}

const AlertDialog = (props: PropsWithChildren<AlertDialogProps>) => {
    const {
        title,
        onClick,
        children,
        confirmationText = "Yes",
        cancellationText = "No",
        buttonOrder = ["confirm", "cancel"],
        hideCancelButton = false,
        hideCloseButton = false,
        ...rest
    } = props;
    const handleClick = (event: AlertEventType) => () =>
        onClick?.call(this, event);
    return (
        <ActionDialog {...rest}>
            <ActionDialogTitle hideCloseButton={hideCloseButton}>
                {title || "Confirmation"}
            </ActionDialogTitle>
            <ActionDialogBody>
                {children || "You want to delete the selected item?"}
            </ActionDialogBody>
            <ActionDialogActions classes={{ root: "gap-2" }}>
                {buttonOrder.map((type) => {
                    if (type === "cancel") {
                        return (
                            !hideCancelButton && (
                                <AppButton
                                    variant="contained"
                                    onClick={handleClick("cancel")}
                                    key={type}>
                                    {cancellationText}
                                </AppButton>
                            )
                        );
                    }
                    if (type === "confirm") {
                        return (
                            <AppButton
                                onClick={handleClick("confirm")}
                                variant="text"
                                key={type}>
                                {confirmationText}
                            </AppButton>
                        );
                    }
                    return null;
                })}
            </ActionDialogActions>
        </ActionDialog>
    );
};

export default AlertDialog;
