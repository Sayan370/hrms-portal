import React, {
    createContext,
    Dispatch,
    FC,
    PropsWithChildren,
    ReactNode,
    SetStateAction,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { Typography } from "@mui/material";
import {
    FormikComputedProps,
    FormikConfig,
    FormikValues,
    useFormik,
} from "formik";

import { AlertEventType, ColorMode } from "@/models/types";
import AlertDialog from "@/components/alert-dialog";

export interface ConfirmationState {
    confirm: (options?: ConfirmationProviderProps) => Promise<unknown>;
}

export const ConfirmationContext = createContext<ConfirmationState | null>(
    null
);
ConfirmationContext.displayName = "ConfirmationContext";

export function useConfirmationContext() {
    const context = useContext(ConfirmationContext);
    if (!context)
        throw new Error(
            "ConfirmationContext must be used with ConfirmationProvider!"
        );
    return context;
}

interface ConfirmationProviderProps<
    Values extends FormikValues = FormikValues
> {
    title?: string;
    description?: string;
    content?:
        | React.ReactNode
        | null
        | ((form: ReturnType<typeof useFormik<Values>>) => React.ReactNode);
    confirmationText?: string;
    cancellationText?: string;
    allowClose?: boolean;
    hideCancelButton?: boolean;
    resetFormOnCompletetion?: boolean;
    buttonOrder?: [AlertEventType, AlertEventType];
    initialValues?: Values;
    validationSchema?: FormikConfig<Values>["validationSchema"];
}

type ConfirmActionFunc<T> = (value?: T) => void;
type RejectActionFunc = (reason?: any) => void;

export const ConfirmationProvider = <
    Values extends FormikValues = FormikValues
>(
    props: PropsWithChildren<ConfirmationProviderProps<Values>>
) => {
    const { children, ...restProps } = props;
    const [options, setOptions] = useState<ConfirmationProviderProps>({});
    const [resolveReject, setResolveReject] = useState<
        [ConfirmActionFunc<Values>?, RejectActionFunc?]
    >([]);
    const [resolve, reject] = resolveReject;

    const confirm = useCallback((options: ConfirmationProviderProps = {}) => {
        return new Promise((resolve, reject) => {
            setOptions(options);
            setResolveReject([resolve, reject]);
        });
    }, []);

    const {
        title = "Confirmation",
        description = "",
        content = null,
        confirmationText = "Ok",
        cancellationText = "Cancel",
        allowClose = true,
        hideCancelButton = false,
        resetFormOnCompletetion = false,
        buttonOrder,
        initialValues,
        validationSchema,
    } = useMemo(() => ({ ...restProps, ...options }), [options]);

    const form = useFormik<Values>({
        initialValues: (initialValues || {}) as Values,
        validationSchema,
        validateOnMount: true,
        enableReinitialize: true,
        onSubmit: () => {},
    });

    const handleClose = useCallback(() => {
        setResolveReject([]);
        if (resetFormOnCompletetion) {
            // form.resetForm();
            form.setValues((state) => ({ ...state, ...initialValues }));
        }
    }, [resetFormOnCompletetion]);

    const handleClick = useCallback(
        (event: AlertEventType) => {
            switch (event) {
                case "confirm":
                    if (resolve) {
                        if (initialValues) {
                            if (form.isValid) {
                                resolve(form.values);
                                handleClose();
                            }
                        } else {
                            resolve();
                            handleClose();
                        }
                    }
                    break;
                case "cancel":
                    if (reject) {
                        reject();
                        handleClose();
                    }
                    break;
                default:
                    break;
            }
        },
        [
            resolve,
            reject,
            handleClose,
            form.values,
            form.isValid,
            initialValues,
            resetFormOnCompletetion,
        ]
    );

    const value = useMemo(() => ({ confirm }), [confirm, options]);
    return (
        <>
            <ConfirmationContext.Provider value={value}>
                {children}
            </ConfirmationContext.Provider>
            <AlertDialog
                buttonOrder={buttonOrder}
                title={title}
                cancellationText={cancellationText}
                confirmationText={confirmationText}
                open={resolveReject.length === 2}
                onClose={allowClose ? handleClose : undefined}
                onClick={handleClick}
                style={{ zIndex: 9999 }}
                hideCancelButton={hideCancelButton}
                hideCloseButton={!allowClose}>
                {typeof content === "function" ? content(form as any) : content}
                {description && (
                    <Typography variant="body1">{description}</Typography>
                )}
            </AlertDialog>
        </>
    );
};

interface ConfirmationConsumerProps {
    children: (value: ConfirmationState | null) => ReactNode;
}

export const ConfirmationConsumer: FC<ConfirmationConsumerProps> = ({
    children,
}) => {
    return (
        <ConfirmationContext.Consumer>
            {(context) => {
                if (context === undefined) {
                    throw new Error(
                        "ConfirmationConsumer must be used within a ConfirmationProvider"
                    );
                }
                return children(context);
            }}
        </ConfirmationContext.Consumer>
    );
};
