import React, { FC, PropsWithChildren, Suspense } from "react";

import { Loading } from "../loading";

const SuspendedPage = ({ children }: PropsWithChildren) => (
    <Suspense fallback={<Loading grow color="info" />}>{children}</Suspense>
);

export default SuspendedPage;
