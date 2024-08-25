import React, { ReactNode } from "react";
import { Slide, toast, ToastOptions } from "react-toastify";

import { config } from "@/utils/app-config";

import { Loading } from "../loading";

const uniLoaderInit = () => {
    const defaultToastId = "loader-toast";
    let showing = false;
    const options: ToastOptions = {
        toastId: defaultToastId,
        containerId: config.toast.loaderToastContainerId,
        transition: Slide,
    };

    const show = (
        text: string | ReactNode,
        type: "success" | "error" | "warning" | "info",
        closeTime?: number,
        onClick?: () => void
    ) => {
        showing = toast.isActive(defaultToastId);
        if (!showing) {
            switch (type) {
                case "success":
                    toast.success(text, {
                        ...options,
                        autoClose: closeTime ?? false,
                        onClick,
                    });
                    break;
                case "error":
                    toast.error(text, {
                        ...options,
                        autoClose: closeTime ?? false,
                        onClick,
                    });
                    break;
                case "info":
                    toast.info(text, {
                        ...options,
                        autoClose: closeTime ?? false,
                        onClick,
                    });
                    break;
                case "warning":
                    toast.warning(text, {
                        ...options,
                        autoClose: closeTime ?? false,
                        onClick,
                    });
                    break;
                default:
                    break;
            }
        } else {
            switch (type) {
                case "success":
                    toast.update(defaultToastId, {
                        ...options,
                        render: text,
                        type: toast.TYPE.SUCCESS,
                        autoClose: closeTime ?? false,
                        onClick,
                    });
                    break;
                case "error":
                    toast.update(defaultToastId, {
                        ...options,
                        render: text,
                        type: toast.TYPE.ERROR,
                        autoClose: closeTime ?? false,
                        onClick,
                    });
                    break;
                case "info":
                    toast.update(defaultToastId, {
                        ...options,
                        render: text,
                        type: toast.TYPE.INFO,
                        autoClose: closeTime ?? false,
                        onClick,
                    });
                    break;
                case "warning":
                    toast.update(defaultToastId, {
                        ...options,
                        render: text,
                        type: toast.TYPE.WARNING,
                        autoClose: closeTime ?? false,
                        onClick,
                    });
                    break;
                default:
                    break;
            }
        }
    };

    const showLoader = (text?: string) => {
        show(
            <div className="flex flex-row items-center justify-center">
                <Loading className="mr-3" />
                {text}
            </div>,
            "warning"
        );
    };

    const close = () => {
        toast.dismiss(options.toastId);
    };

    return { show, showLoader, close };
};

export default uniLoaderInit;
