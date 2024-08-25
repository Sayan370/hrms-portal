import { ComponentType } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import StepIndicator from "@/components/step-indicator";

const meta = {
    title: "Components/StepIndicator",
    component: StepIndicator,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ["autodocs"],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: "centered",
    },
    argTypes: {},
} satisfies Meta<typeof StepIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

const renderStepIndicator = (props: {}) => (args: Story["args"]) => {
    return <StepIndicator {...args} />;
};

export const StepIndicatorWithMultipleSteps: Story = {
    args: {
        steps: [
            {
                label: "Step 1",
                status: "processing",
            },
            {
                label: "Step 2",
                status: "rejected",
            },
            {
                label: "Step 3",
                status: "approved",
            },
            {
                label: "Step 4",
                status: "processing",
            },
            {
                label: "Step 5",
                status: "pending",
            },
        ],
    },
    render: renderStepIndicator({}),
};
