import {
    Children,
    cloneElement,
    CSSProperties,
    forwardRef,
    isValidElement,
    PropsWithChildren,
    ReactElement,
    Ref,
} from "react";
import { Close } from "@mui/icons-material";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogProps,
    DialogTitle,
    ModalProps,
    Slide,
    Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import clsx from "clsx";

import { OnCloseType } from "@/models/func-types";

import { AppButton } from "../form";

interface ActionDialogProps {
    open?: boolean;
    onClose?: ModalProps["onClose"];
    maxWidth?: DialogProps["maxWidth"];
    grow?: boolean;
    style?: CSSProperties;
}

const Transition = forwardRef(
    (
        props: TransitionProps & {
            children: ReactElement<any, any>;
        },
        ref: Ref<unknown>
    ) => {
        return <Slide direction="down" ref={ref} {...props} />;
    }
);

const ActionDialog = (props: PropsWithChildren<ActionDialogProps>) => {
    const {
        children,
        onClose,
        open,
        maxWidth = "sd",
        grow = false,
        style,
    } = props;
    return (
        <Dialog
            open={open ?? false}
            TransitionComponent={Transition}
            style={style}
            keepMounted
            onClose={onClose}
            aria-describedby="alert-dialog-slide-description"
            maxWidth={maxWidth}
            fullWidth={grow}>
            {Children.map(children, (child) => {
                if (!isValidElement(child)) return null;

                const item = child as ReactElement<PropsWithChildren>;

                if (item.type === Title) {
                    return (
                        <DialogTitle className="!px-4">
                            {cloneElement(item, {
                                ...item.props,
                                ...{ onClose },
                            })}
                        </DialogTitle>
                    );
                }
                if (item.type === Body) {
                    return <DialogContent>{cloneElement(item)}</DialogContent>;
                }
                if (item.type === Actions) {
                    return (
                        <DialogActions classes={{ root: "!px-4" }}>
                            {cloneElement(item, { ...item.props })}
                        </DialogActions>
                    );
                }
                return child;
            })}
        </Dialog>
    );
};

interface TitleProps {
    onClose?: OnCloseType;
    hideCloseButton?: boolean;
    classes?: {
        root?: string;
        title?: string;
    };
}

const Title = ({
    children,
    classes,
    onClose,
    hideCloseButton = false,
}: PropsWithChildren<TitleProps>) => {
    const handleClose = () => onClose?.call(this, {}, "titleClose");
    return (
        <div
            className={clsx(
                "flex items-center justify-between",
                classes?.root
            )}>
            <Typography
                variant="h6"
                className={clsx("tracking-wide", classes?.title)}>
                {children}
            </Typography>
            {!hideCloseButton && (
                <AppButton onClick={handleClose} variant="icon" size="small">
                    <Close fontSize="small" />
                </AppButton>
            )}
        </div>
    );
};

interface ActionsProps {
    classes?: {
        root?: string;
    };
}

const Actions = ({
    children,
    classes,
    ...actionProps
}: PropsWithChildren<ActionsProps>) => {
    return (
        <div className={clsx("flex justify-end pb-2", classes?.root)}>
            {Children.map(children, (child) => {
                const item = child as ReactElement<
                    PropsWithChildren<typeof actionProps>
                >;

                return (
                    item &&
                    cloneElement(item, { ...item.props, ...actionProps })
                );
            })}
        </div>
    );
};

interface BodyProps {
    classes?: {
        root?: string;
    };
}
const Body = ({ children, classes }: PropsWithChildren<BodyProps>) => {
    return <div className={clsx("py-1", classes?.root)}>{children}</div>;
};

export const ActionDialogTitle = Title;
export const ActionDialogActions = Actions;
export const ActionDialogBody = Body;

export default ActionDialog;
