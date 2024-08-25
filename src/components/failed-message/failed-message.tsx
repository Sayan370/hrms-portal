import clsx from "clsx";

import { SizeProps } from "@/models/types";
import { getImage } from "@/utils/image-util";

type FailedImageType = "error" | "no-data";

interface FailedProps {
    text?: string;
    grow?: boolean;
    className?: string;
    type?: FailedImageType;
    size?: SizeProps;
}

const FailedMessage = (props: FailedProps) => {
    const {
        text,
        className,
        grow = false,
        type = "error",
        size = "medium",
    } = props;
    const getProperIcon = (type?: FailedImageType) => {
        switch (type) {
            case "error":
                return "errorIcon";
            case "no-data":
                return "noDataIcon";
            default:
                return "errorIcon";
        }
    };
    const getSize = (size?: SizeProps) => {
        switch (size) {
            case "small":
                return "w-44";
            case "medium":
                return "w-60";
            case "large":
                return "w-96";
            default:
                return "errorIcon";
        }
    };
    const getContent = () => (
        <div className={clsx("flex flex-col items-center", className)}>
            <img
                src={getImage(getProperIcon(type))}
                className={clsx("dark:mix-blend-difference", getSize(size))}
                alt="error"
            />
            <span className="text-center">{text}</span>
        </div>
    );
    return grow ? (
        <div className="flex h-full w-full grow flex-row">
            <div className="flex grow flex-col items-center justify-center">
                {getContent()}
            </div>
        </div>
    ) : (
        getContent()
    );
};

export default FailedMessage;
