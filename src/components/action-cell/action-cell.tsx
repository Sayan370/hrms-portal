import {
    Children,
    cloneElement,
    isValidElement,
    PropsWithChildren,
    ReactElement,
    ReactNode,
    RefObject,
    useRef,
    useState,
} from "react";

export interface ActionCellProps {}

const ActionCell = (props: PropsWithChildren<ActionCellProps>) => {
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
    const [isOpen, setOpenState] = useState(false);
    const onClick = () => {
        setOpenState(true);
        inputRef.current?.focus();
    };
    // const onBlur = () => {
    //     setOpenState(false);
    // };
    const { children, ...restProps } = props;
    return (
        <div
            className="w-full"
            onClick={onClick}
            // onBlur={onBlur}
            role="button"
            tabIndex={0}
            onKeyDown={() => {}}
            onKeyUp={() => {}}>
            {Children.toArray(children)
                .filter((child) => child !== null)
                .map((child) => {
                    if (!isValidElement(child)) return null;

                    const item = child as ReactElement<PropsWithChildren>;

                    if (item.type === ActionCellInput && isOpen) {
                        return cloneElement(item, {
                            ...item.props,
                            ...{ inputRef },
                        });
                    }
                    if (item.type === ActionCellBody && !isOpen) {
                        return cloneElement(item);
                    }
                    return null;
                })}
        </div>
    );
};

interface ActionCellInputChildrenProps {
    inputRef?: RefObject<HTMLInputElement | HTMLTextAreaElement>;
}

interface ActionCellInputProps {
    // onClick?: () => void;
    // onBlur?: () => void;
    inputRef?: RefObject<HTMLInputElement | HTMLTextAreaElement>;
    children?: ReactNode | ((props: ActionCellInputChildrenProps) => ReactNode);
}

const ActionCellInput = (props: ActionCellInputProps) => {
    const { children, inputRef, ...restProps } = props;
    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            {typeof children === "function" ? children({ inputRef }) : children}
        </>
    );
};

interface ActionCellBodyProps {}

const ActionCellBody = (props: PropsWithChildren<ActionCellBodyProps>) => {
    const { children, ...restProps } = props;
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>;
};

export { ActionCell, ActionCellInput, ActionCellBody };
