import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

import { ColorMode } from "@/models/types";

import breakpoints from "./breakpoints";
import { components } from "./components";
import { darkPalette, lightPalette } from "./palette";
import { typography } from "./typography";

const theme = (colorMode: ColorMode) =>
    createTheme({
        typography,
        components,
        breakpoints,
        palette: colorMode === "light" ? lightPalette : darkPalette,
    });

export default theme;
