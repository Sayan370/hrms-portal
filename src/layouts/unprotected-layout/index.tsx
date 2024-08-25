import { FC, PropsWithChildren } from "react";
import { Helmet } from "react-helmet";

import { config } from "@/utils/app-config";
import { usePageRenderContext } from "@/contexts/PageRenderContext";

interface UnprotectedLayoutProps { }

const UnprotectedLayout: FC<PropsWithChildren<UnprotectedLayoutProps>> = ({
    children,
}) => {
    const { pageRenderData } = usePageRenderContext();
    return (
        <>
            <Helmet>
                <title>
                    {pageRenderData.title || pageRenderData.name} ||{" "}
                    {config.env.APP_TITLE}
                </title>
            </Helmet>
            {children}
        </>
    );
};

export default UnprotectedLayout;
