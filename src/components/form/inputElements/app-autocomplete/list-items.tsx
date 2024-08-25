import { FC } from "react";
import clsx from "clsx";
import { truncate } from "lodash";
import { AppAutocompleteListItemProps } from "./autocomplete";

export const AutocompleteListItem: FC<AppAutocompleteListItemProps<{ label: string; value: string; }>> = ({ option: data, props }) => {
    const { className, ...restProps } = props;
    return <li {...restProps} className={clsx(className, "flex flex-col !items-start")}>
        <span>{truncate(data.label, { length: 50 })}</span>
        <span className="text-xs text-slate-400 dark:text-slate-500">{data.value}</span>
    </li>
}
export const AutocompleteSmallListItem: FC<AppAutocompleteListItemProps<{ label: string; value: string; }>> = ({ option: data, props }) => {
    const { className, ...restProps } = props;
    return <li {...restProps} className={clsx(className, "flex flex-col !items-start")}>
        <span className="text-sm">{truncate(data.label, { length: 40 })}</span>
        <span className="text-xs text-slate-400 dark:text-slate-500">{data.value}</span>
    </li>
}
export const AutocompleteXSmallListItem: FC<AppAutocompleteListItemProps<{ label: string; value: string; }>> = ({ option: data, props }) => {
    const { className, ...restProps } = props;
    return <li {...restProps} className={clsx(className, "flex flex-col !items-start")}>
        <span className="text-xs">{truncate(data.label, { length: 40 })}</span>
        <span className="text-xs text-slate-400 dark:text-slate-500">{data.value}</span>
    </li>
}

export const MinimalAutoComplete: FC<
    AppAutocompleteListItemProps<{ label: string; value: string }>
> = ({ option: data, props }) => {
    const { className, ...restProps } = props;
    return (
        <li {...restProps} className={clsx(className, "flex")}>
            <span>{truncate(data.label, { length: 40 })}</span>
        </li>
    );
};