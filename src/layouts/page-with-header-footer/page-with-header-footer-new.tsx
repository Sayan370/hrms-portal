import {
    Children,
    CSSProperties,
    FC,
    isValidElement,
    PropsWithChildren,
    ReactElement,
    ReactNode,
} from "react";
import clsx from "clsx";
import { Helmet } from "react-helmet";
import flattenChildren from "react-keyed-flatten-children";
import { useSelector } from "react-redux";

import { PageRenderData } from "@/models/page-render-data";
import { config } from "@/utils/app-config";
import { usePageRenderContext } from "@/contexts/PageRenderContext";
import ErrorBoundary from "@/components/error-boundary";

interface ClassNames {
    header?: string;
    body?: string;
    footer?: string;
}

export interface PageWithHeaderFooterProps {
    title?: string;
    classes?: ClassNames;
    errorResetKeys?: unknown[];
    onReset?: (...args: unknown[]) => void;
}

const PageWithHeaderFooter = ({
    title,
    children,
    errorResetKeys,
    onReset,
    classes,
}: PropsWithChildren<PageWithHeaderFooterProps>) => {
    const { pageRenderData } = usePageRenderContext();
    // const pageTitle = pageRenderData?.title || title;

    return (
        <>
            <Helmet>
                <title>
                    {pageRenderData.title || pageRenderData.name} ||{" "}
                    {config.env.APP_TITLE}
                </title>
            </Helmet>
            <div className="sticky top-0 z-50 bg-slate-50 px-8 pb-1 pt-5 text-2xl font-bold tracking-wide text-primary-900 dark:bg-slate-950 dark:text-primary-200">
                <div className="flex flex-row flex-wrap items-center justify-between">
                    {pageRenderData.pageHeader || pageRenderData.name}
                    {flattenChildren(children, 1).find((child) => {
                        const item = child as ReactElement<PropsWithChildren>;

                        return item.type === HeaderActions;
                    })}
                </div>
            </div>
            <ErrorBoundary resetKeys={errorResetKeys} onReset={onReset}>
                <main className="flex grow flex-col">
                    <div
                        className={clsx(
                            "h-full bg-slate-50 px-8 pb-2 pt-4 dark:bg-slate-950",
                            classes?.body
                        )}>
                        {Children.map(children, (child) => {
                            // if (!isValidElement(child)) return null;

                            const item =
                                child as ReactElement<PropsWithChildren>;

                            if (item?.type !== HeaderActions) return item;
                            return null;
                        })}
                    </div>
                </main>
            </ErrorBoundary>
            <footer className="bg-slate-50 px-8 py-3 text-xs dark:bg-slate-950">
                Copyright © {new Date().getFullYear()} MNSR Trading Pvt. Ltd. -
                All Rights Reserved.
            </footer>
        </>
    );
};

interface HeaderActionsProps {
    className?: string;
}

const HeaderActions = ({
    children,
    className,
}: PropsWithChildren<HeaderActionsProps>) => {
    return <div className={clsx("flex", className)}>{children}</div>;
};

export const PWHFHeaderActions = HeaderActions;

export default PageWithHeaderFooter;
