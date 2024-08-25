import { useEffect, useRef, useState } from "react";

const useFirstMount = () => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
        return () => {
            setMounted(false);
        };
    }, []);
    return mounted;
};

export default useFirstMount;
