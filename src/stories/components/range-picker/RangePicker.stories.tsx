import type { Meta, StoryObj } from '@storybook/react';
import RangePicker from '@/components/range-picker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useArgs } from '@storybook/client-api';
import dayjs, { Dayjs } from 'dayjs';

const defaultDate = "2023-08-04";

const meta = {
    title: 'Components/RangePicker',
    component: RangePicker,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
    },
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
        clearable: {
            control: { type: "boolean" },
            defaultValue: true,
        },
        rangeLock: {
            control: { type: "boolean" },
            defaultValue: false,
        },
        format: { type: "string" },
        startDate: { control: "date", default: dayjs(defaultDate).startOf("month") },
        endDate: { control: "date", default: dayjs(defaultDate) },
        onRangeChange: { action: 'change' },
    }
} satisfies Meta<typeof RangePicker>;

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
        <RangePicker {...args} classes={{ datepickerWrapper: "p-4 w-64" }} rangeButtons={buttonList} />
    )
}

export const StandardRangePicker: Story = {
    args: {
        startDate: dayjs(defaultDate).startOf("month"),
        endDate: dayjs(defaultDate),
        type: "date",
        views: "d-m-y",
        openTo: "day"
    },
    render: renderRangePicker({
        buttonList: [
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
