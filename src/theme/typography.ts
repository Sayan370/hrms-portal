import { Palette } from "@mui/material";
import { TypographyOptions } from "@mui/material/styles/createTypography";

export const typography:
    | TypographyOptions
    | ((palette: Palette) => TypographyOptions) = {
    fontFamily: ["Roboto", "Arial", "sans-serif"].join(","),
};
