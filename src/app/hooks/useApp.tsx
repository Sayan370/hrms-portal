import { useEffect, useMemo, useState } from "react";
import * as authService from "@/services/auth-service";
import {
    selectAuth,
    selectUser,
    verifyUser,
} from "@/stores/modules/authentication";
import { selectUserSettings, setUserSettings } from "@/stores/modules/ui";
import theme from "@/theme";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";

import { UserSettings } from "@/models/user-settings";
import { AwaitedReturnType } from "@/models/utility-types";
import { cookieConstants } from "@/constants/cookie-constants";
import { getCookieV2, setCookie } from "@/utils/cookie-utils";
import { useColorModeContext } from "@/contexts/ColorModeContext";
import { useRouteRenderContext } from "@/contexts/RouteRenderContext";
import useColorModeDetector from "@/hooks/useColorModeDetector";
import useFeatureFlag from "@/hooks/useFeatureFlag";

export const useApp = () => {
    const { isAuthed } = useSelector(selectAuth);
    const { user, loading: userLoading } = useSelector(selectUser);
    const { userSettings } = useSelector(selectUserSettings);
    const dispatch = useDispatch<any>();
    const [isAppInitialized, setIsAppInitialized] = useState<boolean>(false);
    const { colorMode } = useColorModeContext();
    const colorModeDetectorEnabled = useFeatureFlag("COLOR_MODE_DETECTOR");

    useColorModeDetector({ enabled: colorModeDetectorEnabled });

    const { routes: getRoutes } = useRouteRenderContext();

    const matTheme = useMemo(() => theme(colorMode), [colorMode]);

    useEffect(() => {
        (async function asyncFunc() {
            if (isAuthed) {
                await authService.initialize().then(() => {
                    if (!isAppInitialized) setIsAppInitialized(true);
                });
                dispatch(verifyUser());
            }
        })();
    }, [dispatch, isAuthed]);

    useEffect(() => {
        const cookieData = getCookieV2(cookieConstants.usersettings_key);
        const userSettings = cookieData ? JSON.parse(cookieData) : undefined;
        if (userSettings)
            dispatch(setUserSettings(userSettings as UserSettings));
    }, [dispatch]);

    useEffect(() => {
        return () => {
            if (isAuthed) {
                setIsAppInitialized(false);
            }
        };
    }, [isAuthed]);

    return {
        getRoutes,
        userLoading,
        colorMode,
        matTheme,
        isNotificationEnabled: isAppInitialized && isAuthed,
    };
};
