import { CssBaseline, ThemeProvider } from "@mui/material";
import {
    withThemeByClassName,
    withThemeFromJSXProvider,
} from "@storybook/addon-styling";
import type { Preview } from "@storybook/react";

import theme from "../src/theme";
/* TODO: update import to your tailwind styles file. If you're using Angular, inject this through your angular.json config instead */
import "../dist/styles/global.css";
import '../src/styles/app.scss';

const lightTheme = theme("light");
const darkTheme = theme("dark");

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: "^on[A-Z].*" },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
    },

    decorators: [
        // Adds theme switching support.
        // NOTE: requires setting "darkMode" to "class" in your tailwind config
        withThemeByClassName({
            themes: {
                light: "light",
                dark: "dark",
            },
            defaultTheme: "light",
        }),
        withThemeFromJSXProvider({
            themes: {
                light: lightTheme,
                dark: darkTheme,
            },
            defaultTheme: "light",
            Provider: ThemeProvider,
            GlobalStyles: CssBaseline,
        }),
    ],
};

export default preview;
