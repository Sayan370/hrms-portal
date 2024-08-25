import { Tabs, Tab as MuiTab } from "@mui/material";
import { Children, PropsWithChildren, ReactElement, cloneElement, isValidElement, useEffect } from "react";
import { XYPosition, Orientation } from "@/models/types";
import { SelectionDataType, ValueMapping, useTabDataContext } from "../contexts/TabDataContext";

interface TabListProps {
    orientation?: Orientation;
    variant?: 'standard' | 'scrollable' | 'fullWidth';
    centered?: boolean;
    scrollButtons?: 'auto' | boolean;
    allowScrollButtonsMobile?: boolean;
    textColor?: 'secondary' | 'primary' | 'inherit';
    indicatorColor?: 'secondary' | 'primary';
}

const TabList = <T extends SelectionDataType>(props: PropsWithChildren<TabListProps>) => {
    const { children, ...restProps } = props;
    const { handleChange, selectedTab: value, setValueMapping } = useTabDataContext();
    useEffect(() => {
        if (Children.count(children) > 0) {
            const map = Children
                .toArray(children)
                .filter(r => (r as ReactElement<PropsWithChildren>).type === Tab)
                .reduce<ValueMapping<T>>((acc, child, i) => {
                    const item = child as ReactElement<PropsWithChildren>;

                    if (item.type === Tab) {
                        const item = child as ReactElement<PropsWithChildren<TabProps<T>>>;
                        acc[item.props.value] = i;
                    }
                    return acc;
                }, {} as ValueMapping<T>);
            setValueMapping(map);
        }
        return () => {
            setValueMapping({});
        }
    }, [children]);

    return (
        <Tabs value={value} onChange={handleChange} {...restProps}>
            {Children.map(children, (child, i) => {
                if (!isValidElement(child)) return null;

                const item = child as ReactElement<PropsWithChildren>;

                if (item.type === Tab) {
                    // return cloneElement(item, {
                    //     ...item.props,
                    //     ...{ index: i },
                    // });
                    return cloneElement(item);
                }
                return null;
            })}
        </Tabs>
    )
}

function a11yProps<T extends SelectionDataType>(index?: T) {
    if (index === undefined) return {};
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

interface TabProps<T extends SelectionDataType> {
    value: T;
    tabPositionIndex?: number;
    icon?: string | ReactElement;
    label: string;
    index?: number;
    iconPosition?: XYPosition;
    wrapped?: boolean;
    disabled?: boolean;
}

const Tab = <T extends SelectionDataType>(props: TabProps<T>) => {
    const { value, ...restProps } = props;
    return (
        <MuiTab value={value} {...restProps} {...a11yProps(value)} />
    )
}

export { TabList, Tab };