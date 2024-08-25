import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionActions, AccordionDetails, AccordionProps, AccordionSummary } from "@mui/material"
import { Children, PropsWithChildren, ReactElement, ReactNode, cloneElement, isValidElement } from "react";

export interface CollapsibleProps {
    expanded?: boolean;
    onChange?: AccordionProps["onChange"];
    id?: string | number;
    "aria-controls"?: string
    unmountOnExit?: boolean;
}

const Collapsible = (props: PropsWithChildren<CollapsibleProps>) => {
    const { children, id, unmountOnExit, "aria-controls": ariaControls, ...restProps } = props;
    return (
        <Accordion TransitionProps={{ unmountOnExit }}  {...restProps}>
            {Children.toArray(children).filter(child => child !== null).map((child) => {
                if (!isValidElement(child)) return null;

                const item = child as ReactElement<PropsWithChildren>;

                if (item.type === Title) {
                    return cloneElement(item, {
                        ...item.props,
                        ...{ id, "aria-controls": ariaControls },
                    });
                }
                if (item.type === Body) {
                    return cloneElement(item);
                }
                if (item.type === Actions) {
                    return cloneElement(item);
                }
                return null;
            })}
        </Accordion>
    )
}

interface TitleProps {
    expandIcon?: ReactNode;
    id?: string;
    "aria-controls"?: string
}

const Title = (props: PropsWithChildren<TitleProps>) => {
    const { children, expandIcon, ...restProps } = props;
    return (
        <AccordionSummary
            expandIcon={expandIcon ?? <ExpandMore />}
            {...restProps}
        >
            {children}
        </AccordionSummary>
    )
}

interface BodyProps {

}

const Body = (props: PropsWithChildren<BodyProps>) => {
    const { children, ...restProps } = props;
    return (
        <AccordionDetails {...restProps}>
            {children}
        </AccordionDetails>
    )
}

interface ActionsProps {

}

const Actions = (props: PropsWithChildren<ActionsProps>) => {
    const { children, ...restProps } = props;
    return (
        <AccordionActions {...restProps}>
            {children}
        </AccordionActions>
    )
}

export { Collapsible, Title as CollapsibleTitle, Body as CollapsibleBody, Actions as CollapsibleActions };