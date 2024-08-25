/* eslint-disable no-undef */
const remoteLogger = new ComlinkWorker<typeof import("./remote-logger/worker")>(
    new URL("./remote-logger/worker", import.meta.url)
);
export { remoteLogger };
