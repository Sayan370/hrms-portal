import * as authService from "@/services/auth-service";
import { StorageService } from "@/services/storage-service";
import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import dayjs from "dayjs";
import jwtDecode from "jwt-decode";
import { get } from "lodash";

import { AccessToken } from "@/models/access-token";
import { AccountUser } from "@/models/account-user";
import { HttpStatusCode } from "@/models/http-status-code";
import { LoginCredential } from "@/models/login-credential";
import { config } from "@/utils/app-config";
import { dispatchGet, dispatchPost } from "@/utils/http-utils";
import {
    buildGenericInitialState,
    handleError,
    selectGenericsOfActionType,
    updateStore,
} from "@/utils/store-utils";

import { AppStore } from "..";
import { GenericState, Meta } from "../types";

const storage = new StorageService("auth");
// Declarations
interface InitialState extends GenericState {
    authenticated: boolean;
    user?: AccountUser;
}

const initialState: InitialState = {
    authenticated: authService.isAuthed(),
    ...buildGenericInitialState([]),
};

// Slices
const { actions, reducer } = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        changeAuth: (state, action: PayloadAction<AccessToken | null>) => {
            const user = action.payload?.accessToken
                ? jwtDecode<AccountUser>(action.payload.accessToken)
                : undefined;
            return updateStore<typeof state>(state, action, {
                authenticated: !!action.payload,
                user,
            });
        },

        userVerified: {
            reducer(state, action: PayloadAction<AccountUser, string, Meta>) {
                return updateStore<typeof state>(state, action, {
                    user: get(action, "payload.email") ? action.payload : null,
                });
            },
            prepare(payload: AccountUser, meta: Meta) {
                // if (payload && payload.auth_token) delete payload.auth_token; // prevent the auth token from storing
                return { payload, meta };
            },
        },
    },
});

export default { reducer, actions };

// Action Creators

export const login =
    (credential: LoginCredential, postLoginPath: string = "/") =>
    async (dispatch: Dispatch) => {
        const type = actions.changeAuth.type;

        try {
            const response = await dispatchPost(
                dispatch,
                type,
                `auth/login`,
                credential
            );

            authService.onLoginSuccess(response.data, postLoginPath);
        } catch (err: any) {
            await handleError(dispatch, err, type);
        }
    };

export const verifyUser = () => async (dispatch: Dispatch) => {
    const type = actions.userVerified.type;
    try {
        const token = storage.get().accessToken;
        const user = jwtDecode<AccountUser>(token);
        if (dayjs().isAfter(dayjs.unix(user.exp)))
            throw new Error(`Token has Expired! Please relogin!`, {
                cause: { reason: "token_expired" },
            });

        const response = await dispatchGet(
            dispatch,
            type,
            "auth/validate",
            false
        );

        if (response.status === HttpStatusCode.OK) {
            // const user = authService.getCurrentUser();
            if (user) {
                return dispatch(
                    actions.userVerified(user, { status: "SUCCESS" })
                );
            }
        }
        dispatch(actions.changeAuth(null));
        authService.logout();
    } catch (error: any) {
        if (
            error.response?.status === HttpStatusCode.Unauthorized ||
            error.response?.status === HttpStatusCode.Forbidden ||
            error?.cause?.reason === "token_expired"
        ) {
            dispatch(actions.changeAuth(null));
            authService.logout();
        }
        await handleError(dispatch, error, type);
    }
    return Promise.resolve();
};

export const logout = () => async (dispatch: Dispatch) => {
    const type = actions.changeAuth.type;
    try {
        // const response = await dispatchGet(dispatch, type, 'auth/logout', false);

        // if (response.status === HttpStatusCode.OK) {
        //     dispatch(actions.changeAuth(null));
        //     authService.logout();
        // }
        dispatch(actions.changeAuth(null));
        authService.logout();
    } catch (error: any) {
        await handleError(dispatch, error, type);
    }
};

export const forceLogout =
    (dispatch: Dispatch, forced: boolean = false) =>
    (resp: AxiosResponse<any> | any) => {
        const response: AxiosResponse<any> = resp.response || resp;
        if (response.request) {
            const reqUrl = response.request.responseURL;
            if (!forced) {
                if (
                    (reqUrl.includes(
                        `${config.env.API_BASE_URL}/auth/validate`
                    ) ||
                        reqUrl.includes(
                            `${config.env.API_BASE_URL}/auth/logout`
                        )) &&
                    (response.status === HttpStatusCode.Forbidden ||
                        response.status === HttpStatusCode.Unauthorized)
                ) {
                    dispatch(actions.changeAuth(null));
                    authService.logout();
                }
            } else {
                dispatch(actions.changeAuth(null));
                authService.logout();
            }
        }
        return response;
    };

// Selectors

export const selectAuth = (state: AppStore) => ({
    isAuthed: state.authentication.authenticated,
    ...selectGenericsOfActionType<InitialState>(
        state.authentication,
        actions.changeAuth.type
    ),
});
export const selectUser = (state: AppStore) => ({
    user: state.authentication.user,
    ...selectGenericsOfActionType<InitialState>(
        state.authentication,
        actions.userVerified.type
    ),
});
export const selectRole = (state: AppStore) => state.authentication.user?.role;
