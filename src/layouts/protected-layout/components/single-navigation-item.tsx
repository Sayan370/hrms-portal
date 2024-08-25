import * as React from "react";
import { KeyboardArrowRight } from "@mui/icons-material";
import { Popover } from "@mui/material";
import clsx from "clsx";

import { RouteConfig } from "@/models/route-config";
import { constructPath } from "@/utils/route-utils";
import { NavigationLink } from "@/components/navigation-link";

import useSingleNavigationItem from "../hooks/useSingleNavigationItem";
import NavItemText from "./nav-item-text";

export interface SingleNavigationItemProps {
    navItem: RouteConfig;
    basePath?: string;
    showChildRoutesInPopOver?: boolean;
    l1Route?: boolean;
    leafRoute?: boolean;
}
const SingleNavigationItem: React.FC<SingleNavigationItemProps> = ({
    navItem,
    basePath,
    l1Route = false,
    leafRoute = false,
    showChildRoutesInPopOver = true,
}) => {
    const {
        extractChildNRoutes,
        isExpanded,
        isActive,
        changeExpansion,
        isSideBarCollapsed,
        isTab,
        shouldBeCollapsed,
        anchorEl,
        handlePopOpen,
        handlePopClose,
        handlePopoverClose,
    } = useSingleNavigationItem(navItem, basePath);

    const content =
        extractChildNRoutes().length > 0 ? (
            <button
                type="button"
                className="navigation-group"
                onClick={handlePopOpen}
                ref={anchorEl}>
                <div className="flex flex-row items-center justify-between">
                    <NavItemText
                        text={navItem.name}
                        icon={navItem.icon}
                        showOnlyIcon={l1Route && shouldBeCollapsed}
                        showIconsIfNotPresent={l1Route}
                    />
                    <KeyboardArrowRight className="anchor" />
                </div>
            </button>
        ) : (
            <NavigationLink
                url={navItem.path}
                to={constructPath(navItem.path, basePath)}
                route={navItem}
                className="navigation-element focused flex grow justify-center">
                <NavItemText
                    text={navItem.name}
                    icon={navItem.icon}
                    showOnlyIcon={l1Route && shouldBeCollapsed}
                    showIconsIfNotPresent={l1Route}
                />
            </NavigationLink>
        );

    return navItem?.isLayout ? (
        <>
            {extractChildNRoutes().map((item) => (
                <SingleNavigationItem
                    key={item.path}
                    navItem={item}
                    basePath={constructPath(navItem.path, basePath)}
                    l1Route={l1Route}
                    leafRoute={!item.routes?.length}
                />
            ))}
        </>
    ) : (
        <div
            className={clsx(
                "nav-group-container relative flex shrink-0 flex-col",
                {
                    "mr-2": isTab || (!l1Route && shouldBeCollapsed),
                    "expanded-container": isExpanded,
                    "highlight-container": isActive,
                    "highlight-font": isActive && !isExpanded,
                    "leaf-node": leafRoute,
                    "pr-0": shouldBeCollapsed && l1Route,
                    "mr-4": !shouldBeCollapsed && !l1Route,
                    "pr-5":
                        shouldBeCollapsed &&
                        !l1Route &&
                        !(extractChildNRoutes().length > 0),
                }
            )}
            // onMouseEnter={handlePopoverOpen}
            // onMouseLeave={handlePopoverClose}
        >
            {content}
            {showChildRoutesInPopOver && shouldBeCollapsed && navItem.routes ? (
                <Popover
                    classes={{
                        paper: "!bg-primary-800 dark:!bg-primary-950 overflow-x-hidden",
                    }}
                    open={isExpanded && Boolean(anchorEl?.current)}
                    anchorEl={anchorEl?.current || null}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                    }}
                    onClose={handlePopClose}
                    disableRestoreFocus>
                    <div
                        className={clsx(
                            "navigation-content flex grow flex-col",
                            shouldBeCollapsed && "py-1"
                        )}>
                        {extractChildNRoutes().map((item) => (
                            <SingleNavigationItem
                                key={item.path}
                                navItem={item}
                                basePath={constructPath(navItem.path, basePath)}
                                leafRoute={!item.routes?.length}
                            />
                        ))}
                    </div>
                </Popover>
            ) : (
                isExpanded && (
                    <>
                        {extractChildNRoutes().map((item) => (
                            <SingleNavigationItem
                                key={item.path}
                                navItem={item}
                                basePath={constructPath(navItem.path, basePath)}
                                showChildRoutesInPopOver={false}
                                leafRoute={!item.routes?.length}
                            />
                        ))}
                    </>
                )
            )}
        </div>
    );
};

export default SingleNavigationItem;
