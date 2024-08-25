/** @type {import('prettier').Config} */
module.exports = {
    endOfLine: "lf",
    semi: true,
    singleQuote: false,
    tabWidth: 4,
    trailingComma: "es5",
    jsxSingleQuote: false,
    bracketSameLine: true,
    importOrder: [
        "^(react/(.*)$)|^(react$)",
        "<THIRD_PARTY_MODULES>",
        "",
        "^@/models/(.*)$",
        "^types$",
        "^@/types/(.*)$",
        "^@/constants/(.*)$",
        "^@/utils/(.*)$",
        "^@/styles/(.*)$",
        "^@/layouts/(.*)$",
        "^@/contexts/(.*)$",
        "^@/hooks/(.*)$",
        "^@/components/(.*)$",
        "^@/stories/(.*)$",
        "",
        "^[./]",
    ],
    importOrderSeparation: false,
    importOrderSortSpecifiers: true,
    importOrderBuiltinModulesToTop: true,
    importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
    importOrderMergeDuplicateImports: true,
    importOrderCombineTypeAndValueImports: true,
    plugins: [
        "@ianvs/prettier-plugin-sort-imports",
        "prettier-plugin-tailwindcss",
    ],
};
