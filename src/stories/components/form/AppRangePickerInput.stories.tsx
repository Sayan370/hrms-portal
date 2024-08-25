import type { Meta, StoryObj } from '@storybook/react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AppRangePickerInput } from '@/components/form';
import { useArgs } from '@storybook/client-api';
import dayjs, { Dayjs } from 'dayjs';

const defaultDate = "2023-08-04";

const meta = {
    title: 'Components/Form/AppRangePickerInput',
    component: AppRangePickerInput,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
    },
    argTypes: {
        startDate: { control: "date", default: dayjs(defaultDate).startOf("month") },
        endDate: { control: "date", default: dayjs(defaultDate) },
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
        clearable: {
            control: { type: "boolean" },
            defaultValue: true,
        },
        rangeLock: {
            control: { type: "boolean" },
            defaultValue: false,
        },
        format: { type: "string" },
        readOnly: { type: "boolean", default: false },
        disabled: { type: "boolean", default: false },
        required: { type: "boolean", default: false },
        label: { type: "string" },
        helperText: { type: "string" },
        errorMessage: { type: "string" },
        onRangeChange: { action: 'change' },
    }
} satisfies Meta<typeof AppRangePickerInput>;

export default meta;
type Story = StoryObj<typeof meta>;

const renderRangePicker = (props: {
    buttonList?: Array<{
        label: string,
        key: string,
        comparer: (startDate: Dayjs | null, endDate: Dayjs | null,) => boolean,
        startdate?: Dayjs | null;
        endDate?: Dayjs | null;
    }>;
}) => (args: Story["args"]) => {
    const {
        buttonList = [],
    } = props;

    return (
        <AppRangePickerInput {...args} rangeButtons={buttonList}
            getButtonLabel={(start, end) => (
                ((start && end && dayjs(start).isValid() && dayjs(end).isValid()) ? (buttonList.find(r => r.comparer(start, end))?.label ?? `${dayjs(start).format("DD MMM, YYYY")} - ${dayjs(end).format("DD MMM, YYYY")}`) : null)
            )}
        />
    )
}

export const StandardRangePickerInput: Story = {
    args: {
        startDate: dayjs(defaultDate).startOf("month"),
        endDate: dayjs(defaultDate),
        type: "date",
        views: "d-m-y",
        openTo: "day",
        label: "Select a date range",
        buttonProps: { variant: "outlined", size: "small" }
    },
    render: renderRangePicker({
        buttonList: [
            {
                label: "Last 7 days",
                key: "-7d",
                comparer: (startDate, endDate) => (dayjs(defaultDate).subtract(1, "week").isSame(startDate, "date") && dayjs(defaultDate).isSame(endDate, "date")),
                startdate: dayjs(defaultDate).subtract(1, "week"),
                endDate: dayjs(defaultDate)
            },
            {
                label: "Current Month",
                key: "cm",
                comparer: (startDate, endDate) => (dayjs(defaultDate).startOf("month").isSame(startDate, "date") && dayjs(defaultDate).endOf("month").isSame(endDate, "date")),
                startdate: dayjs(defaultDate).startOf("month"),
                endDate: dayjs(defaultDate).endOf("month")
            },
            {
                label: "Last Month",
                key: "lm",
                comparer: (startDate, endDate) => (dayjs(defaultDate).subtract(1, "month").startOf("month").isSame(startDate, "date") && dayjs(defaultDate).subtract(1, "month").endOf("month").isSame(endDate, "date")),
                startdate: dayjs(defaultDate).subtract(1, "month").startOf("month"),
                endDate: dayjs(defaultDate).subtract(1, "month").endOf("month")
            },
            {
                label: "YTD",
                key: "ytd",
                comparer: (startDate, endDate) => (dayjs(defaultDate).startOf("year").isSame(startDate, "date") && dayjs(defaultDate).isSame(endDate, "date")),
                startdate: dayjs(defaultDate).startOf("year"),
                endDate: dayjs(defaultDate)
            },
            {
                label: "MTD",
                key: "mtd",
                comparer: (startDate, endDate) => (dayjs(defaultDate).startOf("month").isSame(startDate, "date") && dayjs(defaultDate).isSame(endDate, "date")),
                startdate: dayjs(defaultDate).startOf("month"),
                endDate: dayjs(defaultDate)
            },
        ]
    }),
    decorators: [
        (Story, context) => {
            const [{ startDate, endDate }, updateArgs] = useArgs();
            const onRangeChanged = (startDate: dayjs.Dayjs | null, endDate: dayjs.Dayjs | null) => {
                updateArgs({ startDate, endDate });
            }
            return <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Story args={{ ...context.args, onRangeChange: onRangeChanged, startDate, endDate }} />
            </LocalizationProvider>
        },
    ],
};
