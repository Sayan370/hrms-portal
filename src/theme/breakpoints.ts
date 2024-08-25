import { BreakpointsOptions } from "@mui/material";

import { themeConstants } from "@/constants/theme-constants";

declare module "@mui/material/styles" {
    interface BreakpointOverrides {
        xs: false; // removes the `xs` breakpoint
        sm: false;
        md: false;
        lg: false;
        xl: false;
        xxsp: true; // inserts the `xxsp` breakpoint
        xsp: true;
        p: true;
        tp: true;
        tl: true;
        sd: true;
        d: true;
        ld: true;
    }
}

const breakpoints: BreakpointsOptions = {
    values: themeConstants.breakpoints,
};

export default breakpoints;
