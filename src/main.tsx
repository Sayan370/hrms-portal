import React from "react";
import { ErrorOutline } from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AxiosResponse } from "axios";
import { join } from "lodash";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Provider } from "react-redux";

import App from "./app";

import "./styles/index.scss";
import "./styles/global.css";
import "react-toastify/dist/ReactToastify.css";

import ErrorBoundary from "./components/error-boundary";
import uniLoader from "./components/uni-loader";
import { ColorModeProvider } from "./contexts/ColorModeContext";
import { FeatureFlagProvider } from "./contexts/FeatureFlagContext";
import { RouteRenderProvider } from "./contexts/RouteRenderContext";
import { worker } from "./mocks/api/browser";
import httpService from "./services/http-service";
import initStore from "./stores";
import { forceLogout } from "./stores/modules/authentication";
import { config } from "./utils/app-config";
import logger from "./utils/log-utils";
import queryClient from "./utils/query-utils";
import { getFullUrl } from "./utils/route-utils";

if (
    (config.env.MODE === "development" || config.env.MODE === "production") &&
    config.env.API_BASE_URL.startsWith("/")
) {
    worker.start({
        onUnhandledRequest(req, print) {
            if (
                !req.url.pathname.startsWith(
                    getFullUrl(config.env.API_BASE_URL)
                )
            ) {
                return;
            }

            print.warning();
        },
    });
}

logger.initialize();

// initSentry();

const store = initStore();

const { dispatch } = store;

httpService.insertResponseInterceptor(
    (response) => {
        return forceLogout(dispatch)(response);
    },
    (error) => {
        const response: AxiosResponse<any> = error.response;
        const reqUrl = response?.request?.responseURL || "";
        const tokenExpired = error?.response?.headers["token-expired"];
        if (
            reqUrl.includes(`${config.env.API_BASE_URL}/auth/validate`) ||
            reqUrl.includes(`${config.env.API_BASE_URL}/auth/logout`)
        ) {
            forceLogout(dispatch)(error);
        } else if (tokenExpired && tokenExpired === "true") {
            uniLoader.show(
                <div className="flex flex-row items-center justify-center">
                    <ErrorOutline className="mr-1" fontSize="small" />
                    Your Token Expired! Click to reload
                </div>,
                "error",
                undefined,
                () => {
                    forceLogout(dispatch, true)(error);
                }
            );
        } else {
            forceLogout(dispatch)(error);
        }
        return Promise.reject(error);
    }
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <ErrorBoundary>
            <FeatureFlagProvider featureFlagSet={config.featureFlags}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <ColorModeProvider colorMode="light">
                        <Provider store={store}>
                            <RouteRenderProvider>
                                <QueryClientProvider client={queryClient}>
                                    <ReactQueryDevtools
                                        initialIsOpen={false}
                                        toggleButtonProps={{
                                            className: "!w-6 !m-1",
                                        }}
                                    />
                                    <App />
                                </QueryClientProvider>
                            </RouteRenderProvider>
                        </Provider>
                    </ColorModeProvider>
                </LocalizationProvider>
            </FeatureFlagProvider>
        </ErrorBoundary>
    </React.StrictMode>
);
