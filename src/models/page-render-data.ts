import { RouteConfig } from "./route-config";

export type PageRenderData = Pick<
    RouteConfig,
    | "title"
    | "pageHeader"
    | "name"
    | "bypassSearch"
    | "keywords"
    | "bypassDisplay"
    | "guard"
    | "externalLink"
    | "icon"
>;
