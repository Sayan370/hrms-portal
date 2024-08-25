import { RouteConfig } from "@/models/route-config";

export interface SideNavBarProps {
    onMobileClose: () => void;
    openMobileNav: boolean;
    routes: RouteConfig[];
    basePath: string;
}
