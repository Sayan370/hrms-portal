import type { Meta, StoryObj } from "@storybook/react";
import AppRadio from "@/components/form/inputElements/app-radio";
import AppRadioGroup from "@/components/form/inputElements/app-radio-group";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: "Components/Form/AppRadio",
    component: AppRadio,
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
} satisfies Meta<typeof AppRadio>;

export default meta;
type Story = StoryObj<typeof meta>;

const renderRadioGroup = (props: { numberOfRadio?: number }) => (args: Story["args"]) => {
    const { numberOfRadio = 5 } = props;
    return (
        <AppRadioGroup label="Radio Group" orientation="vertical" color={args?.color}>
            {
                Array.from({ length: numberOfRadio }, (_, index) => (
                    <AppRadio
                        key={index}
                        label={`Radio ${index}`}
                        value={index}
                        {...args}
                    />
                ))
            }
        </AppRadioGroup>


    )
}


// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
    args: {
        color: "primary",
        label: "Primary Radio",
    },
};
export const GroupedRadio: Story = {
    args: {
        color: "primary",
    },
    render: renderRadioGroup({}),
};