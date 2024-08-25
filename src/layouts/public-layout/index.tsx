import { FC, PropsWithChildren } from "react";
import { Helmet } from "react-helmet";

import { usePageRenderContext } from "@/contexts/PageRenderContext";
import { config } from "@/utils/app-config";

interface PublicLayoutProps { }

const PublicLayout: FC<PropsWithChildren<PublicLayoutProps>> = ({
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

export default PublicLayout;
