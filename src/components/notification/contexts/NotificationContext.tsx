import ActionSidebar, { ActionSidebarBody, ActionSidebarTitle } from "@/components/action-sidebar";
import {
    createContext,
    Dispatch,
    FC,
    PropsWithChildren,
    ReactNode,
    SetStateAction,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import { AwaitedReturnType } from "@/models/utility-types";
import { getNotifications } from "@/services/api/user-ep";
import { ServerPaginatedData } from "@/models/paginated-data";
import { NotificationFilter, NotificationReadStatus } from "@/models/params/notification-filter-data";
import { NotificationData } from "@/models/responses/notification-data";
import { NotificationClickEventType } from "@/models/types";
import useFeatureFlag from "@/hooks/useFeatureFlag";
import NotificationPanel from "../components/notification-panel";

export interface NotificationContextState {
    toggleSidebarOpen: () => void;
    notifications?: NotificationData[];
    sidebarOpen: boolean;
}

export const NotificationContext = createContext<NotificationContextState | null>(
    null
);
NotificationContext.displayName = "NotificationContext";

export function useNotificationContext() {
    const context = useContext(NotificationContext);
    if (!context)
        throw new Error(
            "NotificationContext must be used with NotificationProvider!"
        );
    return context;
}

interface NotificationProviderProps {
    retryInterval?: number;
    shouldFetch?: boolean;
}

export const NotificationProvider: FC<
    PropsWithChildren<NotificationProviderProps>
> = (props) => {
    const { children, retryInterval, shouldFetch = false } = props;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [filter, setFilterData] = useState<NotificationFilter>({ readStatus: NotificationReadStatus.Any });
    const isNotificationsEnabled = useFeatureFlag("NOTIFICATIONS");
    const MAX_ROWS_PER_PAGE = 50;

    const { data, status: notificationStatus, error: notificationError, hasNextPage, isRefetching, isFetchingNextPage, fetchNextPage } = useInfiniteQuery<AwaitedReturnType<typeof getNotifications>, Error>(
        ["/user/notification", filter],
        async ({ pageParam = 0 }) => getNotifications({ pageNumber: pageParam, rowsPerPage: MAX_ROWS_PER_PAGE }, filter), {
        enabled: isNotificationsEnabled && shouldFetch,
        keepPreviousData: false,
        refetchOnMount: false,
        refetchInterval: retryInterval,
        getPreviousPageParam: (firstPage) => firstPage.offset === MAX_ROWS_PER_PAGE ? undefined : Math.floor(firstPage.offset / MAX_ROWS_PER_PAGE) ?? undefined,
        getNextPageParam: (lastPage) => lastPage.offset >= lastPage.totalnumber ? undefined : Math.ceil(lastPage.offset / MAX_ROWS_PER_PAGE) ?? undefined,
    });

    const toggleSidebarOpen = () => setSidebarOpen(state => !state);
    const handleClose = () => setSidebarOpen(false);

    const reducedNoti = useMemo(() => Object.values(data?.pages?.reduce<Record<string, NotificationData>>((acc, value) => {
        const res = value?.data?.reduce<Record<string, NotificationData>>((a, v) => {
            a[v.id] = v;
            return a;
        }, {}) ?? {};
        const result = { ...acc, ...res };
        return result;
    }, {}) ?? {}), [data]);

    const handleListScroll = useCallback(() => {
        if (hasNextPage && !isFetchingNextPage) {
            // fetchNextPage({
            //     pageParam: Math.ceil((data?.pages[(data?.pages?.length || 1) - 1]?.offset || 1) / MAX_ROWS_PER_PAGE)
            // });
            fetchNextPage();
        }
    }, [hasNextPage, data, isFetchingNextPage])

    const onNotificationClick = (data: NotificationData, action: NotificationClickEventType) => {
        console.log(data, action);
    }

    const value = useMemo(
        () => ({ toggleSidebarOpen, sidebarOpen, notifications: reducedNoti }),
        [reducedNoti, sidebarOpen]
    );
    return (
        <>
            <NotificationContext.Provider value={value}>
                {children}
            </NotificationContext.Provider>
            <ActionSidebar open={sidebarOpen} onClose={handleClose}>
                <ActionSidebarTitle>
                    Notification
                </ActionSidebarTitle>
                <ActionSidebarBody>
                    <NotificationPanel
                        notifications={reducedNoti}
                        onListScroll={handleListScroll}
                        isFetching={isRefetching}
                        hasNextPage={hasNextPage}
                        fetchError={notificationError}
                        fetchStatus={notificationStatus}
                        onNotificationClick={onNotificationClick}
                    />
                </ActionSidebarBody>
            </ActionSidebar>
        </>
    );
};

interface NotificationConsumerProps {
    children: (value: NotificationContextState | null) => ReactNode;
}

export const NotificationConsumer: FC<NotificationConsumerProps> = ({ children }) => {
    return (
        <NotificationContext.Consumer>
            {(context) => {
                if (context === undefined) {
                    throw new Error(
                        "NotificationConsumer must be used within a NotificationProvider"
                    );
                }
                return children(context);
            }}
        </NotificationContext.Consumer>
    );
};
