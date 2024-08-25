import {
    createContext,
    Dispatch,
    FC,
    PropsWithChildren,
    ReactNode,
    SetStateAction,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

import { FeatureFlagDataSet } from "@/models/feature-flags";

export interface FeatureFlagContextState {
    featureFlagSet: FeatureFlagDataSet;
    // setFeatureFlagSet: Dispatch<SetStateAction<FeatureFlagDataSet>>;
}

export const FeatureFlagContext = createContext<FeatureFlagContextState | null>(
    null
);
FeatureFlagContext.displayName = "FeatureFlagContext";

export function useFeatureFlagContext() {
    const context = useContext(FeatureFlagContext);
    if (!context)
        throw new Error(
            "FeatureFlagContext must be used with FeatureFlagProvider!"
        );
    return context;
}

interface FeatureFlagProviderProps {
    featureFlagSet: FeatureFlagDataSet;
}

export const FeatureFlagProvider: FC<
    PropsWithChildren<FeatureFlagProviderProps>
> = (props) => {
    const { children, featureFlagSet: currentFeatureFlagSet } = props;

    const [featureFlagSet, setFeatureFlagSet] = useState<FeatureFlagDataSet>(currentFeatureFlagSet);

    const value = useMemo(
        () => ({ featureFlagSet }),
        [featureFlagSet]
    );
    return (
        <FeatureFlagContext.Provider value={value}>
            {children}
        </FeatureFlagContext.Provider>
    );
};

interface FeatureFlagConsumerProps {
    children: (value: FeatureFlagContextState | null) => ReactNode;
}

export const FeatureFlagConsumer: FC<FeatureFlagConsumerProps> = ({ children }) => {
    return (
        <FeatureFlagContext.Consumer>
            {(context) => {
                if (context === undefined) {
                    throw new Error(
                        "FeatureFlagConsumer must be used within a FeatureFlagProvider"
                    );
                }
                return children(context);
            }}
        </FeatureFlagContext.Consumer>
    );
};
