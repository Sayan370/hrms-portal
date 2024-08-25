import { forwardRef } from "react";
import { Components, Theme } from "@mui/material";
import { LinkProps } from "@mui/material/Link";
import {
    Link as RouterLink,
    LinkProps as RouterLinkProps,
} from "react-router-dom";

const LinkBehavior = forwardRef<
    HTMLAnchorElement,
    Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] }
>((props, ref) => {
    const { href, ...other } = props;
    // Map href (MUI) -> to (react-router)
    return (
        <RouterLink data-testid="custom-link" ref={ref} to={href} {...other} />
    );
});

export const components: Components<Omit<Theme, "components">> = {
    MuiLink: {
        defaultProps: {
            component: LinkBehavior,
        } as LinkProps,
    },
    MuiButtonBase: {
        defaultProps: {
            LinkComponent: LinkBehavior,
        },
    },
};
