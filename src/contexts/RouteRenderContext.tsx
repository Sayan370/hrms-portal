import {
    ComponentType,
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
import { gaurdlessRoutesConfig, routesConfig } from "@/routes";
import { selectUser } from "@/stores/modules/authentication";
import { cloneDeep, union } from "lodash";
import { useSelector } from "react-redux";
import { RouteObject } from "react-router-dom";

import { AccountUser } from "@/models/account-user";
import { GaurdRouteProps } from "@/models/gaurd-route-props";
import { PageRenderData } from "@/models/page-render-data";
import { RouteConfig, RouteConfigWithChildren } from "@/models/route-config";
import { RouteGuard } from "@/models/route-guard";
import { UserRoles } from "@/models/types";
import { and } from "@/utils/bool-utils";
import { isUserRoleAllowed, isUserScopeAllowed } from "@/utils/route-utils";
import ProtectedLayout from "@/layouts/protected-layout";
import ErrorBoundary from "@/components/error-boundary";
import { AuthRoute, NonAuthRoute } from "@/components/routers";

import { PageRenderProvider } from "./PageRenderContext";

export interface RouteRenderContextState {
    routes: RouteObject[];
    routeConfigs: RouteConfig[];
}

export const RouteRenderContext = createContext<RouteRenderContextState | null>(
    null
);
RouteRenderContext.displayName = "RouterRenderContext";

export function useRouteRenderContext() {
    const context = useContext(RouteRenderContext);
    if (!context)
        throw new Error(
            "RouterRenderContext must be used with RouteRenderProvider!"
        );
    return context;
}

interface RouteRenderProviderProps {}

export const RouteRenderProvider: FC<
    PropsWithChildren<RouteRenderProviderProps>
> = (props) => {
    const { children } = props;

    const { user, loading: userLoading } = useSelector(selectUser);

    const value = useMemo(
        () => ({
            routes: getRouteBasedOnUserInformation(user),
            routeConfigs: getRouteConfigsBasedOnUserInformation(user),
        }),
        [user]
    );
    return (
        <RouteRenderContext.Provider value={value}>
            {children}
        </RouteRenderContext.Provider>
    );
};

interface RouteRenderConsumerProps {
    children: (value: RouteRenderContextState | null) => ReactNode;
}

export const RouteRenderConsumer: FC<RouteRenderConsumerProps> = ({
    children,
}) => {
    return (
        <RouteRenderContext.Consumer>
            {(context) => {
                if (context === undefined) {
                    throw new Error(
                        "RouteRenderConsumer must be used within a RouteRenderProvider"
                    );
                }
                return children(context);
            }}
        </RouteRenderContext.Consumer>
    );
};

/* Route Filter */
function getRouteConfigsBasedOnUserInformation(user?: AccountUser) {
    // if (!user) return [];

    return filterRoutes(
        cloneDeep(user ? routesConfig : gaurdlessRoutesConfig),
        user
    );
}
function getRouteBasedOnUserInformation(user?: AccountUser) {
    // if (!user) return [];

    return filterRoutes(cloneDeep(routesConfig), user, transformRoute).map(
        (route) => transformRoute(route)
    );
}

type RouteTransformer = (route: RouteConfig) => RouteObject;

const transformRoute: RouteTransformer = (route) => {
    const {
        title,
        pageHeader,
        // name,
        // path,
        bypassSearch,
        routes,
        keywords,
        authRequired,
        nonAuthRequired,
        bypassDisplay,
        guard,
        externalLink,
        icon,
        ...restObj
    } = route;

    const props: PageRenderData = {
        title,
        pageHeader,
        name: route.name,
        // path,
        bypassSearch,
        keywords,
        // routes,
        // authRequired,
        // nonAuthRequired,
        bypassDisplay,
        guard,
        externalLink,
        icon,
    };
    let WrapperComponent: ComponentType<
        PropsWithChildren<GaurdRouteProps>
    > | null = null;
    if (authRequired) {
        WrapperComponent = AuthRoute;
    }
    if (nonAuthRequired) {
        WrapperComponent = NonAuthRoute;
    }
    if (restObj.element) {
        restObj.element = (
            <PageRenderProvider pageRenderData={props}>
                {WrapperComponent ? (
                    <WrapperComponent route={route}>
                        {restObj.element}
                    </WrapperComponent>
                ) : (
                    restObj.element
                )}
            </PageRenderProvider>
        );
    }
    if (restObj.Component) {
        restObj.element = (
            <PageRenderProvider pageRenderData={props}>
                {WrapperComponent ? (
                    <WrapperComponent route={route}>
                        <restObj.Component />
                    </WrapperComponent>
                ) : (
                    <restObj.Component />
                )}
            </PageRenderProvider>
        );
        restObj.Component = undefined;
    }
    restObj.ErrorBoundary = ErrorBoundary;

    return {
        ...restObj,
    };
};

function mergeGuards(
    parentGuard?: RouteGuard,
    childGuard?: RouteGuard
): RouteGuard | undefined {
    if (parentGuard || childGuard) {
        return {
            allowedRoles: union(
                parentGuard?.allowedRoles,
                childGuard?.allowedRoles
            ),
            exceptRoles: union(
                parentGuard?.exceptRoles,
                childGuard?.exceptRoles
            ),
            allowedScopes: parentGuard?.allowedScopes
                ? childGuard?.allowedScopes
                    ? and(parentGuard?.allowedScopes, childGuard?.allowedScopes)
                    : parentGuard?.allowedScopes
                : childGuard?.allowedScopes,
        };
    }
    return undefined;
}

function percolateGuard(
    routes: RouteConfig[],
    parentGaurd?: RouteGuard
): RouteConfigWithChildren[] {
    return routes.map((item) => {
        const itemT: RouteConfigWithChildren = item;
        itemT.guard = mergeGuards(parentGaurd, itemT.guard);
        if (itemT.routes) {
            itemT.routes = percolateGuard(itemT.routes, itemT.guard);
        }
        return itemT;
    });
}

function filterRoutes(
    routes: RouteConfig[],
    user?: AccountUser,
    tR?: RouteTransformer
): RouteConfigWithChildren[] {
    // if (!user) { return []; }

    return routes
        .filter(({ guard, path }) => {
            if (!user) return true;
            return guard
                ? isUserRoleAllowed(guard, user.role) &&
                      isUserScopeAllowed(guard, user.scp)
                : true;
        })
        .map((item) => {
            const itemT: RouteConfigWithChildren = item;
            if (item.routes) {
                item.routes = filterRoutes(item.routes, user, tR);
                if (item.routes.length && tR) {
                    itemT.children = item.routes.map((route) => tR(route));
                }
            }
            return itemT;
        });
}

function prepareRoutes(
    routes: RouteConfig[],
    tR?: RouteTransformer
): RouteConfigWithChildren[] {
    // if (!user) { return []; }

    return routes.map((item) => {
        const itemT: RouteConfigWithChildren = item;
        if (item.routes) {
            item.routes = prepareRoutes(item.routes, tR);
            if (item.routes.length && tR) {
                itemT.children = item.routes.map((route) => tR(route));
            }
        }
        return itemT;
    });
}
