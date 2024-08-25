import React, {
    Children,
    cloneElement,
    isValidElement,
    PropsWithChildren,
    ReactElement,
} from "react";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { Pagination } from "@mui/material";
import clsx from "clsx";
import { useSnapCarousel } from "react-snap-carousel";

import { AppButton } from "../form";
import CarouselItem, { CarouselItemProps } from "./components/carousel-item";

export interface NavigationOptions {
    enabled?: boolean;
    nextEl?: string | HTMLElement | null;
    prevEl?: string | HTMLElement | null;
    hideOnClick?: boolean;
    disabledClass?: string;
    hiddenClass?: string;
    lockClass?: string;
    navigationDisabledClass?: string;
}

interface CarouselProps {
    children?: React.ReactNode;
    classes?: {
        wrapper?: string;
        root?: string;
    };
    // spaceBetween?: number | string;
    // slidesPerView?: number | "auto";
    // navigation?: boolean | NavigationOptions;
    scrollbarEnabled?: boolean;
    paginationEnabled?: boolean;
    pageTextIndicatorEnabled?: boolean;
    paginationClickable?: boolean;
    showFirstButton?: boolean;
    showLastButton?: boolean;
}

const Carousel = ({
    children,
    classes,
    scrollbarEnabled = true,
    paginationEnabled = true,
    pageTextIndicatorEnabled = true,
    paginationClickable,
    showFirstButton,
    showLastButton,
    ...rest
}: CarouselProps) => {
    const {
        scrollRef,
        pages,
        activePageIndex,
        prev,
        next,
        goTo,
        snapPointIndexes,
    } = useSnapCarousel();

    return (
        <div className={clsx("carousel-container", classes?.wrapper)}>
            <ul
                className={clsx(
                    "custom-scroll light relative flex snap-x snap-mandatory overflow-auto pb-1.5 pl-0",
                    classes?.root,
                    !scrollbarEnabled && "no-scrollbar"
                )}
                ref={scrollRef}>
                {Children.map(children, (child, i) => {
                    if (!isValidElement(child)) return null;

                    const item = child as ReactElement<
                        PropsWithChildren<CarouselItemProps>
                    >;

                    if (item.type === CarouselItem) {
                        return cloneElement(item, {
                            ...item.props,
                            length: Children.count(children),
                            index: i,
                            isSnapPoint: snapPointIndexes.has(i),
                            isVisible:
                                pages[activePageIndex]?.includes(i) || false,
                        });
                    }

                    return null;
                })}
            </ul>
            {paginationEnabled && (
                <div className="flex items-center justify-center" aria-hidden>
                    {/* <AppButton
                        type="button"
                        size="small"
                        variant="icon"
                        className={clsx("", activePageIndex <= 0 && "")}
                        onClick={() => prev()}>
                        <ArrowLeft fontSize="small" />
                    </AppButton>
                    {pages.map((_, i) => (
                        <button
                            type="button"
                            key={i}
                            className={clsx(
                                "m-2 cursor-pointer rounded-lg border-none bg-slate-300 p-1 outline-none",
                                activePageIndex === i && "!bg-slate-600"
                            )}
                            disabled={!paginationClickable}
                            onClick={() => goTo(i)}>
                            {i + 1}
                        </button>
                    ))}
                    <AppButton
                        type="button"
                        size="small"
                        variant="icon"
                        className={clsx(
                            "",
                            activePageIndex === pages.length - 1 && ""
                        )}
                        onClick={() => next()}>
                        <ArrowRight fontSize="small" />
                    </AppButton> */}
                    {pages.length > 1 && (
                        <Pagination
                            count={pages.length}
                            page={activePageIndex + 1}
                            showFirstButton={showFirstButton}
                            showLastButton={showLastButton}
                            size="small"
                            onChange={(evt, page) => {
                                // if (page <= activePageIndex) prev();
                                // if (page > activePageIndex) next();
                                goTo(page - 1);
                            }}
                        />
                    )}
                </div>
            )}
            {/* {pageTextIndicatorEnabled && (
                <div className="flex justify-center">
                    <span className="rounded-sm bg-slate-200 px-2 font-primary text-sm dark:bg-slate-400">
                        {activePageIndex + 1} / {pages.length}
                    </span>
                </div>
            )} */}
        </div>
    );
};

export default Carousel;
