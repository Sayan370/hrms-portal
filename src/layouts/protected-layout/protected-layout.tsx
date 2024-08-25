import { FC, PropsWithChildren } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { Outlet } from "react-router-dom";

import { config } from "@/utils/app-config";
import { usePageRenderContext } from "@/contexts/PageRenderContext";

import SideNavBar from "./components/side-navbar";
import TopBar from "./components/top-bar";
import { useProtectedLayout } from "./hooks/useProtectedLayout";

interface ProtectedLayoutProps { }

const ProtectedLayout: FC<PropsWithChildren<ProtectedLayoutProps>> = ({
    children,
}) => {
    const {
        routeConfigs,
        setMobileNavOpen,
        isMobileNavOpen,
        currentLocation,
        pageRenderData,
        pathname,
        isTab,
    } = useProtectedLayout();
    return (
        <>
            <Helmet>
                <title>
                    {pageRenderData.title || pageRenderData.name} ||{" "}
                    {config.env.APP_TITLE}
                </title>
            </Helmet>
            <div className="flex h-full flex-row overflow-hidden">
                <div className="flex flex-col">
                    <SideNavBar
                        onMobileClose={() => setMobileNavOpen(false)}
                        openMobileNav={isMobileNavOpen}
                        routes={routeConfigs}
                        basePath={currentLocation}
                    />
                </div>
                <div className="w-full grow p-2 tp:w-64">
                    {isTab && (
                        <TopBar
                            onMobileNavOpen={() => setMobileNavOpen(true)}
                        />
                    )}
                    <motion.div
                        className="flex h-[calc(100vh-4.5rem)] grow flex-col overflow-auto rounded-lg bg-slate-50 shadow-md dark:bg-slate-950 tp:h-full"
                        key={pathname}
                        variants={{
                            initial: { opacity: 0, x: 100 },
                            animate: { opacity: 1, x: 0, overflow: "auto" },
                            exit: { opacity: 0, x: 100 },
                        }}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.3 }}>
                        <Outlet />
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default ProtectedLayout;
