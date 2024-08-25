import { SetStateAction, useCallback, useEffect, useState } from "react";

import { ColorMode } from "@/models/types";
import { cookieConstants } from "@/constants/cookie-constants";
import { getCookie } from "@/utils/cookie-utils";
import { useColorModeContext } from "@/contexts/ColorModeContext";

interface ColorModeDetectorOptions {
    enabled?: boolean;
}

const useColorModeDetector = (
    { enabled }: ColorModeDetectorOptions = { enabled: false }
) => {
    const COLORMODE_CONSTANT = cookieConstants.colormode_key;
    const themeCookieData = getCookie(COLORMODE_CONSTANT);

    const getCurrentTheme = () =>
        window.matchMedia("(prefers-color-scheme: dark)").matches;
    const { colorMode, setColorMode: setCMode } = useColorModeContext();
    const [isDarkTheme, setIsDarkTheme] = useState(
        (!!themeCookieData && themeCookieData === "dark") || getCurrentTheme()
    );
    const setColorMode = useCallback(
        (state: SetStateAction<ColorMode>) => {
            if (enabled) setCMode(state);
        },
        [enabled]
    );
    const mqListener = useCallback(
        (e: MediaQueryListEvent) => {
            if (enabled) setIsDarkTheme(e.matches);
        },
        [enabled]
    );

    useEffect(() => {
        const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
        if (!themeCookieData) {
            darkThemeMq.addEventListener("change", mqListener);
        }
        return () => {
            if (!themeCookieData) {
                darkThemeMq.removeEventListener("change", mqListener);
            }
        };
    }, []);
    useEffect(() => {
        if (!themeCookieData) {
            if (colorMode && !(colorMode === "dark" && isDarkTheme)) {
                setColorMode(isDarkTheme ? "dark" : "light");
            }
        } else if (
            colorMode &&
            !(colorMode === "dark" && themeCookieData === "dark")
        ) {
            setColorMode(themeCookieData === "dark" ? "dark" : "light");
        }
    }, [isDarkTheme]);
    return isDarkTheme;
};

export default useColorModeDetector;
