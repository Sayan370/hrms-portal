import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
import AppCheckbox from "@/components/form/inputElements/app-checkbox";
import AppCheckboxGroup from "@/components/form/inputElements/app-checkbox-group";
import { ChangeEvent } from "react";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: "Components/Form/AppCheckboxGroup",
    component: AppCheckboxGroup,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: "centered",
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ["autodocs"],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        label: { type: "string" },
        helperText: { type: "string" },
        name: { type: "string" },
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
} satisfies Meta<typeof AppCheckboxGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const renderCheckboxGroup = (props: { numberOfCheckbox?: number }) => {
    const { numberOfCheckbox = 5 } = props;
    return (
        Array.from({ length: numberOfCheckbox }, (_, index) => (
            <AppCheckbox
                key={index}
                label={`Check ${index}`}
                value={index}
            />
        ))
    )
}


// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const MultipleValueCheckboxGroup: Story = {
    argTypes: {
        multiple: { type: "boolean", default: true },
    },
    args: {
        children: renderCheckboxGroup({}),
        checked: {
            0: true
        },
        multiple: true,
        label: "Checkbox Group"
    },
    decorators: [
        function Component(Story, ctx) {
            const [, setArgs] = useArgs<typeof ctx.args>();

            const onChange = (evt: ChangeEvent<HTMLInputElement | {}>, checked?: Record<number, boolean>) => {
                ctx.args.onChange?.(evt, checked);

                if (ctx.args.checked !== undefined) {
                    setArgs({ checked: { ...ctx.args.checked, ...checked } });
                }
            };

            return <Story args={{ ...ctx.args, onChange }} />;
        },
    ],
};
export const SingleValueCheckboxGroup: Story = {
    argTypes: {
        multiple: { type: "boolean", default: false },
    },
    args: {
        children: renderCheckboxGroup({}),
        checked: {
            0: true
        },
        label: "Checkbox Group"
    },
    decorators: [
        function Component(Story, ctx) {
            const [, setArgs] = useArgs<typeof ctx.args>();

            const onChange = (evt: ChangeEvent<HTMLInputElement | {}>, checked?: Record<number, boolean>) => {
                ctx.args.onChange?.(evt, checked);

                if (ctx.args.checked !== undefined) {
                    setArgs({ checked });
                }
            };

            return <Story args={{ ...ctx.args, onChange }} />;
        },
    ],
};