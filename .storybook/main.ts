import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
    stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-onboarding",
        "@storybook/addon-interactions",
        {
            name: "@storybook/addon-styling",
            options: {},
        },
    ],
    framework: {
        name: "@storybook/react-vite",
        options: {},
    },
    staticDirs: ["../public"],
    docs: {
        autodocs: "tag",
    },
    typescript: {
        check: false,
        // checkOptions: {},
        reactDocgen: "react-docgen-typescript",
        reactDocgenTypescriptOptions: {
            compilerOptions: {
                // speeds up storybook build time
                allowSyntheticDefaultImports: false,
                // speeds up storybook build time
                esModuleInterop: false,
            },
            // makes union prop types like variant and size appear as select controls
            shouldExtractLiteralValuesFromEnum: true,
            // makes string and boolean types that can be undefined appear as inputs and switches
            shouldRemoveUndefinedFromOptional: true,
            // Filter out third-party props from node_modules except @mui packages
            propFilter: (prop) =>
                prop.parent
                    ? !/node_modules\/(?!@mui)/.test(prop.parent.fileName)
                    : true,
        },
    },
};
export default config;
