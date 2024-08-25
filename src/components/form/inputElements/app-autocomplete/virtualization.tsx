/* eslint-disable no-prototype-builtins */
import React from 'react';
import { autocompleteClasses } from '@mui/material/Autocomplete';
import useMediaQuery from '@mui/material/useMediaQuery';
import ListSubheader from '@mui/material/ListSubheader';
import Popper from '@mui/material/Popper';
import { useTheme, styled } from '@mui/material/styles';
import { VariableSizeList, ListChildComponentProps } from 'react-window';
import Typography from '@mui/material/Typography';

const LISTBOX_PADDING = 8; // px

const renderRow = (itemWidth?: number | string, paddingY: number = LISTBOX_PADDING) => (props: ListChildComponentProps) => {
    const { data, index, style } = props;
    const dataSet = data[index];
    const inlineStyle: React.CSSProperties = {
        ...style,
        width: itemWidth,
        top: (style.top as number) + paddingY,
    };

    // if (getProps(dataSet)?.hasOwnProperty('group')) {
    //     return (
    //         <ListSubheader key={dataSet.key} component="div" style={inlineStyle}>
    //             {dataSet.group}
    //         </ListSubheader>
    //     );
    // }

    // return (
    //     React.cloneElement(dataSet, { style: inlineStyle })
    // );
    return (
        <div style={inlineStyle}>
            {dataSet}
        </div>
    );
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef<HTMLDivElement>((props, ref) => {
    const outerProps = React.useContext(OuterElementContext);
    return <div ref={ref} {...props} {...outerProps} />;
});

function useResetCache(data: any) {
    const ref = React.useRef<VariableSizeList>(null);
    React.useEffect(() => {
        if (ref.current != null) {
            ref.current.resetAfterIndex(0, true);
        }
    }, [data]);
    return ref;
}

const getProps = (children: React.ReactChild) => {
    let props;
    React.Children.forEach(children, element => {
        if (!React.isValidElement(element)) return;

        props = element.props;
    })
    return props as any;
}

interface MarginPaddingDetails {
    paddingY?: number;
    groupHeight?: number;
    itemHeight?: number;
    itemWidth?: number | string;
}

// Adapter for react-window
export const VirtualizedList = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLElement> & MarginPaddingDetails
>((props, ref) => {
    const { children, itemWidth, paddingY = LISTBOX_PADDING, groupHeight = 36, itemHeight = 48, ...other } = props;
    const itemData: React.ReactChild[] = [];
    (children as React.ReactChild[]).forEach(
        (item: React.ReactChild & { children?: React.ReactChild[] }) => {
            itemData.push(item);
            itemData.push(...(item.children || []));
        },
    );

    const itemCount = itemData.length;

    const getChildSize = (child: React.ReactChild) => {
        // if (getProps(child)?.hasOwnProperty('group')) {
        //     return groupHeight;
        // }

        return itemHeight;
    };

    const getHeight = () => {
        if (itemCount > 8) {
            return 8 * itemHeight;
        }
        return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
    };

    const gridRef = useResetCache(itemCount);

    return (
        <div ref={ref}>
            <OuterElementContext.Provider value={other}>
                <VariableSizeList
                    itemData={itemData}
                    height={getHeight() + 2 * paddingY}
                    width="100%"
                    ref={gridRef}
                    outerElementType={OuterElementType}
                    innerElementType="ul"
                    itemSize={(index) => getChildSize(itemData[index])}
                    overscanCount={5}
                    itemCount={itemCount}
                >
                    {renderRow(itemWidth, paddingY)}
                </VariableSizeList>
            </OuterElementContext.Provider>
        </div>
    );
});

export const VirtualizedListComp = (defaultprops: React.HTMLAttributes<HTMLElement>, ref: React.ForwardedRef<HTMLDivElement>) => {
    const theme = useTheme();
    const smUp = useMediaQuery(theme.breakpoints.up('p'), {
        noSsr: true,
    });
    const itemSize = smUp ? 52 : 56;
    const itemWidth = smUp ? "100%" : "800px";
    return <VirtualizedList ref={ref} {...defaultprops} paddingY={6} itemHeight={itemSize} groupHeight={36} itemWidth={itemWidth} />;
};

export const StyledPopper = styled(Popper)({
    [`& .${autocompleteClasses.listbox}`]: {
        boxSizing: 'border-box',
        '& ul': {
            padding: 0,
            margin: 0,
        },
    },
});