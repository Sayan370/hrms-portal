import jwtDecode from "jwt-decode";

import { AccessToken } from "@/models/access-token";
import { AccountUser } from "@/models/account-user";
import logger from "@/utils/log-utils";
import { redirectTo } from "@/utils/route-utils";
import appToast from "@/components/app-toast";

import httpService from "./http-service";
import { StorageService } from "./storage-service";

const storage = new StorageService("auth");

export function isAuthed(): boolean {
    return !!storage.get();
}

export async function initialize(): Promise<void> {
    try {
        const auth = storage.get();
        if (auth) {
            const token = auth.accessToken;
            httpService.injectAuthToken(token);
            try {
                const user = jwtDecode<AccountUser>(token);
                logger.setUsername(user.email);
                // setSentryLogUser({ email: user?.email, id: user?.sub_id, role: user?.role });
            } catch (err) {
                appToast.error("Couldn't fetch the access token");
                // logger.error(err);
            }
        } else {
            httpService.removeAuthToken();
        }
    } catch (err) {
        httpService.removeAuthToken();
    }
}

export function getCurrentUser(): AccountUser | undefined {
    try {
        const token = storage.get().accessToken;
        httpService.injectAuthToken(token);
        const user = jwtDecode<AccountUser>(token);
        return user;
    } catch (err) {
        appToast.error("Couldn't fetch the access token");
        // logger.error(err);
    }
    return undefined;
}

export async function onLoginSuccess(
    token: AccessToken,
    postLoginPath: string = "/"
): Promise<void> {
    if (token) {
        try {
            const user = jwtDecode<AccountUser>(token.accessToken);
            // Just to verify a valid token
            if (user) {
                httpService.injectAuthToken(token.accessToken);
                logger.setUsername(user.email);
                logger.info("{username}: Login successful!");
                storage.set(token);
                // setSentryLogUser({ email: user?.email, id: user?.sub_id, role: user?.role });
            }
            redirectTo(postLoginPath);
        } catch (err) {
            appToast.error("Couldn't fetch the access token");
            // logger.error(err);
        }
    }
}

export function logout() {
    storage.clear();
    httpService.removeAuthToken();
    logger.info("{username}: Logout successful!");
    logger.removeUser();
    redirectTo("/login");
}
