import type { Meta, StoryObj } from "@storybook/react";
import InfoCard, { InfoCardActions } from "@/components/cards";
import { AppButton } from "@/components/form";
import { ComponentType } from "react";
import { Add, Clear, Update } from "@mui/icons-material";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: "Components/Cards",
    component: InfoCard,
    subcomponents: {
        "InfoCardActions": InfoCardActions as ComponentType<unknown>
    },
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: "centered",
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ["autodocs"],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        onMenuItemClick: { action: 'click' }
    },
} satisfies Meta<typeof InfoCard>;

export default meta;
type Story = StoryObj<typeof meta>;


const renderCard = (props: {
    hasAction?: boolean;
}) => (args: Story["args"]) => {
    const {
        hasAction
    } = props;
    return (
        <InfoCard {...args}>
            <p className="max-w-lg">
                Ea ipsum ullamcorper ex congue ipsum molestie accusam magna tempor iriure ipsum diam facer eirmod. Lorem sed amet.
                Labore veniam nulla lorem vulputate duo eu sit iriure sed. Ipsum erat at clita facer et sit et ipsum.
                Duo lorem liber no elitr nulla et amet rebum sadipscing clita ullamcorper. Gubergren elitr duo.
                Stet ipsum sit et doming invidunt sanctus. Takimata lorem at ad dolor duis et invidunt accusam et iusto gubergren iriure sit.
                Suscipit voluptua magna cum consectetuer sit dolores nonummy et et.
                Nonumy est id duo facer invidunt sed ad ut ex voluptua dolor duo vel invidunt ut sed.
                Ipsum no et amet tincidunt erat ea veniam dolore facilisis rebum et odio.
            </p>
            {hasAction && (
                <InfoCardActions>
                    <AppButton>Button</AppButton>
                </InfoCardActions>
            )}
        </InfoCard>
    )
}

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const InfoCardWithActions: Story = {
    args: {
        title: "Card with action",
    },
    render: renderCard({ hasAction: true })
};

export const InfoCardWithMenu: Story = {
    args: {
        title: "Card with menu",
        menu: [
            { title: "Add", icon: <Add />, value: "add" },
            { title: "Clear", icon: <Clear />, value: "clear" },
            { title: "Update", icon: <Update />, value: "update" },
        ]
    },
    render: renderCard({})
};