import { CssBaseline, ThemeProvider } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { config } from "@/utils/app-config";
import { ConfirmationProvider } from "@/contexts/ConfirmationContext";
import { Loading } from "@/components/loading";
import { NotificationProvider } from "@/components/notification";

import { useApp } from "./hooks/useApp";

import "@/styles/app.scss";

function App() {
    const {
        getRoutes,
        userLoading,
        colorMode,
        matTheme,
        isNotificationEnabled,
    } = useApp();

    const router = createBrowserRouter(getRoutes, {
        basename: config?.env?.BASE_URL || "/",
    });

    return (
        <>
            <ToastContainer
                position="bottom-right"
                containerId={config.toast.defaultToastContainerId}
                autoClose={3000}
                enableMultiContainer
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                theme={colorMode}
                draggable
                pauseOnHover
            />
            <ThemeProvider theme={matTheme}>
                <CssBaseline />
                <NotificationProvider shouldFetch={isNotificationEnabled}>
                    <ConfirmationProvider>
                        {userLoading ? (
                            <Loading grow color="secondary" />
                        ) : (
                            <RouterProvider router={router} />
                        )}
                    </ConfirmationProvider>
                </NotificationProvider>
            </ThemeProvider>
        </>
    );
}

export default App;
