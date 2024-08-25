import { DependencyList, useEffect, useRef, useState } from "react";

interface PollingEffectOptions {
    /**
     * Callback function to be called after lapsed interval time. Default: 10 seconds
     */
    interval?: number;
    /**
     * Number of attempts before timeout. Default: 10
     */
    maxTimesToPoll?: number;
    /**
     * Callback function to be called on Cleanup
     */
    onCleanUp?: () => void;
    /**
     * Callback function to be called on Timeout
     */
    onTimeout?: () => void;
    /**
     * callback function to be called once on mount
     */
    spawnFromMount?: boolean;
    /**
     * Ignore the first polling interval
     */
    ignoreLeadingPoll?: boolean;
}

function usePollingEffect(
    asyncCallback: () => Promise<void>,
    dependencies: DependencyList = [],
    options: PollingEffectOptions = {
        interval: 10_000, // 10 seconds,
        onCleanUp: () => {},
        onTimeout: () => {},
        maxTimesToPoll: 10,
        spawnFromMount: false,
        ignoreLeadingPoll: true,
    }
) {
    const {
        interval = 10_000,
        onCleanUp = () => {},
        onTimeout = () => {},
        maxTimesToPoll = 10,
        spawnFromMount = false,
        ignoreLeadingPoll = true,
    } = options;
    const [dead, kill] = useState(!spawnFromMount);
    const pollingTime = useRef(0);
    const prevCycleTimedout = useRef(false);
    const timeoutIdRef = useRef<number | undefined>();
    useEffect(() => {
        if (dead || prevCycleTimedout.current) {
            prevCycleTimedout.current = false;
            return () => {};
        }
        let stopped = false;
        // Side note: preceding semicolon needed for IIFEs.
        (async function pollingCallback() {
            try {
                if (
                    ignoreLeadingPoll
                        ? pollingTime.current > maxTimesToPoll
                        : pollingTime.current >= maxTimesToPoll
                ) {
                    stopped = true;
                    pollingTime.current = 0;
                    onTimeout();
                    prevCycleTimedout.current = true;
                    kill(true);
                    throw new Error("Number of attempts exceeded.");
                }
                if (pollingTime.current === 0) {
                    if (!ignoreLeadingPoll) {
                        await asyncCallback();
                    }
                } else {
                    await asyncCallback();
                }
                pollingTime.current++;
            } finally {
                // Set timeout after it finished, unless stopped
                timeoutIdRef.current =
                    !stopped &&
                    (ignoreLeadingPoll
                        ? pollingTime.current - 1 <= maxTimesToPoll
                        : pollingTime.current - 1 < maxTimesToPoll)
                        ? (setTimeout(
                              pollingCallback,
                              interval
                          ) as unknown as number)
                        : undefined;
            }
        })();
        // Clean up if dependencies change
        return () => {
            stopped = true; // prevent racing conditions
            pollingTime.current = 0;
            clearTimeout(timeoutIdRef.current);
            onCleanUp();
        };
    }, [...dependencies, interval, dead]);

    return [() => kill(true), () => kill(false)];
}

export default usePollingEffect;
