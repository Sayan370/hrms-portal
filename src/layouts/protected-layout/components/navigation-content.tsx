import { FC } from "react";

import { RouteConfig } from "@/models/route-config";

import SingleNavigationItem from "./single-navigation-item";

export interface NavigationContentProps {
    routes: RouteConfig[];
    basePath: string;
}

const NavigationContent: FC<NavigationContentProps> = ({
    routes,
    basePath,
}) => {
    // const { routes } = useRouteRenderContext();

    const filterRoutes = (routes: RouteConfig[]) =>
        routes.filter((route) => !route.bypassDisplay);

    return (
        <div className="navigation-content flex grow flex-col">
            {filterRoutes(routes).map((route) => (
                <div
                    key={route.path}
                    className="navigation-item-group flex flex-col">
                    <div className="navigation-items">
                        <SingleNavigationItem
                            navItem={route}
                            basePath={basePath}
                            l1Route
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NavigationContent;
