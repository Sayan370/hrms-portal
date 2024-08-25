import { FC, PropsWithChildren } from "react";
// import { logSentryError } from "../../serverLog";
// import FailedComponent from "../failed-component";
import { Replay, Undo } from "@mui/icons-material";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

import { AppButton } from "@/components/form";
import logger from "@/utils/log-utils";

// interface ErrorBoundaryWrappedState {
//     hasError: boolean;
// }
interface ErrorBoundaryWrappedProps {
    resetKeys?: unknown[];
    onReset?: (...args: unknown[]) => void;
}

const ErrorFallback = ({
    resetKeys,
    onReset,
    error,
    resetErrorBoundary,
}: FallbackProps & ErrorBoundaryWrappedProps) => {
    const backToMainPage = () => {
        window.location.assign(
            `${window.location.protocol}//${window.location.host}/`
        );
    };
    return (
        <div className="flex h-full w-full flex-col items-center justify-center">
            {/* <FailedComponent type="error" text="Something went wrong" size="medium" /> */}
            <AppButton
                className="mt-4"
                variant="contained"
                onClick={backToMainPage}
                buttonProps={{ startIcon: <Replay /> }}>
                Back to Main Page
            </AppButton>
            {!!resetKeys && !!onReset && (
                <AppButton
                    variant="contained"
                    className="mt-2"
                    onClick={resetErrorBoundary}
                    buttonProps={{ startIcon: <Undo /> }}>
                    Try to Reset
                </AppButton>
            )}
        </div>
    );
};

const ErrorBoundaryWrapped: FC<
    PropsWithChildren<ErrorBoundaryWrappedProps>
> = ({ resetKeys, onReset, children }) => {
    const getErrorFallBack = (props: FallbackProps) => (
        <ErrorFallback {...props} resetKeys={resetKeys} onReset={onReset} />
    );
    const onErrorHandler = (error: Error) => {
        logger.error("UI Unhandled Exception: {name} - {message}", { message: error.message, name: error.name }, error);
    }
    return (
        <ErrorBoundary
            FallbackComponent={getErrorFallBack}
            onError={onErrorHandler}
            resetKeys={resetKeys}
            onReset={onReset}>
            {children}
        </ErrorBoundary>
    );
};

export { ErrorBoundaryWrapped };
