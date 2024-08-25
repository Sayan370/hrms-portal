import { NotificationData } from "@/models/responses/notification-data";
import Scrollable from "@/components/scrollable";
import { AppLoaderButton } from "@/components/form";
import { NotificationClickEventType, RKLoadState } from "@/models/types";
import { Loading } from "@/components/loading";
import FailedMessage from "@/components/failed-message";
import dayjs from "dayjs";
import useNotificationPanel from "../hooks/useNotificationPanel";
import NotificationView from "./notification-view";

export interface NotificationPanelProps {
    notifications?: NotificationData[];
    onListScroll: () => void;
    isFetching?: boolean;
    hasNextPage?: boolean;
    fetchStatus?: RKLoadState;
    fetchError?: Error | null;
    onNotificationClick?: (data: NotificationData, action: NotificationClickEventType) => void;
}

const NotificationPanel = (props: NotificationPanelProps) => {
    const { notifications, onListScroll, isFetching, hasNextPage, fetchStatus, fetchError, onNotificationClick } = props;
    const { listInnerRef, btnRef } = useNotificationPanel(props);
    const defaultTime = dayjs().toISOString();

    return (
        <>
            {
                (fetchStatus === "loading" || fetchStatus === "idle") && <Loading grow />
            }
            {
                fetchStatus === "error" && <FailedMessage grow text={fetchError?.message} />
            }
            {
                fetchStatus === "success" &&
                <Scrollable className="max-h-[calc(100vh-6.5rem)]" classes={{ wrapper: "mt-2", container: "gap-1 pr-1" }} ref={listInnerRef}>
                    {
                        notifications?.length &&
                        <ul className="m-0 my-1 ml-1 p-0 flex flex-col gap-1">
                            {
                                notifications?.map(r => (<NotificationView key={r.id} data={r} currentTime={defaultTime} onClick={onNotificationClick} />))
                            }
                        </ul>
                    }
                    {
                        hasNextPage &&
                        <AppLoaderButton ref={btnRef} onClick={onListScroll} isLoading={isFetching} shouldBeDisabledWhileLoading>
                            Load More
                        </AppLoaderButton>
                    }
                </Scrollable>
            }
        </>
    );
}

export default NotificationPanel;