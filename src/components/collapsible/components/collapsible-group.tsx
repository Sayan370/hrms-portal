import { Children, PropsWithChildren, ReactElement, SyntheticEvent, cloneElement, isValidElement, useState } from "react";
import clsx from "clsx";
import { Collapsible, CollapsibleProps } from "./collapsible";

type ExpandType = "single" | "multiple";
type DefaultExpandedState<ExpandedState extends ExpandType = "single"> = ExpandedState extends "single" | undefined ? (string | number) : (string | number)[];

interface CollapsibleGroupProps<ExpandedState extends ExpandType = "single"> {
    className?: string;
    unmountOnExit?: boolean;
    expandType?: ExpandedState;
    defaultExpState?: DefaultExpandedState<ExpandedState>;
}

const CollapsibleGroup = <ExpandedState extends ExpandType = "single">(props: PropsWithChildren<CollapsibleGroupProps<ExpandedState>>) => {
    const { children, className, unmountOnExit, expandType = "single", defaultExpState } = props;

    const getDefaultState = (defaultState?: DefaultExpandedState<ExpandedState>): Record<(string | number), boolean> => {
        if (expandType === "multiple") {
            return (defaultState as (string | number)[]).reduce<Record<(string | number), boolean>>((acc, val) => {
                acc[val] = true
                return acc;
            }, {})
        }
        return { [defaultState as (string | number)]: true };
    }

    const [expandedState, setExapanedState] = useState<Record<(string | number), boolean>>(defaultExpState !== undefined ? getDefaultState(defaultExpState) : {});


    const handleChange = (id: string | number) => (event: SyntheticEvent, expanded: boolean) => {
        switch (expandType) {
            case "single":
                setExapanedState({ [id]: expanded });
                break;
            case "multiple":
                setExapanedState(state => ({ ...state, [id]: expanded }));
                break;
            default:
                break;
        }
    }
    return (
        <div className={clsx("w-full", className)}>
            {Children.map(children, (child, i) => {
                if (!isValidElement(child)) return null;

                const item = child as ReactElement<PropsWithChildren<CollapsibleProps>>;

                if (item.type === Collapsible) {
                    return cloneElement(item, {
                        ...item.props,
                        ...{
                            expanded: expandedState?.[(item.props.id ?? i)] ?? false,
                            onChange: handleChange(item.props.id ?? i),
                            unmountOnExit
                        },
                    });
                }

                return null;
            })}
        </div>
    );
}

export default CollapsibleGroup;