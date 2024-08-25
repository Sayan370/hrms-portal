import type { Meta, StoryObj } from "@storybook/react";
import AppInput from "@/components/form/inputElements/app-input";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: "Components/Form/AppInput",
    component: AppInput,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: "centered",
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ["autodocs"],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        label: { type: "string" },
        color: {
            control: { type: "radio" },
            options: [
                "primary",
                "secondary",
            ],
        },
        size: {
            control: { type: "select" },
            options: ["small", "medium"],
        },
        loading: { type: "boolean", default: false },
        readOnly: { type: "boolean", default: false },
        disabled: { type: "boolean", default: false },
        required: { type: "boolean", default: false },
        helperText: { type: "string" },
        errorMessage: { type: "string" },
        onChange: { action: 'change' },
        onBlur: { action: 'blur' },
    },
} satisfies Meta<typeof AppInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
    args: {
        color: "primary",
        label: "Primary Input",
    },
};
export const Multiline: Story = {
    args: {
        label: "Multiline Input",
        multiline: true,
        rows: 5
    },
};
export const Mask: Story = {
    args: {
        label: "Mask Input",
        mask: "REF-9999",
        maskChar: "_"
    },
};