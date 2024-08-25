import type { Meta, StoryObj } from "@storybook/react";
import { AppDatePicker } from "@/components/form";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DateProps, DateTimeProps, TimeProps } from "@/components/form/inputElements/app-datepicker";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: "Components/Form/AppDatePicker",
    component: AppDatePicker,
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
            ],
        },
        size: {
            control: { type: "select" },
            options: ["small", "medium"],
        },
        readOnly: { type: "boolean", default: false },
        disabled: { type: "boolean", default: false },
        required: { type: "boolean", default: false },
        showToolbar: { type: "boolean", default: false },
        helperText: { type: "string" },
        errorMessage: { type: "string" },
        format: { type: "string" },
        onChange: { action: 'change' }
    },
} satisfies Meta<typeof AppDatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultDate = "2023-08-04";

const renderDatePicker = () => (args: Story["args"]) => {
    return (
        <AppDatePicker value={dayjs(defaultDate)} onChange={() => { }} {...args} />
    )
}

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const DatePicker: Story = {
    args: {
        value: dayjs(defaultDate),
        openTo: "day",
        format: "YYYY-MM-DD",
        type: "date"
    },
    argTypes: {
        openTo: {
            control: { type: "select" },
            options: ["month", "year", "day"],
        },
        type: {
            control: { type: "select" },
            options: ["date"],
        },
        views: {
            control: { type: "select" },
            options: ["y", "m-y", "d-m-y"],
        }
    },
    render: renderDatePicker(),
    decorators: [
        (Story) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
                <Story />
            </LocalizationProvider>
        ),
    ],
};
export const DateTimePicker: Story = {
    args: {
        value: dayjs(defaultDate),
        openTo: "day",
        type: "datetime",
        format: "YYYY-MM-DD",
        views: "d-m-y"
    },
    argTypes: {
        openTo: {
            control: { type: "select" },
            options: ["month", "year", "day", "hours", "minutes", "seconds"],
        },
        type: {
            control: { type: "select" },
            options: ["datetime"],
        },
        views: {
            control: { type: "select" },
            options: ["y", "m-y", "d-m-y", "hh", "hh:mm", "hh:mm:ss"],
        },
        ampm: { type: "boolean", default: false },
    },
    render: renderDatePicker(),
    decorators: [
        (Story) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
                <Story />
            </LocalizationProvider>
        ),
    ],
};
export const TimePicker: Story = {
    args: {
        value: dayjs(defaultDate),
        openTo: "hours",
        type: "time",
        format: "YYYY-MM-DD",
        views: "hh:mm:ss"
    },
    argTypes: {
        openTo: {
            control: { type: "select" },
            options: ["hours", "minutes", "seconds"],
        },
        type: {
            control: { type: "select" },
            options: ["time"],
        },
        views: {
            control: { type: "select" },
            options: ["hh", "hh:mm", "hh:mm:ss"],
        },
        ampm: { type: "boolean", default: false },
    },
    render: renderDatePicker(),
    decorators: [
        (Story) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
                <Story />
            </LocalizationProvider>
        ),
    ],
};