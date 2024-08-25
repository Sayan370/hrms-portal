import {
    createContext,
    Dispatch,
    FC,
    PropsWithChildren,
    ReactNode,
    SetStateAction,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

import { PageRenderData } from "@/models/page-render-data";

export interface PageRenderContextState {
    pageRenderData: PageRenderData;
    // setPageRenderData: Dispatch<SetStateAction<PageRenderData>>;
}

export const PageRenderContext = createContext<PageRenderContextState | null>(
    null
);
PageRenderContext.displayName = "PageRenderContext";

export function usePageRenderContext() {
    const context = useContext(PageRenderContext);
    if (!context)
        throw new Error(
            "PageRenderContext must be used with PageRenderProvider!"
        );
    return context;
}

interface PageRenderProviderProps {
    pageRenderData: PageRenderData;
}

export const PageRenderProvider: FC<
    PropsWithChildren<PageRenderProviderProps>
> = (props) => {
    const { children, pageRenderData } = props;
    // const [pageRenderData, setPageRenderData] = useState<PageRenderData>(currentPageRenderData);

    // useEffect(() => {
    //     if (currentPageRenderData) setPageRenderData(currentPageRenderData);
    // }, []);

    // const value = useMemo(() => ({ pageRenderData, setPageRenderData }), [pageRenderData]);
    const value = useMemo(() => ({ pageRenderData }), [pageRenderData]);
    return (
        <PageRenderContext.Provider value={value}>
            {children}
        </PageRenderContext.Provider>
    );
};

interface PageRenderConsumerProps {
    children: (value: PageRenderContextState | null) => ReactNode;
}

export const PageRenderConsumer: FC<PageRenderConsumerProps> = ({
    children,
}) => {
    return (
        <PageRenderContext.Consumer>
            {(context) => {
                if (context === undefined) {
                    throw new Error(
                        "PageRenderConsumer must be used within a PageRenderProvider"
                    );
                }
                return children(context);
            }}
        </PageRenderContext.Consumer>
    );
};
