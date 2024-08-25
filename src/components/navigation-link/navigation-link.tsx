import React from "react";
import { NavLink, useMatch } from "react-router-dom";

import { RouteConfig } from "@/models/route-config";
import { constructPath } from "@/utils/route-utils";

export interface NavigationLinkProps {
    // activeClassName?: string;
    // activeStyle?: React.CSSProperties;
    to?: string;
    className?: string;
    route: RouteConfig;
    url: string;
}

const NavigationLink: React.ForwardRefRenderFunction<
    HTMLAnchorElement,
    React.PropsWithChildren<NavigationLinkProps>
> = ({ to, route, children, url, ...others }, ref) => {
    return route.externalLink ? (
        <a
            ref={ref}
            target="_blank"
            href={route.path}
            className="navigation-text text-ellipsis"
            rel="noreferrer">
            {children || route.name}
        </a>
    ) : (
        <NavLink
            ref={ref}
            to={to || constructPath(route.path, url)}
            end
            {...others}>
            {children || route.name}
        </NavLink>
    );
};

export default React.forwardRef(NavigationLink);
