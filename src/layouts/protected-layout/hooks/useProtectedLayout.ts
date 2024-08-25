import { useState } from "react";
import { Theme, useMediaQuery } from "@mui/material";
import { useLocation } from "react-router-dom";

import { usePageRenderContext } from "@/contexts/PageRenderContext";
import { useRouteRenderContext } from "@/contexts/RouteRenderContext";

export function useProtectedLayout() {
    const { pageRenderData } = usePageRenderContext();
    const { routeConfigs } = useRouteRenderContext();
    const isTab = useMediaQuery<Theme>((theme) => theme.breakpoints.down("tp"));
    const { pathname } = useLocation();

    const [isMobileNavOpen, setMobileNavOpen] = useState(false);

    const currentLocation = "/";

    return {
        isMobileNavOpen,
        setMobileNavOpen,
        routeConfigs,
        currentLocation,
        pathname,
        pageRenderData,
        isTab,
    };
}
