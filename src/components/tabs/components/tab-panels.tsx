import { Children, PropsWithChildren, ReactElement, cloneElement, isValidElement, useMemo } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { Orientation } from "@/models/types";
import { SelectionDataType, useTabDataContext } from "../contexts/TabDataContext";

interface TabPanelsProps {
    orientation?: Orientation;
    className?: string;
}

const TabPanels = (props: PropsWithChildren<TabPanelsProps>) => {
    const { children, orientation, className } = props;
    const { valueMapping, selectedTab } = useTabDataContext();
    const orientationClassName = useMemo(() => {
        let className = "";
        switch (orientation) {
            case "horizontal":
                className = "flex-row min-h-0";
                break;
            case "vertical":
                className = "flex-col min-h-full";
                break;
            default:
                break;
        }
        return className;
    }, [orientation]);

    const animate = useMemo(() => {
        let anim;
        switch (orientation) {
            case "horizontal":
                anim = { x: `${(valueMapping[selectedTab] || 0) * -100}%` };
                break;
            case "vertical":
                anim = { y: `${(valueMapping[selectedTab] || 0) * -100}%` };
                break;
            default:
                break;
        }
        return anim;
    }, [orientation, valueMapping, selectedTab]);

    return (
        <motion.div
            className={clsx("flex flex-1 will-change-transform", orientationClassName, className)}
            transition={{
                tension: 190,
                friction: 70,
                mass: 0.4
            }}
            initial
            // dir="ltr"
            animate={valueMapping[selectedTab] !== undefined ? animate : undefined}
        >
            {Children.map(children, (child, i) => {
                if (!isValidElement(child)) return null;

                const item = child as ReactElement<PropsWithChildren>;

                if (item.type === TabPanel) {
                    // return cloneElement(item, {
                    //     ...item.props,
                    //     ...{ index: i },
                    // });
                    return cloneElement(item);
                }
                return null;
            })}
        </motion.div>
    );
}

interface TabProps<T extends SelectionDataType> {
    value: T;
    className?: string;
}

const TabPanel = <T extends SelectionDataType>(props: PropsWithChildren<TabProps<T>>) => {
    const { children, className, value: tabValue, ...restProps } = props;
    const { selectedTab } = useTabDataContext();
    return (
        <motion.div
            className={clsx("flex flex-col self-stretch justify-start shrink-0 h-full w-full overflow-x-hidden overflow-y-auto", className)}
            role="tabpanel"
            aria-hidden={selectedTab !== tabValue}
            id={`simple-tabpanel-${tabValue}`}
            aria-labelledby={`simple-tab-${tabValue}`}
            {...restProps}
        >
            {selectedTab === tabValue && children}
        </motion.div>
    );
}

export { TabPanels, TabPanel };