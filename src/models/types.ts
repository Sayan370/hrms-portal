export type UserRoles =
    | "SuperAdmin"
    | "HRHead"
    | "CPO"
    | "Admin"
    | "User";

export type DataLoadState = "Pending" | "Completed" | "Failed";

export type ColorProps =
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";

export type SizeProps = "small" | "medium" | "large";

export type ReduxStoreState = "SUCCESS" | "PENDING" | "ERROR";

export type RKLoadState = "idle" | "error" | "loading" | "success";

export type ColorMode = "light" | "dark";

export type CellAlignment = "left" | "center" | "right";

export type Order = "asc" | "desc";

export type Orientation = "horizontal" | "vertical";

export type TableSizes = "small" | "medium";

export type XYPosition = "top" | "bottom" | "end" | "start";

export type CommonRowEventType =
    | "edit"
    | "delete"
    | "view"
    | "add"
    | "print"
    | "cp"
    | "document";

export type AlertEventType = "confirm" | "cancel";

export type InvoiceEventType = "Info" | "Back";

export type NotificationClickEventType = "accepted" | "canceled" | "clicked";

export type InvoiceActionEventType =
    | Exclude<CommonRowEventType, "add" | "view">
    | "print"
    | "post"
    | "postWithDate"
    | "scm"
    | "comment"
    | "irn";
export type InvoiceActionButtonEventType =
    | Exclude<CommonRowEventType, "add">
    | "addBookmark"
    | "postWithDate"
    | "post"
    | "irn"
    | "comment"
    | "deleteBookmark";
export type InvoiceModalEventType =
    | Exclude<CommonRowEventType, "delete" | "view">
    | "scm";
export type CpModalEventType =
    | Exclude<CommonRowEventType, "delete" | "view" | "cp" | "print">
    | "default";
export type CustomerRowsEvent = CommonRowEventType | "customerMapping";
