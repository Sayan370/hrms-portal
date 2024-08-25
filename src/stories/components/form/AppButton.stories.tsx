import type { Meta, StoryObj } from "@storybook/react";
import { ArrowBack } from "@mui/icons-material";
import AppButton from "@/components/form/inputElements/app-button";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: "Components/Form/AppButton",
    component: AppButton,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: "centered",
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ["autodocs"],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        color: {
            control: { type: "radio" },
            options: [
                "primary",
                "secondary",
                "success",
                "error",
                "info",
                "warning",
            ],
        },
        variant: {
            control: { type: "select" },
            options: ["contained", "outlined", "text", "icon"],
        },
        size: {
            control: { type: "select" },
            options: ["small", "medium", "large"],
        },
        disabled: { type: "boolean", default: false },
        rounded: { type: "boolean", default: false },
        onClick: { action: 'click' }
    },
} satisfies Meta<typeof AppButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
    args: {
        children: "Button",
        color: "primary"
    },
    argTypes: {
        variant: {
            control: { type: "select" },
            options: ["contained", "outlined", "text"],
        },
    }
};

export const Icon: Story = {
    args: {
        children: <ArrowBack />,
        variant: "icon",
        color: "primary"
    },
    argTypes: {
        children: { control: false },
        size: {
            control: { type: "select" },
            options: ["small", "medium"],
        },
        variant: {
            control: { type: "select" },
            options: ["icon"],
        },
        rounded: {
            control: false
        }
    }
};
