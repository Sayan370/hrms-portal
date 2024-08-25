import { ComponentType } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import clsx from "clsx";

import Carousel, { CarouselItem } from "@/components/carousel";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: "Components/Carousel",
    component: Carousel,
    subcomponents: {
        CarouselItem: CarouselItem as ComponentType<unknown>,
    },
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: "centered",
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ["autodocs"],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        // spaceBetween: {
        //     control: { type: "number" },
        //     defaultValue: 10,
        // },
        // slidesPerView: {
        //     control: { type: "number" },
        //     defaultValue: 3,
        // },
        // navigation: {
        //     control: { type: "boolean" },
        //     defaultValue: true,
        // },
        scrollbarEnabled: {
            control: { type: "boolean" },
            defaultValue: true,
        },
        paginationEnabled: {
            control: { type: "boolean" },
            defaultValue: true,
        },
        paginationClickable: {
            control: { type: "boolean" },
            defaultValue: true,
        },
        pageTextIndicatorEnabled: {
            control: { type: "boolean" },
            defaultValue: true,
        },
        showFirstButton: {
            control: { type: "boolean" },
            defaultValue: true,
        },
        showLastButton: {
            control: { type: "boolean" },
            defaultValue: true,
        },
    },
    // args: {
    //     scrollbarEnabled: true,
    //     paginationEnabled: true,
    // },
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

const renderCarousel =
    (props: { numberOfItems?: number; showVisible?: boolean }) =>
    (args: Story["args"]) => {
        const { numberOfItems = 10, showVisible } = props;
        return (
            <div className="h-96 w-96">
                <Carousel {...args}>
                    {Array.from({ length: numberOfItems }, (_, index) => (
                        <CarouselItem gutter={4} className="w-48" key={index}>
                            {({ isActive, isVisible }) => (
                                <div
                                    className={clsx(
                                        "flex h-60 w-full items-center justify-center rounded-md bg-slate-300",
                                        (showVisible ? isVisible : isActive) &&
                                            "!bg-blue-700 !text-slate-50"
                                    )}>
                                    Slide {index}
                                </div>
                            )}
                        </CarouselItem>
                    ))}
                </Carousel>
            </div>
        );
    };

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const BasicCarouselShowActive: Story = {
    args: {
        // slidesPerView: 2,
        // spaceBetween: 10,
        // navigation: true,
        scrollbarEnabled: true,
        paginationEnabled: true,
        paginationClickable: true,
    },
    render: renderCarousel({ numberOfItems: 6 }),
};
export const BasicCarouselShowVisible: Story = {
    args: {
        // slidesPerView: 2,
        // spaceBetween: 10,
        // navigation: true,
        scrollbarEnabled: true,
        paginationEnabled: true,
        paginationClickable: true,
    },
    render: renderCarousel({ numberOfItems: 6, showVisible: true }),
};
