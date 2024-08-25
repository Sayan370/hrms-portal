import type { Meta, StoryObj } from "@storybook/react";
import AppSwitch from "@/components/form/inputElements/app-switch";
import AppCheckboxGroup from "@/components/form/inputElements/app-checkbox-group";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: "Components/Form/AppSwitch",
    component: AppSwitch,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: "centered",
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ["autodocs"],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        label: { type: "string" },
        value: { type: "string" },
        name: { type: "string" },
        color: {
            control: { type: "radio" },
            options: [
                "primary", "secondary", "success", "error", "info", "warning"
            ],
        },
        size: {
            control: { type: "select" },
            options: ["small", "medium"],
        },
        labelPlacement: {
            control: { type: "select" },
            options: ["top", "bottom", "end", "start"],
        },
        readOnly: { type: "boolean", default: false },
        disabled: { type: "boolean", default: false },
        required: { type: "boolean", default: false },
        onChange: { action: 'change' },
    },
} satisfies Meta<typeof AppSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

const renderCheckboxGroup = (props: { numberOfSwitch?: number }) => (args: Story["args"]) => {
    const { numberOfSwitch = 5 } = props;
    return (
        <AppCheckboxGroup label="Switch Group" orientation="vertical" color={args?.color}>
            {
                Array.from({ length: numberOfSwitch }, (_, index) => (
                    <AppSwitch
                        key={index}
                        label={`Switch ${index}`}
                        value={index}
                        {...args}
                    />
                ))
            }
        </AppCheckboxGroup>
    )
}


// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
    args: {
        color: "primary",
        label: "Primary Radio",
    },
};
export const GroupedSwitch: Story = {
    args: {
        color: "primary",
    },
    render: renderCheckboxGroup({}),
};