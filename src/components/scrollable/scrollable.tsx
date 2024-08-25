import React, { CSSProperties, FC, ForwardRefRenderFunction, PropsWithChildren, forwardRef } from "react";
import clsx from "clsx";

type Direction = "ltr" | "rtl";
export interface ScrollableProps {
    classes?: {
        root?: string;
        wrapper?: string;
        container?: string;
    };
    className?: string;
    styles?: CSSProperties;
    superSlim?: boolean;
    direction?: {
        parent?: Direction;
        child?: Direction;
    };
    onScroll?: React.UIEventHandler<HTMLDivElement>;
}

const Scrollable: ForwardRefRenderFunction<HTMLDivElement, PropsWithChildren<ScrollableProps>> = ({
    classes,
    className,
    children,
    superSlim,
    styles,
    direction,
    onScroll,
    ...rest
}, ref) => {
    return (
        <div
            ref={ref}
            className={clsx(
                "relative flex grow flex-col overflow-hidden",
                className,
                classes?.root
            )}
            style={styles}
            dir={direction?.parent}
            {...rest}
        >
            <div
                onScroll={onScroll}
                className={clsx(
                    superSlim ? "custom-scroll-super-slim" : "custom-scroll",
                    "flex grow flex-col overflow-x-hidden",
                    classes?.wrapper
                )}>
                <div
                    className={clsx("content flex grow flex-col", classes?.container)}
                    dir={direction?.child}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default forwardRef(Scrollable);
