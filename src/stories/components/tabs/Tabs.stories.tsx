import { ComponentType } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@/components/tabs';
import { LocalMovies } from '@mui/icons-material';
import { XYPosition } from '@/models/types';


const meta = {
    title: 'Components/Tabs',
    component: TabGroup,
    subcomponents: {
        "TabList": TabList as ComponentType<unknown>,
        "TabPanels": TabPanels as ComponentType<unknown>
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'fullscreen',
    },
    argTypes: {
        orientation: {
            control: { type: "select" },
            options: ["horizontal", "vertical"],
            defaultValue: "horizontal"
        },
    }
} satisfies Meta<typeof TabGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const renderTabs = (props: {
    numberOfTabs?: number;
    tabVariant?: "standard" | "scrollable" | "fullWidth",
    enableIcons?: boolean,
    iconPosition?: XYPosition;
    disableTab?: boolean,
    wrappedTabText?: boolean;
    centered?: boolean
}) => (args: Story["args"]) => {
    const {
        numberOfTabs = 10,
        tabVariant,
        enableIcons,
        iconPosition,
        disableTab,
        wrappedTabText,
        centered
    } = props;
    return (
        <TabGroup {...args}>
            <TabList scrollButtons variant={tabVariant} centered={centered}>
                {
                    Array.from({ length: numberOfTabs }, (_, index) => (
                        <Tab
                            label={`${wrappedTabText ? "Long text for showcasing wrapped tabs system for better readability Tab" : "Tab"} ${index}`}
                            value={index} key={index}
                            icon={enableIcons ? <LocalMovies /> : undefined}
                            iconPosition={iconPosition}
                            disabled={disableTab}
                            wrapped={wrappedTabText}
                        />
                    ))
                }
            </TabList>
            <TabPanels>
                {
                    Array.from({ length: numberOfTabs }, (_, index) => (
                        <TabPanel value={index} key={index}>
                            Tab {index}
                        </TabPanel>
                    ))
                }
            </TabPanels>
        </TabGroup>
    )
}

export const StandardTabs: Story = {
    args: {
        orientation: "horizontal",
        defaultValue: 0
    }, render: renderTabs({ numberOfTabs: 5, tabVariant: "standard" })
};

export const StandardCenteredTabs: Story = {
    args: {
        orientation: "horizontal",
        defaultValue: 0
    }, render: renderTabs({ numberOfTabs: 5, tabVariant: "standard", centered: true })
};

export const ScrollableTabs: Story = {
    args: {
        orientation: "horizontal",
        defaultValue: 0
    }, render: renderTabs({ tabVariant: "scrollable", numberOfTabs: 20 })
};

export const FullwidthTabs: Story = {
    args: {
        orientation: "horizontal",
        defaultValue: 0
    }, render: renderTabs({ tabVariant: "fullWidth", numberOfTabs: 5 })
};
export const VerticalTabs: Story = {
    args: {
        orientation: "vertical",
        defaultValue: 0
    }, render: renderTabs({ tabVariant: "scrollable", numberOfTabs: 20 })
};

export const DisabledTabs: Story = {
    args: {
        orientation: "horizontal",
        defaultValue: 0
    }, render: renderTabs({ numberOfTabs: 5, disableTab: true })
};
export const WrappedTextTabs: Story = {
    args: {
        orientation: "horizontal",
        defaultValue: 0
    }, render: renderTabs({ numberOfTabs: 5, wrappedTabText: true })
};

export const TabsWithIconPositionTop: Story = {
    args: {
        orientation: "horizontal",
        defaultValue: 0
    }, render: renderTabs({ tabVariant: "fullWidth", numberOfTabs: 5, enableIcons: true, iconPosition: "top" })
};
export const TabsWithIconPositionStart: Story = {
    args: {
        orientation: "horizontal",
        defaultValue: 0
    }, render: renderTabs({ tabVariant: "fullWidth", numberOfTabs: 5, enableIcons: true, iconPosition: "start" })
};
