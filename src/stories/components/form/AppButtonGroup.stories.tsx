import type { Meta, StoryObj } from "@storybook/react";
import { ArrowBack, ArrowDropDown, Download } from "@mui/icons-material";
import AppButtonGroup from "@/components/form/inputElements/app-button-group";
import { AppButton } from "@/components/form";
import Popup, { PopupAnchor } from "@/components/popup";
import { List, ListItem, ListItemButton } from "@mui/material";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: "Components/Form/AppButtonGroup",
    component: AppButtonGroup,
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
                "success",
                "error",
                "info",
                "warning",
            ],
        },
        variant: {
            control: { type: "select" },
            options: ["contained", "outlined", "text"],
        },
        size: {
            control: { type: "select" },
            options: ["small", "medium", "large"],
        },
        orientation: {
            control: { type: "select" },
            options: ["horizontal", "vertical"],
        },
        disabled: { type: "boolean", default: false }
    },
} satisfies Meta<typeof AppButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const renderButtonGroup = (props: {
    icon?: boolean;
    popup?: boolean;
    variant?: "text" | "outlined" | "contained";
    size?: "small" | "medium" | "large";
}) => (args: Story["args"]) => {
    const { icon, popup, variant, size } = props;
    return (
        <AppButtonGroup variant={variant} size={size} {...args}>
            <AppButton>Button 1</AppButton>
            {
                !icon && (
                    <AppButton>Button 2</AppButton>
                )
            }
            {
                icon && (
                    <AppButton>
                        <Download />
                    </AppButton>
                )
            }
            {
                popup && (
                    <Popup>
                        <PopupAnchor>
                            <AppButton>
                                <ArrowDropDown />
                            </AppButton>
                        </PopupAnchor>
                        <List disablePadding>
                            <ListItem disablePadding><ListItemButton>Action 1</ListItemButton></ListItem>
                            <ListItem disablePadding><ListItemButton>Action 2</ListItemButton></ListItem>
                        </List>
                    </Popup>
                )
            }
        </AppButtonGroup>
    )
}

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const ButtonGroup: Story = {
    render: renderButtonGroup({})
};
export const ButtonGroupWithIcon: Story = {
    render: renderButtonGroup({ icon: true })
};
export const ButtonGroupWithPopup: Story = {
    render: renderButtonGroup({ popup: true })
};