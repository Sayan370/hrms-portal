import { AxiosProgressEvent } from "axios";
import { useState } from "react";

const useAxiosProgress = () => {
    const [progress, setProgress] = useState(0);
    const startOver = () => {
        setProgress(1);
    }
    const progressOver = () => {
        setProgress(0);
    }
    const onAxiosProgress = (evt: AxiosProgressEvent) => {
        setProgress(
            typeof evt.progress === "number"
                ? evt.progress * 100
                : 0
        );
    }

    return {
        progress,
        progressOver,
        startOver,
        onAxiosProgress
    }
}

export default useAxiosProgress;