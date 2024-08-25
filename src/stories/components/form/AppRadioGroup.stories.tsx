import type { Meta, StoryObj } from "@storybook/react";
import AppRadio from "@/components/form/inputElements/app-radio";
import AppRadioGroup from "@/components/form/inputElements/app-radio-group";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: "Components/Form/AppRadioGroup",
    component: AppRadioGroup,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: "centered",
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ["autodocs"],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        label: { type: "string" },
        value: { type: "number" },
        helperText: { type: "string" },
        errorMessage: { type: "string" },
        color: {
            control: { type: "radio" },
            options: [
                "primary", "secondary", "success", "error", "info", "warning"
            ],
        },
        orientation: {
            control: { type: "select" },
            options: [
                "horizontal", "vertical"
            ],
        },
        // readOnly: { type: "boolean", default: false },
        disabled: { type: "boolean", default: false },
        required: { type: "boolean", default: false },
        onChange: { action: 'change' },
    },
} satisfies Meta<typeof AppRadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const renderRadioGroup = (props: { numberOfRadio?: number }) => {
    const { numberOfRadio = 5 } = props;
    return (
        Array.from({ length: numberOfRadio }, (_, index) => (
            <AppRadio
                key={index}
                label={`Radio ${index}`}
                value={index}
            />
        ))
    )
}


// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const RadioGroup: Story = {
    args: {
        children: renderRadioGroup({}),
        value: 2,
        label: "Radio Group"
    },
};