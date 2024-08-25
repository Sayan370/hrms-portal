import { remoteLogger } from "@/workers";
import UAParser, { IResult } from "ua-parser-js";

import { config } from "./app-config";

type Properties = Record<string, string | number | boolean | undefined | null>;

const logger = (function (window: Window, document: Document, env: string) {
    const uaParser = new UAParser(window.navigator.userAgent);
    const isRemoteLoggingEnabled =
        !!(config.env.LOG_API_KEY && config.env.LOG_URL) &&
        env === "production";
    let username = "";

    const setUsername = (user: string) => {
        username = user;
    };
    const removeUser = () => {
        username = "";
    };

    const onError = (
        event: Event | string,
        source?: string,
        lineno?: number,
        colno?: number,
        error?: Error
    ) => {
        logger.error(
            "Unhandled Exception: {name} - {message}",
            {
                message: event.toString(),
                name: error?.name ?? "Unhandled Exception",
                source,
                lineno,
                colno,
            },
            error
        );
    };

    const initialize = () => {
        window.onerror = onError;
    };

    const getInterpolatedMessage = (message: string) => {
        return message;
    };

    const typeAwareStringify = (...optionalParams: any[]) => {
        let finalString = "";
        optionalParams.forEach((val, i) => {
            if (i !== 0 && val !== undefined) finalString += " ";
            if (typeof val === "string") finalString += val;
            if (typeof val === "boolean") finalString += val.toString();
            if (typeof val === "number") finalString += Number(val).toString();
            if (typeof val === "object") finalString += JSON.stringify(val);
        });
        return finalString;
    };

    const formatString = (message?: any, properties?: Properties) => {
        let finalString: string = message ?? "";
        Object.keys(properties || {}).forEach((key) => {
            finalString = finalString.replaceAll(
                new RegExp(`({${key}})`, "g"),
                typeAwareStringify(properties?.[key]) ?? "null"
            );
        });
        return finalString;
    };

    const getUserDetails = (data: IResult) => {
        return {
            os: typeAwareStringify(data?.os?.name, data?.os?.version),
            "os.name": data?.os?.name ?? "",
            browser: typeAwareStringify(
                data?.browser?.name,
                data?.browser?.version
            ),
            "browser.name": data?.browser?.name ?? "",
            "device.name": data?.device?.vendor ?? "",
            device: typeAwareStringify(
                data?.device?.vendor,
                data?.device?.model,
                data?.device?.type
            ),
        };
    };

    function log(
        message?: any,
        properties?: Properties,
        ...optionalParams: any[]
    ) {
        if (isRemoteLoggingEnabled) {
            remoteLogger?.logMessage(getInterpolatedMessage(message), {
                ...properties,
                username,
                url: window.location.href,
                ...getUserDetails(uaParser.getResult()),
            });
        } else {
            console.log(formatString(message, properties), ...optionalParams);
        }
    }
    function debug(
        message: string,
        properties?: Properties,
        forceConsole: boolean = false,
        ...optionalParams: any[]
    ) {
        if (isRemoteLoggingEnabled && !forceConsole) {
            remoteLogger?.logDebugMessage(getInterpolatedMessage(message), {
                ...properties,
                username,
                url: window.location.href,
                ...getUserDetails(uaParser.getResult()),
            });
        } else {
            console.debug(formatString(message, properties), ...optionalParams);
        }
    }
    function info(
        message: string,
        properties?: Properties,
        forceConsole: boolean = false,
        ...optionalParams: any[]
    ) {
        if (isRemoteLoggingEnabled && !forceConsole) {
            remoteLogger?.logInfoMessage(getInterpolatedMessage(message), {
                ...properties,
                username,
                url: window.location.href,
                ...getUserDetails(uaParser.getResult()),
            });
        } else {
            console.info(formatString(message, properties), ...optionalParams);
        }
    }
    function error(
        error: any,
        properties?: Properties,
        exception?: Error,
        forceConsole: boolean = false,
        ...optionalParams: any[]
    ) {
        if (isRemoteLoggingEnabled && !forceConsole) {
            // logSentryError(error);
            remoteLogger?.logErrorMessage(
                getInterpolatedMessage(error),
                {
                    ...properties,
                    username,
                    url: window.location.href,
                    ...getUserDetails(uaParser.getResult()),
                },
                exception?.stack
            );
        } else {
            console.error(formatString(error, properties), ...optionalParams);
        }
    }

    function stopRemoteLogger() {
        if (isRemoteLoggingEnabled) {
            remoteLogger?.close();
        }
    }
    return {
        log,
        debug,
        error,
        info,
        stopRemoteLogger,
        setUsername,
        removeUser,
        initialize,
    };
})(window, document, config.env.MODE);

export default logger;
