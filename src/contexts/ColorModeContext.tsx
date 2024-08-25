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

import { ColorMode } from "@/models/types";

export interface ColorModeContextState {
    colorMode: ColorMode;
    setColorMode: Dispatch<SetStateAction<ColorMode>>;
}

export const ColorModeContext = createContext<ColorModeContextState | null>(
    null
);
ColorModeContext.displayName = "ColorModeContext";

export function useColorModeContext() {
    const context = useContext(ColorModeContext);
    if (!context)
        throw new Error(
            "ColorModeContext must be used with ColorModeProvider!"
        );
    return context;
}

interface ColorModeProviderProps {
    colorMode: ColorMode;
}

export const ColorModeProvider: FC<
    PropsWithChildren<ColorModeProviderProps>
> = (props) => {
    const { children, colorMode: currentColorMode } = props;
    const allColorModes: ColorMode[] = ["light", "dark"];
    const [colorMode, setColorMode] = useState<ColorMode>(currentColorMode);

    // useEffect(() => {
    //     if (currentColorMode) setColorMode(currentColorMode);
    // }, []);

    useEffect(() => {
        const themeClass = `${colorMode}-theme`;

        allColorModes.forEach((cM) => {
            const thClass = `${cM}-theme`;
            if (document.body?.classList?.contains(thClass))
                document.body?.classList?.remove(thClass);
            if (document.body?.classList?.contains(cM))
                document.body?.classList?.remove(cM);
        });
        if (!document.body?.classList?.contains(themeClass)) {
            document.body?.classList?.add(themeClass);
            document.body?.classList?.add(colorMode);
        }
    }, [colorMode]);

    const value = useMemo(
        () => ({ colorMode, allColorModes, setColorMode }),
        [colorMode]
    );
    return (
        <ColorModeContext.Provider value={value}>
            {children}
        </ColorModeContext.Provider>
    );
};

interface ColorModeConsumerProps {
    children: (value: ColorModeContextState | null) => ReactNode;
}

export const ColorModeConsumer: FC<ColorModeConsumerProps> = ({ children }) => {
    return (
        <ColorModeContext.Consumer>
            {(context) => {
                if (context === undefined) {
                    throw new Error(
                        "ColorModeConsumer must be used within a ColorModeProvider"
                    );
                }
                return children(context);
            }}
        </ColorModeContext.Consumer>
    );
};
