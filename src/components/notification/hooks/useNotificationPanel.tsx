import { UIEvent, UIEventHandler, useEffect, useRef } from "react";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { NotificationPanelProps } from "../components/notification-panel";
import { useNotificationContext } from "../contexts/NotificationContext";

const useNotificationPanel = (props: NotificationPanelProps) => {
    const { onListScroll } = props;
    const listInnerRef = useRef<HTMLDivElement | null>(null);
    const [btnRef, entry] = useIntersectionObserver<HTMLButtonElement | null>({
        root: listInnerRef?.current
    });

    // const handleScroll = (evt: UIEvent<HTMLDivElement>) => {
    //     if (listInnerRef.current) {
    //         const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
    //         if (scrollTop + clientHeight === scrollHeight) {
    //             console.log(scrollTop, scrollHeight, clientHeight, scrollTop + clientHeight);
    //             // This will be triggered after hitting the last element.
    //             // API call should be made here while implementing pagination.
    //             onListScroll();
    //         }
    //     }
    // };

    useEffect(() => {
        if (entry?.isIntersecting) {
            onListScroll();
        }
    }, [entry]);

    return { listInnerRef, btnRef }
}

export default useNotificationPanel;