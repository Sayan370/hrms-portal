import React, {
    Children,
    cloneElement,
    isValidElement,
    PropsWithChildren,
    ReactElement,
    ReactNode,
    useState,
} from "react";
import { Popover, PopoverOrigin } from "@mui/material";
import flattenChildren from "react-keyed-flatten-children";

export interface PopupAnchorProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    "aria-describedby"?: string;
}

interface ChildrenProps {
    close: () => void;
    open: boolean;
}

interface PopupProps {
    anchorOrigin?: PopoverOrigin;
    transformOrigin?: PopoverOrigin;
    children?: ReactNode | ((props: ChildrenProps) => ReactNode);
    onClose?: () => void;
}

const Popup = ({ children, onClose, ...restProps }: PopupProps) => {
    const defaultAnchorOrigin: PopoverOrigin = {
        vertical: "bottom",
        horizontal: "left",
    };
    const { anchorOrigin = defaultAnchorOrigin, transformOrigin } = restProps;
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        onClose?.();
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    return (
        <>
            {flattenChildren(
                typeof children === "function"
                    ? children({ close: handleClose, open })
                    : children,
                2
            )
                .filter((child) => {
                    const item = child as ReactElement<PropsWithChildren>;

                    return item?.type === Anchor;
                })
                .map((child) => {
                    const item = child as ReactElement<
                        AnchorProps & PropsWithChildren
                    >;

                    return cloneElement(item, {
                        ...item.props,
                        ...{
                            onClick: handleClick,
                            onMouseEnter: item.props.shouldOpenOnHover
                                ? handleClick
                                : undefined,
                            // onMouseOver: handleClick,
                            // onMouseLeave: handleClose,
                            "aria-describedby": id,
                        },
                    });
                })}
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                transformOrigin={transformOrigin}
                anchorOrigin={anchorOrigin}>
                {flattenChildren(
                    typeof children === "function"
                        ? children({ close: handleClose, open })
                        : children,
                    2
                ).map((child) => {
                    if (!isValidElement(child)) return null;

                    const item = child as ReactElement<PropsWithChildren>;

                    // if (item?.type !== Anchor)
                    //   return cloneElement(item, {
                    //     ...item.props,
                    //     ...{
                    //       // onClick: handleClick,
                    //       // onMouseOver: handleClick,
                    //       onMouseLeave: handleClose,
                    //       "aria-describedby": id,
                    //     },
                    //   });
                    if (item?.type !== Anchor) return child;
                    return null;
                })}
            </Popover>
        </>
    );
};

interface AnchorProps {
    // onMouseLeave?: (evt: React.MouseEvent<HTMLDivElement>) => void;
    shouldOpenOnHover?: boolean;
}

const Anchor = ({
    children = null,
    // onMouseLeave,
    shouldOpenOnHover,
    ...restProps
}: PropsWithChildren<AnchorProps>) => {
    return (Children.count(children) === 1 && (
        <>
            {Children.map(children, (child) => {
                if (!isValidElement(child)) return null;

                if (isValidElement(child)) {
                    return cloneElement(child, {
                        ...child.props,
                        ...restProps,
                    });
                }

                return null;
            })}
        </>
    )) as ReactElement<PropsWithChildren>;
};

// interface BodyProps {

// }

// const Body = ({ children }: PropsWithChildren<BodyProps>) => {
//     return children as ReactElement<PropsWithChildren>;
// };

export const PopupAnchor = Anchor;
// Popup.Body = Body;

export default Popup;
