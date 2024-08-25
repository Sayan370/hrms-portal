/// <reference types="vite/client" />
/// <reference types="vite-plugin-comlink/client" />

interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string;
    readonly VITE_API_BASE_URL: string;
    readonly VITE_LOG_API_KEY: string;
    readonly VITE_LOG_URL: string;
    readonly VITE_APP_DOMAIN_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
