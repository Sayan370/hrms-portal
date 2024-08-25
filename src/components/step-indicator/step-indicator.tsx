import React, { useMemo } from "react";
import { Tooltip } from "@mui/material";
import clsx from "clsx";

type StepStatus = "pending" | "processing" | "approved" | "rejected";

interface Step {
    label: string;
    status: StepStatus;
}

interface StepIndicatorProps {
    steps: Step[];
    classes?: {
        root?: string;
    };
}

const StepIndicator = ({ steps, classes }: StepIndicatorProps) => {
    const numberOfSteps = useMemo(() => (steps || []).length ?? 0, [steps]);
    const currentStep = useMemo(
        () => (steps || []).findLastIndex((r) => r.status === "approved") ?? 0,
        [steps]
    );

    const activeColor = (index: number, step: Step, offset: number = 0) => {
        let className = "bg-gray-400";
        switch (step.status) {
            case "approved":
                className = "bg-green-500";
                break;
            case "pending":
                className = "bg-yellow-500";
                break;
            case "rejected":
                className = "bg-red-500";
                break;
            case "processing":
                className = "bg-blue-500";
                break;
            default:
                className = "bg-gray-400";
        }
        return currentStep >= index + offset ? className : "bg-gray-300";
    };
    const isFinalStep = (index: number) => index === numberOfSteps - 1;

    return (
        <div className={clsx("flex items-center", classes?.root)}>
            {Array.from({ length: numberOfSteps }).map((_, index) => (
                <React.Fragment key={index}>
                    <Tooltip
                        classes={{
                            tooltip: "capitalize",
                        }}
                        title={steps[index]?.status ?? ""}
                        placement={index % 2 === 1 ? "top" : "bottom"}>
                        <div
                            className={clsx(
                                `relative h-3 w-3 rounded-full`,
                                activeColor(index, steps[index], -1)
                            )}>
                            <span
                                className={clsx(
                                    "absolute -left-5 w-40 text-sm",
                                    index % 2 === 1 ? "top-3" : "bottom-3"
                                )}>
                                {steps[index]?.label ?? ""}
                            </span>
                            {index === currentStep + 1 && (
                                <span
                                    className={clsx(
                                        "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
                                        activeColor(index, steps[index], -1)
                                    )}
                                />
                            )}
                        </div>
                    </Tooltip>
                    {isFinalStep(index) ? null : (
                        <div
                            className={clsx(
                                `h-1 w-12`,
                                activeColor(index, steps[index])
                            )}
                        />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

export default StepIndicator;
