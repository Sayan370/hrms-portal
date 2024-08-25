import {
    Children,
    cloneElement,
    isValidElement,
    PropsWithChildren,
    ReactElement,
    useMemo,
} from "react";
import { Tabs } from "@mui/material";
import clsx from "clsx";

import { Orientation } from "@/models/types";

import {
    SelectionDataType,
    TabDataConsumer,
    TabDataProvider,
} from "../contexts/TabDataContext";
import { TabList } from "./tab-list";
import { TabPanels } from "./tab-panels";

interface TabGroupProps<T extends SelectionDataType> {
    defaultValue: T;
    value?: T;
    className?: string;
    orientation?: Orientation;
    onTabChange?: (selected: T) => void;
}

const TabGroup = <T extends SelectionDataType>(
    props: PropsWithChildren<TabGroupProps<T>>
) => {
    const {
        children,
        className,
        orientation = "horizontal",
        onTabChange,
        ...restProps
    } = props;
    const orientationClassName = useMemo(() => {
        let className = "";
        switch (orientation) {
            case "horizontal":
                className = "flex-col";
                break;
            case "vertical":
                className = "flex-row h-[calc(100vh-8.6rem)]";
                break;
            default:
                break;
        }
        return className;
    }, [orientation]);
    return (
        <TabDataProvider
            onTabChange={
                onTabChange as
                    | ((selected: SelectionDataType) => void)
                    | undefined
            }
            {...restProps}>
            <div
                className={clsx(
                    "flex w-full overflow-hidden",
                    orientationClassName,
                    className
                )}>
                {Children.map(children, (child) => {
                    if (!isValidElement(child)) return null;

                    const item = child as ReactElement<PropsWithChildren>;

                    if (item.type === TabList) {
                        return cloneElement(item, {
                            ...item.props,
                            ...{ orientation },
                        });
                    }
                    if (item.type === TabPanels) {
                        return cloneElement(item, {
                            ...item.props,
                            ...{ orientation },
                        });
                    }
                    return null;
                })}
            </div>
        </TabDataProvider>
    );
};

export default TabGroup;
