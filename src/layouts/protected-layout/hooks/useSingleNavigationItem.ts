import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import { selectCollapseSideBar } from "@/stores/modules/ui";
import { Theme, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { useMatches } from "react-router-dom";

import { RouteConfig } from "@/models/route-config";
import { constructPath } from "@/utils/route-utils";

// import theme from "../../../theme";

export default function useSingleNavigationItem(
    route: RouteConfig,
    basePath?: string
) {
    const path = constructPath(route.path, basePath);
    const matches = useMatches();
    const [isExpanded, changeExpansion] = useState(false);
    const [isActive, changeActive] = useState(false);
    const { isSideBarCollapsed } = useSelector(selectCollapseSideBar);
    const isTab = useMediaQuery<Theme>((theme) => theme.breakpoints.down("tp"));
    const anchorEl = useRef<HTMLButtonElement | null>(null);
    const shouldBeCollapsed = !isTab && isSideBarCollapsed;

    const getSimlifiedRoute = (currentPath: string) => {
        return currentPath.endsWith("/") ? currentPath : `${currentPath}/`;
    };

    useEffect(() => {
        const match = matches.find((r) => r.pathname === path);
        changeExpansion(!!match && !shouldBeCollapsed);
        changeActive(() => !!match);
    }, [matches, path]);

    const extractChildNRoutes = useCallback(() => {
        return (route.routes || []).filter((item) => !item.bypassDisplay);
    }, [route]);

    // useEffect(() => {
    //     if (!(shouldBeCollapsed)) {
    //         changeExpansion(false);
    //         anchorEl.current = null;
    //     }
    // }, [isTab, isSideBarCollapsed]);

    useEffect(() => {
        if (isSideBarCollapsed) {
            changeExpansion(false);
            anchorEl.current = null;
        }
    }, [isSideBarCollapsed]);

    const handlePopOpen = (event: MouseEvent<HTMLButtonElement>) => {
        // setAnchorEl(event.currentTarget);
        anchorEl.current = event.currentTarget;
        changeExpansion(!isExpanded);
    };
    const handlePopClose = (event: MouseEvent<HTMLDivElement>) => {
        changeExpansion(!isExpanded);
        anchorEl.current = null;
    };

    const handlePopoverClose = () => {
        anchorEl.current = null;
    };

    return {
        extractChildNRoutes,
        isExpanded,
        isActive,
        changeExpansion,
        isSideBarCollapsed,
        isTab,
        anchorEl,
        handlePopOpen,
        handlePopClose,
        handlePopoverClose,
        shouldBeCollapsed,
    };
}
