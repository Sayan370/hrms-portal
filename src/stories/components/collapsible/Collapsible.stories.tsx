import { ComponentType } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Collapsible, { CollapsibleBody, CollapsibleGroup, CollapsibleTitle, CollapsibleActions } from '@/components/collapsible';
import { AppButton } from '@/components/form';


const meta = {
    title: 'Components/Collapsible',
    component: CollapsibleGroup,
    subcomponents: {
        "Collapsible": Collapsible as ComponentType<unknown>
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'fullscreen',
    },
} satisfies Meta<typeof CollapsibleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const renderCollapse = (props: {
    numberOfTabs?: number;
    hasAction?: boolean;
}) => (args: Story["args"]) => {
    const {
        numberOfTabs = 10,
        hasAction
    } = props;
    return (
        <CollapsibleGroup {...args}>
            {
                Array.from({ length: numberOfTabs }, (_, index) => (
                    <Collapsible id={index} key={index}>
                        <CollapsibleTitle>
                            Collapse {index}
                        </CollapsibleTitle>
                        <CollapsibleBody>
                            Collapse {index} Body
                        </CollapsibleBody>
                        {
                            hasAction && (
                                <CollapsibleActions>
                                    <AppButton>
                                        Button
                                    </AppButton>
                                </CollapsibleActions>
                            )
                        }
                    </Collapsible>
                ))
            }
        </CollapsibleGroup>
    )
}

export const SingleCollapse: Story = {
    args: {
        expandType: "single"
    }, render: renderCollapse({ numberOfTabs: 5 })
};

export const MultipleCollapse: Story = {
    args: {
        expandType: "multiple"
    }, render: renderCollapse({ numberOfTabs: 5 })
};

export const SingleCollapseWithDefaultExpState: Story = {
    args: {
        expandType: "single",
        defaultExpState: 3
    }, render: renderCollapse({ numberOfTabs: 5 })
};

export const MultipleCollapseWithDefaultExpState: Story = {
    args: {
        expandType: "multiple",
        defaultExpState: [1, 3]
    }, render: renderCollapse({ numberOfTabs: 5 })
};

export const CollapseWithAction: Story = {
    args: {
        expandType: "single"
    }, render: renderCollapse({ numberOfTabs: 1, hasAction: true })
};