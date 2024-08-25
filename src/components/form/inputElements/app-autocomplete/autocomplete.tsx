import React, { memo, useCallback, useRef } from "react";
import {
    Autocomplete,
    AutocompleteChangeDetails,
    AutocompleteChangeReason,
    AutocompleteRenderGroupParams,
    AutocompleteRenderOptionState,
    AutocompleteValue,
    Chip,
    TextField,
    UseAutocompleteProps,
} from "@mui/material";
import clsx from "clsx";

import { CommonInputProps } from "@/models/common-props";
import { SizeProps } from "@/models/types";
import { Loading } from "@/components/loading";

import { StyledPopper, VirtualizedListComp } from "./virtualization";

const ListboxComponent = React.forwardRef(VirtualizedListComp);

interface ListValue<TItem> {
    label: string;
    value: TItem;
}

type Id<T, K extends keyof T> = T extends object
    ? K extends keyof T
        ? T[K]
        : undefined
    : T;

export interface AppAutocompleteListItemProps<TItem> {
    props: React.HTMLAttributes<HTMLLIElement>;
    option: TItem;
    state: AutocompleteRenderOptionState;
}

interface AppAutocompleteProps<
    TItem,
    Key extends keyof TItem,
    Multiple extends boolean | undefined,
    DisableClearable extends boolean | undefined,
    FreeSolo extends boolean | undefined
> extends Omit<CommonInputProps, "value"> {
    onChange?: UseAutocompleteProps<
        TItem,
        Multiple,
        DisableClearable,
        FreeSolo
    >["onChange"];
    emptyOptionLabel?: string;
    options: TItem[];
    value?: UseAutocompleteProps<
        TItem,
        Multiple,
        DisableClearable,
        FreeSolo
    >["value"];
    multiple?: Multiple;
    disableClearable?: DisableClearable;
    freeSolo?: FreeSolo;
    size?: Exclude<SizeProps, "large">;
    filterOptions?: UseAutocompleteProps<
        TItem,
        Multiple,
        DisableClearable,
        FreeSolo
    >["filterOptions"];
    getOptionLabel?: UseAutocompleteProps<
        TItem,
        Multiple,
        DisableClearable,
        FreeSolo
    >["getOptionLabel"];
    getTagLabelOnBlur?: (option: TItem, isBlurred?: boolean) => string;
    getInputTextOnBlur?: (
        value: UseAutocompleteProps<
            TItem,
            Multiple,
            DisableClearable,
            FreeSolo
        >["value"]
    ) => string;
    isOptionEqualToValue?: UseAutocompleteProps<
        TItem,
        Multiple,
        DisableClearable,
        FreeSolo
    >["isOptionEqualToValue"];
    limitTags?: number;
    virtualized?: boolean;
    loading?: boolean;
    primaryKey?: Key;
    helperText?: string;
    color?: "primary" | "secondary";
    groupBy?: (option: TItem) => string;
    open?: boolean;
    components?: {
        ListItem?: React.FC<AppAutocompleteListItemProps<TItem>>;
        Group?: React.FC<AutocompleteRenderGroupParams>;
    };
    classes?: {
        popper?: string;
    };
}

const AppAutocomplete = <
    T,
    Key extends keyof T,
    Multiple extends boolean | undefined = false,
    DisableClearable extends boolean | undefined = false,
    FreeSolo extends boolean | undefined = false
>(
    props: AppAutocompleteProps<T, Key, Multiple, DisableClearable, FreeSolo>
) => {
    const {
        label,
        name,
        id,
        value,
        errorMessage,
        helperText,
        emptyOptionLabel,
        multiple,
        size = "medium",
        color,
        components,
        primaryKey,
        virtualized,
        loading,
        getInputTextOnBlur,
        getTagLabelOnBlur,
        ...restProps
    } = props;

    const { ListItem, Group } = components || {};

    const isBlurred = useRef(true);

    const onBlur = () => {
        isBlurred.current = true;
    };

    const onFocus = () => {
        isBlurred.current = false;
    };

    return (
        <Autocomplete
            className={clsx("flex flex-row", props.className)}
            style={{ ...props.style }}
            multiple={multiple}
            size={size}
            id={id}
            value={value}
            noOptionsText={emptyOptionLabel}
            renderOption={
                ListItem
                    ? (props, option, state) => (
                          <ListItem
                              props={props}
                              option={option}
                              state={state}
                              key={
                                  (option
                                      ? primaryKey
                                          ? option[primaryKey]
                                          : option
                                      : undefined) as
                                      | React.Key
                                      | null
                                      | undefined
                              }
                          />
                      )
                    : undefined
            }
            renderGroup={Group ? (params) => <Group {...params} /> : undefined}
            filterSelectedOptions
            disableListWrap={virtualized}
            PopperComponent={virtualized ? StyledPopper : undefined}
            ListboxComponent={virtualized ? ListboxComponent : undefined}
            loading={loading}
            renderTags={
                getTagLabelOnBlur
                    ? (tagValue, getTagProps) =>
                          tagValue.map((option, index) => (
                              <Chip
                                  label={getTagLabelOnBlur(
                                      option,
                                      isBlurred.current
                                  )}
                                  size={size}
                                  {...getTagProps({ index })}
                              />
                          ))
                    : undefined
            }
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    name={name}
                    id={id}
                    color={color}
                    error={!!errorMessage}
                    helperText={errorMessage || helperText}
                    fullWidth
                    onBlur={onBlur}
                    onFocus={onFocus}
                    placeholder={multiple ? label : undefined}
                    inputProps={{
                        ...params.inputProps,
                        value: getInputTextOnBlur
                            ? !isBlurred.current
                                ? params.inputProps.value
                                : getInputTextOnBlur(value)
                            : params.inputProps.value,
                    }}
                    // eslint-disable-next-line react/jsx-no-duplicate-props
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {loading ? (
                                    <Loading color="inherit" size={20} />
                                ) : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                />
            )}
            {...restProps}
        />
    );
};

export default AppAutocomplete;
