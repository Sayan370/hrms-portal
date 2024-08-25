import { CSSProperties } from "react";

export interface CommonProps {
    className?: string;
    id?: string;
    disabled?: boolean;
    style?: CSSProperties;
    form?: string;
}

export interface CommonInputProps extends CommonProps {
    name?: string;
    value?: unknown;
    required?: boolean;
    readOnly?: boolean;
    label?: string;
    errorMessage?: string;
}
