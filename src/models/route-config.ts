import { ReactElement } from "react";
import { IndexRouteObject, NonIndexRouteObject } from "react-router-dom";

import { RouteGuard } from "./route-guard";

interface RouteDetails {
    title?: string; // Browser title
    pageHeader?: string; // Header Title for the Page
    name: string;
    path: string;
    bypassSearch?: boolean;
    isLayout?: boolean;
    routes?: RouteConfig[];
    keywords?: string[]; // For searching purpose
    authRequired?: boolean;
    nonAuthRequired?: boolean;
    bypassDisplay?: boolean; // Prevent render in navigation list
    guard?: RouteGuard;
    externalLink?: boolean;
    icon?: string | ReactElement;
}

// type RouteConfig = RouteDetails & RouteObject;
type RouteConfigWithChildren = RouteDetails &
    (IndexRouteObject | NonIndexRouteObject);
type RouteConfig = Omit<RouteConfigWithChildren, "children">;

export type { RouteConfig, RouteConfigWithChildren };
