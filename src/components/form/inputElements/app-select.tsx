import React, { memo, useCallback } from "react";
import {
    Box,
    Chip,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    SelectProps,
    Theme,
    useTheme,
} from "@mui/material";
import clsx from "clsx";

import { CommonInputProps } from "@/models/common-props";
import { SizeProps } from "@/models/types";

import AppCheckbox from "./app-checkbox";

interface ListValue<TItem> { label: string; value: TItem };
export interface AppSelectListItemProps<TItem, Option extends ListValue<TItem>> {
    data: Option;
}

interface AppSelectProps<TItem, Option extends ListValue<TItem>> extends Omit<CommonInputProps, "value"> {
    onChange?: (
        evt: SelectChangeEvent<TItem | TItem[]>,
        child: React.ReactNode
    ) => void;
    emptyOptionLabel?: string;
    showEmptyOption?: boolean;
    options: Option[];
    value?: TItem | TItem[];
    multiple?: boolean;
    size?: Exclude<SizeProps, "large">;
    components?: {
        ListItem?: React.FC<AppSelectListItemProps<TItem, Option>>;
    }
}

function getStyles<T = unknown>(value: T, values: readonly T[], theme: Theme) {
    return {
        fontWeight:
            values?.indexOf(value) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const AppSelect = <T extends string | number, Op extends ListValue<T>>(props: AppSelectProps<T, Op>) => {
    const theme = useTheme();
    const {
        options,
        label,
        name,
        id,
        errorMessage,
        emptyOptionLabel,
        multiple,
        showEmptyOption = !multiple,
        size = "medium",
        components,
        className,
        style,
        ...restProps
    } = props;

    const { ListItem } = components || {};

    const getLabel = useCallback(
        (value: T) => options.find((r) => r.value === value)?.label,
        [options]
    );

    return (
        <div
            className={clsx("flex flex-row", className)}
            style={{ width: "100%", ...style }}>
            {label ? (
                <FormControl
                    size={size}
                    className="flex-grow"
                    variant="outlined"
                    error={!!errorMessage}>
                    <InputLabel htmlFor={props.id}>{label}</InputLabel>
                    <Select
                        label={label}
                        size={size}
                        inputProps={{
                            name,
                            id,
                        }}
                        multiple={multiple}
                        renderValue={
                            multiple
                                ? (selected) => (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexWrap: "wrap",
                                            gap: 0.5,
                                        }}>
                                        {Array.isArray(selected) &&
                                            selected.map((value) => (
                                                <Chip
                                                    key={value}
                                                    label={getLabel(value)}
                                                />
                                            ))}
                                    </Box>
                                )
                                : undefined
                        }
                        {...restProps}>
                        {showEmptyOption && (
                            <MenuItem aria-label="None" value="">
                                {emptyOptionLabel || "None"}
                            </MenuItem>
                        )}
                        {options &&
                            options.map((v, i) => (
                                <MenuItem
                                    value={v.value}
                                    key={v.value}
                                    style={
                                        multiple
                                            ? getStyles(
                                                v.value,
                                                (props.value || []) as T[],
                                                theme
                                            )
                                            : undefined
                                    }>
                                    {multiple && (
                                        <AppCheckbox
                                            checked={
                                                (
                                                    (props.value || []) as T[]
                                                ).indexOf(v.value) > -1
                                            }
                                        />
                                    )}
                                    {
                                        ListItem ? <ListItem data={v} /> : v.label
                                    }
                                </MenuItem>
                            ))}
                    </Select>
                    {
                        !!errorMessage &&
                        <FormHelperText>{errorMessage}</FormHelperText>
                    }
                </FormControl>
            ) : (
                <Select
                    className="flex flex-grow"
                    size={size}
                    inputProps={{
                        name,
                        id,
                    }}
                    multiple={multiple}
                    renderValue={
                        multiple
                            ? (selected) => (
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: 0.5,
                                    }}>
                                    {Array.isArray(selected) &&
                                        selected.map((value) => (
                                            <Chip
                                                key={value}
                                                label={getLabel(value)}
                                            />
                                        ))}
                                </Box>
                            )
                            : undefined
                    }
                    error={!!errorMessage}
                    {...restProps}>
                    {showEmptyOption && (
                        <MenuItem aria-label="None" value="">
                            {emptyOptionLabel || "None"}
                        </MenuItem>
                    )}
                    {options &&
                        options.map((v, i) => (
                            <MenuItem
                                value={v.value}
                                key={v.value}
                                style={
                                    multiple
                                        ? getStyles(
                                            v.value,
                                            (props.value || []) as T[],
                                            theme
                                        )
                                        : undefined
                                }>
                                {multiple && (
                                    <AppCheckbox
                                        checked={
                                            (
                                                (props.value || []) as T[]
                                            ).indexOf(v.value) > -1
                                        }
                                    />
                                )}
                                {
                                    ListItem ? <ListItem data={v} /> : v.label
                                }
                            </MenuItem>
                        ))}
                </Select>
            )}
        </div>
    );
};

export default memo(AppSelect);
