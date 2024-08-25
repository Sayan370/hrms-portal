import { toast, ToastOptions } from "react-toastify";

import { config } from "@/utils/app-config";

const appToastInit = () => {
    const options: ToastOptions = {
        containerId: config.toast.defaultToastContainerId,
        // transition: Slide
    };

    const success = (text: string) => {
        toast.success(text, { ...options });
    };
    const error = (text: string) => {
        toast.error(text, { ...options });
    };
    const info = (text: string) => {
        toast.info(text, { ...options });
    };
    const warning = (text: string) => {
        toast.warning(text, { ...options });
    };

    return { success, error, info, warning };
};

export default appToastInit;
