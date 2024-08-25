import React from "react";
import { Navigate, redirect, Route } from "react-router-dom";

import { RouteConfig } from "@/models/route-config";
// import ChildRouteRender from "../components/routers/child-route-renderer";
import { RouteGuard } from "@/models/route-guard";
import { UserRoles } from "@/models/types";
import { UserScopes } from "@/models/user-scopes";
import { SuspendedPage } from "@/components/suspended-page";

import { evaluate, UnionExp } from "./bool-utils";

type DataProps = "loader" | "action" | "handle" | "lazy";
type UtilAuthRouteConfig = Omit<
    RouteConfig,
    "authRequired" | "nonAuthRequired" | "bypassSearch" | "isLayout" | DataProps
>;
type UtilRouteConfig = Omit<UtilAuthRouteConfig, "guard">;
type InvisibleRouteConfig = Omit<UtilRouteConfig, "bypassDisplay">;

export const redirectTo = (path: string) => {
    redirect(path);
};

/**
 * Creates route, for any user
 * @param config Route Config object
 */
export const definePublicRoute = (
    config: UtilRouteConfig,
    bypassSearch: boolean = false
): RouteConfig => {
    return {
        ...config,
        authRequired: false,
        nonAuthRequired: false,
        bypassSearch,
    };
};

/**
 * Creates route, for any logged in user
 * @param config Route Config object
 */
export const defineAuthedRoute = (
    config: UtilAuthRouteConfig,
    bypassSearch: boolean = false
): RouteConfig => {
    return {
        ...config,
        authRequired: true,
        nonAuthRequired: false,
        bypassSearch,
    };
};

/**
 * Creates route, for any logged in user
 * @param config Route Config object
 */
export const defineNonAuthedRoute = (
    config: UtilRouteConfig,
    bypassSearch: boolean = false
): RouteConfig => {
    return {
        ...config,
        authRequired: false,
        nonAuthRequired: true,
        bypassSearch,
    };
};

/**
 * Creates route, only for Admin and SuperAdmin
 * @param config Route Config object
 */
export const defineRouteWithCommonAdminRole = (
    config: RouteConfig
): RouteConfig => {
    return {
        ...defineAuthedRoute(config),
        guard: {
            allowedRoles: ["SuperAdmin", "Admin"],
            // exceptSubscriptions: ["Invalid"],
            ...config.guard,
        },
    };
};

/**
 * Creates route, which will not be available in search and any navigation menu
 * @param config Route Config object
 */
export const defineInvisibleRoute = (
    config: InvisibleRouteConfig
): RouteConfig => {
    return {
        ...config,
        bypassSearch: true,
        bypassDisplay: true,
    };
};

/**
 * Creates route, which will redirect to given url, if opened
 * @param config Route Config object
 * @param redirectionTo path to redirect
 */
export const defineRedirectRoute = (
    config: Omit<RouteConfig, "element" | "component">,
    redirectionTo: string
): RouteConfig => {
    return {
        ...config,
        element: <Navigate to={redirectionTo} replace />,
    };
};

/**
 * Creates route, which will set a layout, if opened
 * @param config Route Config object
 * @param redirectionTo path to redirect
 */
export const defineLayoutRoute = (
    config: Omit<RouteConfig, "name" | "path" | "index" | "isLayout">
): RouteConfig => {
    return {
        ...config,
        name: "Layout",
        path: "",
        isLayout: true,
        // index: true,
    };
};
//     return { ...config, component: ChildRouteRender };
// };

export const constructPath = (
    nextPath: string,
    currentPath: string = ""
): string => {
    const formattedCurrentPath = currentPath.endsWith("/")
        ? currentPath.slice(0, -1)
        : currentPath;
    const formattedNextPath = nextPath.startsWith("/")
        ? nextPath.slice(1)
        : nextPath;
    const path = `${formattedCurrentPath.toLowerCase()}/${formattedNextPath.toLowerCase()}`;
    return path;
};

export const getFullUrl = (endpoint: string): string => {
    const path = /^http[s]{0,1}:\/\//.test(endpoint)
        ? endpoint
        : `${window.location.protocol}//${window.location.host}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`
        }`;
    return path;
};

/**
 * Auth gaurd checker
 * @param guard The auth gaurd for roles
 * @param role User role
 * @returns is the role allowed by the gaurd
 */

export function isUserRoleAllowed(guard: RouteGuard, role: UserRoles): boolean {
    let status = true;

    if (guard.allowedRoles) {
        status = status && guard.allowedRoles.indexOf(role) > -1;
    }
    if (guard.exceptRoles) {
        status = status && guard.exceptRoles.indexOf(role) < 0;
    }
    return status;
}

/**
 * Auth gaurd checker
 * @param guard The auth gaurd for roles
 * @param scopes User Scopes
 * @returns is the scope allowed by the gaurd
 */

export function isUserScopeAllowed(
    guard: RouteGuard,
    scopes: UserScopes[]
): boolean {
    let status = true;

    if (guard.allowedScopes) {
        status = evaluate(scopes, guard.allowedScopes);
    }
    return status;
}

/**
 * Creates a mapped link for the link elements
 * @param link the $\d seperated link
 * @param mapObj mapper object, example: {"$1":"usb"}
 */
export const getPathWithReplacement = (
    link: string,
    mapObj: { [key: string]: string }
): string => {
    return link.replace(/(\$\d+)/g, (v) => mapObj[v]);
};

/**
 * Create suspended component
 * @param Component the component that needs to be rendered
 * @param props the props that needs to be passed to the component
 */
export const suspendedComponent =
    (Component: React.ComponentType<any>) => (props: any) =>
    (
        <SuspendedPage>
            <Component {...props} />
        </SuspendedPage>
    );
