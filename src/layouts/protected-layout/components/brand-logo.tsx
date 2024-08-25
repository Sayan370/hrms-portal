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
        <div className={clsx("mx-auto my-0 h-16 w-full flex items-center", classes?.container)}>
            {/* <img
                alt="Brand Logo"
                className="h-full w-full"
                src={getFullBrandLogo(fullLogoType)}
            /> */}
            <span className="text-2xl w-full justify-center items-center flex"> HRMS App</span>
        </div>
    ) : (
        <div
            className={clsx(
                "relative mx-auto my-0 h-12 w-full flex items-center",
                classes?.container
            )}>
            {/* <img
                alt="Brand Logo"
                className="h-full w-full object-cover"
                src={getFullBrandLogo("icon")}
            /> */}
            <span className="text-2xl w-full justify-center items-center flex"> HP </span>
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
