import { cookieConstants } from "@/constants/cookie-constants";
import { selectUserSettings, setUserSettingsAutoCollapseSidebarState } from "@/stores/modules/ui";
import { setCookie } from "@/utils/cookie-utils";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useSettingsForm = () => {
    const dispatch = useDispatch();
    const {
        userSettings
    } = useSelector(selectUserSettings);

    const toggleOnSidebarCollapseSwitch = (evt: React.ChangeEvent<{} | HTMLInputElement>, checked: boolean) => dispatch(setUserSettingsAutoCollapseSidebarState(checked))

    useEffect(() => {
        setCookie(cookieConstants.usersettings_key, JSON.stringify(userSettings), 28);
    }, [userSettings]);

    const formSchema = {
        autoCollapseSidebarOnSmallerScreen: {
            checked: userSettings.autoCollapseSidebarOnSmallerScreen,
            label: "Auto collapse sidebar on smaller screens"
        }
    }
    return { formSchema, toggleOnSidebarCollapseSwitch }
}

export default useSettingsForm;