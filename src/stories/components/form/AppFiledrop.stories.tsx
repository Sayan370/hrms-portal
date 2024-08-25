import type { Meta, StoryObj } from "@storybook/react";

import AppFiledrop from "@/components/form/inputElements/app-filedrop";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: "Components/Form/AppFiledrop",
    component: AppFiledrop,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: "centered",
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ["autodocs"],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        preview: { type: "boolean", defaultValue: true },
        disabled: { type: "boolean", defaultValue: false },
        clearable: { type: "boolean", defaultValue: true },
        maxFiles: { type: "number", defaultValue: 2 },
        minSize: { type: "number", defaultValue: undefined },
        maxSize: { type: "number", defaultValue: undefined },
        multiple: { type: "boolean", defaultValue: true },
        append: { type: "boolean", defaultValue: false },
        errorMessage: { type: "string", defaultValue: undefined },
        helperText: { type: "string", defaultValue: undefined },
        title: { type: "string", defaultValue: undefined },
        description: { type: "string", defaultValue: undefined },
        onChange: { action: "change" },
    },
} satisfies Meta<typeof AppFiledrop>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Single: Story = {
    args: {
        multiple: false,
        append: true,
        preview: true,
    },
    argTypes: {},
};
export const Multiple: Story = {
    args: {
        multiple: true,
        preview: true,
        maxFiles: 10,
        clearable: true,
        accept: {
            "image/jpeg": [],
            "image/png": [],
        },
    },
    argTypes: {},
};
export const AppendMultiple: Story = {
    args: {
        multiple: true,
        append: true,
        preview: true,
        maxFiles: 10,
        clearable: true,
        accept: {
            "image/jpeg": [],
            "image/png": [],
        },
    },
    argTypes: {},
};
