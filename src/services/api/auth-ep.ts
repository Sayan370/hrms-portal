import { HttpStatusCode } from "axios";

import { ResetPassData } from "@/models/login-credential";
import { getErrorString } from "@/utils/object-utils";

import httpService from "../http-service";

export const forgotPassword = async (email: string) => {
    try {
        const uriEncoded = email ? encodeURIComponent(email) : "";
        const response = await httpService.get(
            `/auth/password/reset/${uriEncoded}`
        );
        if (response.status === HttpStatusCode.NoContent) {
            return "Your password has been reset! Check your mail for setting new password.";
        }
        throw new Error(getErrorString(response), {
            cause: "Server Notified!",
        });
    } catch (error: any) {
        throw new Error(
            getErrorString(
                error?.response?.data || error?.response?.statusText
            ),
            {
                cause: error,
            }
        );
    }
};

export const resetPassword = async (
    params: Omit<ResetPassData, "oldPassword">
) => {
    try {
        const response = await httpService.put(`/auth/password/set`, params);
        if (response.status === HttpStatusCode.NoContent) {
            return "Your password has been reset!";
        }
        throw new Error(getErrorString(response), {
            cause: "Server Notified!",
        });
    } catch (error: any) {
        throw new Error(
            getErrorString(
                error?.response?.data || error?.response?.statusText
            ),
            {
                cause: error,
            }
        );
    }
};

export const changePassword = async (
    params: Omit<ResetPassData, "requestHash">
) => {
    try {
        const response = await httpService.put(`/auth/password/change`, params);
        if (response.status === HttpStatusCode.NoContent) {
            return "Your password has been reset!";
        }
        throw new Error(getErrorString(response), {
            cause: "Server Notified!",
        });
    } catch (error: any) {
        throw new Error(
            getErrorString(
                error?.response?.data || error?.response?.statusText
            ),
            {
                cause: error,
            }
        );
    }
};
