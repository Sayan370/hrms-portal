export enum NotificationReadStatus {
    Any,
    Read,
    Unread,
}

export interface NotificationFilter {
    readStatus: NotificationReadStatus;
}
