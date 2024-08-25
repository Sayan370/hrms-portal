import { useCallback, useEffect, useRef, useState } from "react";
import { copyToClipBoard } from "@/utils/object-utils";
import { Tooltip } from "@mui/material";
import { SizeProps } from "@/models/types";
import clsx from "clsx";
import { AppButton } from "../form"
import { ContentPaste, ContentPasteDone } from "../icons";

interface CopyToClipboardProps {
    copy?: string;
    size?: SizeProps | "x-small";
    className?: string;
    copyTitle?: string;
    copiedTitle?: string;
}

const CopyToClipboard = (props: CopyToClipboardProps) => {
    const { copy, className, size = "x-small", copyTitle = "Copy", copiedTitle = "Copied", ...rest } = props;
    const [isCopying, setCopyState] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setCopyState(false);
        }, 1000);
        return () => {
            clearTimeout(timeout);
        }
    }, [isCopying]);

    const onClick = useCallback(() => {
        setCopyState(true);
        copyToClipBoard(copy ?? "");
    }, [copy]);

    const getSize = (size: SizeProps | "x-small") => {
        switch (size) {
            case "x-small":
                return "small";
            default:
                return size;
        }
    }

    return (
        <Tooltip title={!isCopying ? copyTitle : copiedTitle} onClick={onClick}>
            <AppButton variant="icon" className={clsx("!align-bottom", size === "x-small" && "!w-6 !h-6", className)} size={getSize(size)} {...rest}>
                {!isCopying ? <ContentPaste fontSize={getSize(size)} sx={{
                    fontSize: size === "x-small" ? 15 : undefined
                }} /> : <ContentPasteDone fontSize={getSize(size)} sx={{
                    fontSize: size === "x-small" ? 15 : undefined
                }} />}
            </AppButton>
        </Tooltip>
    )
}

export default CopyToClipboard;