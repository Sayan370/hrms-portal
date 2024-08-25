import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";

import { UserSettings } from "@/models/user-settings";
import {
    buildGenericInitialState,
    handleError,
    selectGenericsOfActionType,
    updateStore,
} from "@/utils/store-utils";

import { AppStore } from "..";
import { GenericState } from "../types";

interface InitialState extends GenericState {
    isSideBarCollapsed?: boolean;
    hasUnreadNotification?: boolean;
    userSettings: UserSettings;
}

const initialState: InitialState = {
    isSideBarCollapsed: false,
    hasUnreadNotification: false,
    userSettings: {
        autoCollapseSidebarOnSmallerScreen: true,
    },
    // dateFilterData: {
    //     StartDateRange: dayjs().startOf('month').format('MM-DD-YYYY'),
    //     EndDateRange: dayjs().format('MM-DD-YYYY')
    // },
    ...buildGenericInitialState([]),
};

// Slices
const { actions, reducer } = createSlice({
    name: "ui",
    initialState,
    reducers: {
        setCollapseSidebarState: (state, action: PayloadAction<boolean>) => {
            return updateStore<typeof state>(state, action, {
                isSideBarCollapsed: action.payload,
            });
        },
        setHasUnreadNotificationState: (
            state,
            action: PayloadAction<boolean>
        ) => {
            return updateStore<typeof state>(state, action, {
                hasUnreadNotification: action.payload,
            });
        },
        setUserSettingsAutoCollapseSidebarState: (
            state,
            action: PayloadAction<boolean>
        ) => {
            return updateStore<typeof state>(state, action, {
                userSettings: {
                    ...state.userSettings,
                    autoCollapseSidebarOnSmallerScreen: action.payload,
                },
            });
        },
        setUserSettings: (state, action: PayloadAction<UserSettings>) => {
            return updateStore<typeof state>(state, action, {
                userSettings: action.payload,
            });
        },
    },
});

export default { reducer };
export const {
    setCollapseSidebarState,
    setUserSettingsAutoCollapseSidebarState,
    setUserSettings,
} = actions;

// Action Creators

// selectors
export const selectCollapseSideBar = ({ ui }: AppStore) => ({
    isSideBarCollapsed: ui.isSideBarCollapsed,
    ...selectGenericsOfActionType<InitialState>(
        ui,
        actions.setCollapseSidebarState.type
    ),
});
export const selectHasUnreadNotification = ({ ui }: AppStore) => ({
    hasUnreadNotification: ui.hasUnreadNotification,
    ...selectGenericsOfActionType<InitialState>(
        ui,
        actions.setHasUnreadNotificationState.type
    ),
});
export const selectUserSettings = ({ ui }: AppStore) => ({
    userSettings: ui.userSettings,
    ...selectGenericsOfActionType<InitialState>(
        ui,
        actions.setUserSettings.type
    ),
});
