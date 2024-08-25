import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";

import { AuthedRoutes } from "@/constants/route-constants";
import { getFullBrandLogo } from "@/utils/image-util";

export interface BrandLogoProps {
    minimal?: boolean;
    className?: string;
    classes?: {
        root?: string;
        container?: string;
    };
    isLink?: boolean;
    href?: string;
    fullLogoType?: "normal" | "white";
}

const BrandLogo: React.FC<BrandLogoProps> = ({
    minimal = false,
    className,
    isLink = true,
    href = AuthedRoutes.home,
    fullLogoType = "white",
    classes,
}) => {
    const content = !minimal ? (
        <div className={clsx("mx-auto my-0 h-16 w-36", classes?.container)}>
            <img
                alt="Brand Logo"
                className="h-full w-full"
                src={getFullBrandLogo(fullLogoType)}
            />
        </div>
    ) : (
        <div
            className={clsx(
                "relative mx-auto my-0 h-12 w-12",
                classes?.container
            )}>
            <img
                alt="Brand Logo"
                className="h-full w-full object-cover"
                src={getFullBrandLogo("icon")}
            />
        </div>
    );
    return (
        <div className={clsx("brand-logo", className, classes?.root)}>
            {isLink ? (
                <Link className="no-underline" to={href}>
                    {content}
                </Link>
            ) : (
                content
            )}
        </div>
    );
};

export default BrandLogo;
