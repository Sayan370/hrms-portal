import { FeatureFlags } from "@/models/feature-flags";

const envMode = import.meta.env.VITE_VERCEL_ENV || import.meta.env.MODE;

const featureFlags: Record<FeatureFlags, boolean> = {
    DARK_MODE: true,
    COLOR_MODE_DETECTOR: envMode !== "production",
    NOTIFICATIONS: envMode !== "production",
};

export const config = {
    toast: {
        defaultToastContainerId: "default-container",
        loaderToastContainerId: "loader-container",
    },
    env: {
        APP_TITLE: import.meta.env.VITE_APP_TITLE,
        LOG_API_KEY: import.meta.env.VITE_LOG_API_KEY,
        LOG_URL: import.meta.env.VITE_LOG_URL,
        MODE: envMode,
        API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
        BASE_URL: import.meta.env.BASE_URL,
        APP_DOMAIN_URL: import.meta.env.VITE_APP_DOMAIN_URL,
    },
    featureFlags,
};
