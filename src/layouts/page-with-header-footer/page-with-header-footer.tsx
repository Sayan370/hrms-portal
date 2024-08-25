import { CSSProperties, FC, PropsWithChildren, ReactNode } from "react";
import clsx from "clsx";
import { Helmet } from "react-helmet";
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

export interface PWHFHeaderProps {
    pageRenderData: PageRenderData;
}

export interface PageWithHeaderFooterProps {
    title?: string;
    headerContent?: (headerProps: PWHFHeaderProps) => ReactNode;
    classes?: ClassNames;
    errorResetKeys?: unknown[];
    onReset?: (...args: unknown[]) => void;
}

const PageWithHeaderFooter: FC<
    PropsWithChildren<PageWithHeaderFooterProps>
> = ({ title, children, errorResetKeys, headerContent, onReset, classes }) => {
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
                {headerContent?.call(this, { pageRenderData }) ||
                    pageRenderData.pageHeader ||
                    pageRenderData.name}
            </div>
            <ErrorBoundary resetKeys={errorResetKeys} onReset={onReset}>
                <main className="flex grow flex-col">
                    <div
                        className={clsx(
                            "h-full bg-slate-50 px-8 pb-2 pt-4 dark:bg-slate-950",
                            classes?.body
                        )}>
                        {children}
                    </div>
                </main>
            </ErrorBoundary>
            <footer className="bg-slate-50 px-8 py-3 text-xs dark:bg-slate-950">
                Copyright © {new Date().getFullYear()} HRMS App Pvt. Ltd. -
                All Rights Reserved.
            </footer>
        </>
    );
};

export default PageWithHeaderFooter;
