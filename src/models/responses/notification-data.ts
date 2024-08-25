export enum NotificationSeverity {
    Info,
    Warning,
    Success,
    Error,
}

export interface ApprovalNotificationData {
    type: "approval";
    data: {
        status: "approved" | "cancelled" | "pending";
    };
}

export interface GeneralNotificationData {
    type: "general";
    data?: any;
}

export interface ParitalNotification {
    id: string;
    title: string;
    message: string;
    icon?: string;
    severity: NotificationSeverity;
    read?: boolean;
    url?: string;
    date: string;
}

export type NotificationData = ParitalNotification &
    (ApprovalNotificationData | GeneralNotificationData);
