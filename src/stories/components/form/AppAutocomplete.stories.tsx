import type { Meta, StoryObj } from "@storybook/react";
import AppAutocomplete from "@/components/form/inputElements/app-autocomplete/autocomplete";

interface ListItem { label: string, value: string }
type ReturnType<T extends "object" | "string"> = T extends "object" ? ListItem : string

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: "Components/Form/AppAutocomplete",
    component: AppAutocomplete,
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
        // onBlur: { action: 'blur' },
    },
} satisfies Meta<typeof AppAutocomplete>;

export default meta;
type Story = StoryObj<typeof meta>;

const renderOptions = <T extends "object" | "string">(props: { numberOfOptions?: number, type?: T }): ReturnType<T>[] => {
    const { numberOfOptions = 10, type = "string" } = props;

    return Array.from({ length: numberOfOptions }, (_, index) => (
        type === "object" ?
            { label: (index % 2 === 0) ? `New Label ${index}` : `Label ${index}`, value: `value${index}` } as ReturnType<T> :
            `Label ${index}` as ReturnType<T>
    ))
}

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
    args: {
        color: "primary",
        label: "Primary Input",
        options: renderOptions({ numberOfOptions: 1000, type: "string" }),
    },
    argTypes: {
        options: { control: false },
    },
    decorators: [
        (Story) => (
            <div className="w-64">
                <Story />
            </div>
        ),
    ],
};
export const Multiple: Story = {
    args: {
        color: "primary",
        label: "Multiple Input",
        options: renderOptions({ numberOfOptions: 10, type: "string" }),
        multiple: true,
        limitTags: 2
    },
    decorators: [
        (Story) => (
            <div className="w-72">
                <Story />
            </div>
        ),
    ],
};
export const Group: Story = {
    args: {
        color: "primary",
        label: "Primary Group Input",
        options: renderOptions({ numberOfOptions: 10, type: "object" }).sort((a: ListItem, b: ListItem) => -b.label.split(" ")[0].localeCompare(a.label.split(" ")[0])),
        getOptionLabel: (option) => (option as ListItem).label,
        groupBy: (option) => (option as ListItem).label.split(" ")[0]
    },
    decorators: [
        (Story) => (
            <div className="w-64">
                <Story />
            </div>
        ),
    ],
};
export const Virtualized: Story = {
    args: {
        color: "primary",
        label: "Virtualized Group Input",
        options: renderOptions({ numberOfOptions: 10000, type: "object" }).sort((a: ListItem, b: ListItem) => -b.label.split(" ")[0].localeCompare(a.label.split(" ")[0])),
        getOptionLabel: (option) => (option as ListItem).label,
        // groupBy: (option) => (option as ListItem).label.split(" ")[0],
        virtualized: true
    },
    argTypes: {
        options: { control: false },
    },
    decorators: [
        (Story) => (
            <div className="w-64">
                <Story />
            </div>
        ),
    ],
};