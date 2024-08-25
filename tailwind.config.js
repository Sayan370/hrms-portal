import containerPlugin from "@tailwindcss/container-queries";
import plugin from "tailwindcss/plugin";
import colors from "tailwindcss/colors";

import { themeConstants } from "./src/constants/theme-constants";

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    // important: '#root',
    theme: {
        extend: {
            minWidth: {
                auto: "auto",
            },
            keyframes: {
                swing: {
                    "0%,100%": { transform: "rotate(15deg)" },
                    "50%": { transform: "rotate(-15deg)" },
                },
            },
            animation: {
                swing: "swing 1s infinite",
            },
            colors: {
                primary: colors.gray,
                secondary: colors.yellow,
            }
        },
        fontFamily: {
            "primary": ["Roboto", "Arial", "sans-serif"],
        },
        screens: Object.entries(themeConstants.breakpoints).reduce(
            (acc, [screen, size]) => ({ ...acc, [screen]: `${size}px` }),
            {}
        ),
    },
    corePlugins: {
        // Remove the Tailwind CSS preflight styles so it can use Material UI's preflight instead (CssBaseline).
        preflight: false,
    },
    plugins: [
        containerPlugin,
        plugin(function ({ addUtilities }) {
            addUtilities({
                ".all-unset": {
                    all: "unset",
                },
            });
        }),
    ],
};
