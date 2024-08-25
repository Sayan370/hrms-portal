import * as React from "react";
import CircularProgress, {
    CircularProgressProps,
} from "@mui/material/CircularProgress";
import clsx from "clsx";

import CircularProgressWithLabel from "./circular-progress-with-label";

export interface LoadingProps {
    grow?: boolean;
    className?: string;
    size?: number | string;
    title?: string;
    subTitle?: string;
    value?: number;
}

const Loading: React.FC<
    LoadingProps & Pick<CircularProgressProps, "color" | "variant">
> = ({
    className,
    grow = false,
    title,
    subTitle,
    value,
    variant = "indeterminate",
    ...props
}) => {
    return grow ? (
        <div className={clsx("flex h-full w-full grow flex-row", className)}>
            <div className="flex grow flex-col items-center justify-center">
                {variant === "determinate" && value ? (
                    <CircularProgressWithLabel value={value} {...props} />
                ) : (
                    <CircularProgress {...props} />
                )}
                {!!title && (
                    <span className="mt-2 text-lg font-bold">{title}</span>
                )}
                {!!subTitle && <span className="mt-1 text-sm">{subTitle}</span>}
            </div>
        </div>
    ) : variant === "determinate" && value ? (
        <CircularProgressWithLabel
            className={className}
            value={value}
            {...props}
        />
    ) : (
        <CircularProgress className={className} {...props} />
    );
};

export default Loading;
