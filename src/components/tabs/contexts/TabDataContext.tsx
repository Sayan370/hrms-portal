import {
    createContext,
    Dispatch,
    FC,
    PropsWithChildren,
    ReactNode,
    SetStateAction,
    SyntheticEvent,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

export type SelectionDataType = string | number;

export type ValueMapping<T extends SelectionDataType> = Record<T, number>;

export interface TabDataContextState<T extends SelectionDataType> {
    selectedTab: T;
    valueMapping: ValueMapping<T>;
    setSelectedTab: Dispatch<SetStateAction<T>>;
    setValueMapping: Dispatch<SetStateAction<ValueMapping<T>>>;
    handleChange: (event: SyntheticEvent, newValue: T) => void;
}

interface TabDataProviderProps<T extends SelectionDataType> {
    defaultValue: T;
    value?: T;
    onTabChange?: (selected: T) => void;
}

interface TabDataConsumerProps<T extends SelectionDataType> {
    children: (value: TabDataContextState<T> | null) => ReactNode;
}

export function createTabDataContext<T extends SelectionDataType>() {
    const TabDataContext = createContext<TabDataContextState<T> | null>(null);
    TabDataContext.displayName = "TabDataContext";

    function useTabDataContext() {
        const context = useContext(TabDataContext);
        if (!context)
            throw new Error(
                "TabDataContext must be used with TabDataProvider!"
            );
        return context;
    }
    const TabDataProvider = (
        props: PropsWithChildren<TabDataProviderProps<T>>
    ) => {
        const {
            children,
            defaultValue,
            value: controlledValue,
            onTabChange,
        } = props;

        const [selectedTab, setSelectedTab] = useState<T>(defaultValue);
        const [valueMapping, setValueMapping] = useState<ValueMapping<T>>(
            {} as ValueMapping<T>
        );

        const handleChange = (event: SyntheticEvent, newValue: T) => {
            setSelectedTab(newValue);
            onTabChange?.(newValue);
        };

        useEffect(() => {
            if (controlledValue !== undefined) setSelectedTab(controlledValue);
        }, [controlledValue]);

        const value = useMemo(
            () => ({
                selectedTab,
                valueMapping,
                setValueMapping,
                setSelectedTab,
                handleChange,
            }),
            [selectedTab, valueMapping]
        );
        return (
            <TabDataContext.Provider value={value}>
                {children}
            </TabDataContext.Provider>
        );
    };

    const TabDataConsumer = ({ children }: TabDataConsumerProps<T>) => {
        return (
            <TabDataContext.Consumer>
                {(context) => {
                    if (context === undefined) {
                        throw new Error(
                            "TabDataConsumer must be used within a TabDataProvider"
                        );
                    }
                    return children(context);
                }}
            </TabDataContext.Consumer>
        );
    };
    return {
        TabDataProvider,
        TabDataConsumer,
        useTabDataContext,
    };
}

const { useTabDataContext, TabDataConsumer, TabDataProvider } =
    createTabDataContext();

export { useTabDataContext, TabDataConsumer, TabDataProvider };
