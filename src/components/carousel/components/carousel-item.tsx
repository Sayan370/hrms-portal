import React from "react";
import clsx from "clsx";

interface SlideState {
    isActive?: boolean;
    isVisible?: boolean;
}
export interface CarouselItemProps {
    className?: string;
    gutter?: number | string;
    readonly isSnapPoint?: boolean;
    readonly isVisible?: boolean;
    readonly index?: number;
    readonly length?: number;
    readonly children?:
        | React.ReactNode
        | ((props: SlideState) => React.ReactNode);
}

const CarouselItem = ({
    isSnapPoint,
    isVisible,
    className,
    children,
    gutter,
    index = 0,
    length = 0,
}: CarouselItemProps) => (
    <li
        style={{
            paddingLeft:
                (gutter && index === length - 1) ||
                (gutter && index > 0 && index < length - 1)
                    ? gutter
                    : undefined,
            paddingRight:
                (gutter && length > 1 && index === 0) ||
                (gutter && index > 0 && index < length - 1)
                    ? gutter
                    : undefined,
        }}
        className={clsx(
            className,
            "shrink-0 list-none",
            isSnapPoint && "snap-start"
        )}>
        {typeof children === "function"
            ? children({ isActive: isSnapPoint, isVisible })
            : children}
    </li>
);

export default CarouselItem;
