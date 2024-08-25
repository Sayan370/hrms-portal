import path from "path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import { comlink } from "vite-plugin-comlink";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        comlink(),
        nodePolyfills({
            // To add only specific polyfills, add them here. If no option is passed, adds all polyfills
            include: ["http", "https", "url", "buffer", "process"],
            // Whether to polyfill specific globals.
            globals: {
                Buffer: true, // can also be 'build', 'dev', or false
                global: true,
                process: true,
            },
            // Whether to polyfill `node:` protocol imports.
            protocolImports: true,
        }),
    ],
    //appType: "spa",
    worker: {
        plugins: [comlink()],
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    build: {
        rollupOptions: {
            moduleContext: {
                "./node_modules/pdfmake/build/vfs_fonts.js": "window",
            },
        },
    },
});
