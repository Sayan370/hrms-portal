import { PaletteOptions } from "@mui/material";
import { blue, grey, red, yellow } from "@mui/material/colors";

export const lightPalette: PaletteOptions = {
    mode: "light",
    primary: {
        main: grey[800],
    },
    secondary: {
        main: yellow[800],
    },
    error: {
        main: red.A400,
    },
};

export const darkPalette: PaletteOptions = {
    mode: "dark",
    primary: {
        main: grey[200],
    },
    secondary: {
        main: yellow[800],
    },
    error: {
        main: red.A400,
    },
};
