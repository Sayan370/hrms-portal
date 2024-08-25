import * as seq from "seq-logging";

import { config } from "@/utils/app-config";

import { RemoteLogLevel } from "../../models/remote-log-level";

// let jwt: string | undefined;
const logger = new seq.Logger({
    serverUrl: config.env.LOG_URL,
    apiKey: config.env.LOG_API_KEY,
    onError: (evt) => {
        console.error(evt?.message);
    },
});

type Properties = Record<string, string | number | boolean | undefined | null>;

const getLevelString = (severity: RemoteLogLevel) => {
    switch (severity) {
        case RemoteLogLevel.Debug:
            return "Debug";
        case RemoteLogLevel.Info:
            return "Information";
        case RemoteLogLevel.Error:
            return "Error";
        case RemoteLogLevel.Warn:
            return "Warning";
        case RemoteLogLevel.Fatal:
            return "Fatal";
        default:
            return "Verbose";
    }
};

export const logRemoteServerMessage = (
    message: string,
    properties?: Properties,
    exception?: string,
    severity: RemoteLogLevel = RemoteLogLevel.Info
) => {
    try {
        const now = new Date();
        const dataLog = {
            messageTemplate: message,
            level: getLevelString(severity),
            timestamp: now,
            properties,
            exception,
        };
        if (typeof message === "string" && dataLog) {
            logger.emit(dataLog);
        }
    } catch (error) {
        console.log(`Error occurred while logging! Error: ${error}`);
    }
};

export const logMessage = (message: string, properties?: Properties) => {
    logRemoteServerMessage(message, properties);
};

export const logWarnMessage = (message: string, properties?: Properties) => {
    logRemoteServerMessage(message, properties, undefined, RemoteLogLevel.Warn);
};

export const logDebugMessage = (message: string, properties?: Properties) => {
    logRemoteServerMessage(
        message,
        properties,
        undefined,
        RemoteLogLevel.Debug
    );
};

export const logInfoMessage = (message: string, properties?: Properties) => {
    logRemoteServerMessage(message, properties, undefined, RemoteLogLevel.Info);
};

export const logErrorMessage = (
    message: string,
    properties?: Properties,
    exception?: string
) => {
    logRemoteServerMessage(
        message,
        properties,
        exception,
        RemoteLogLevel.Error
    );
};

export const close = () => {
    logger.close();
};

// export const injectAuthToken = (authToken: string) => {
//     jwt = authToken;
// };

// export const removeAuthToken = () => {
//     jwt = undefined;
// };
