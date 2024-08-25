import * as React from "react";
// import { useSelector } from "react-redux";
import { Navigate, useOutlet } from "react-router-dom";

import { AuthedRoutes } from "@/constants/route-constants";

const NonAuthRoute: React.FC = () => {
    // const { isAuthed } = useSelector(selectAuth);
    const { isAuthed } = { isAuthed: true };
    const outlet = useOutlet();

    if (isAuthed) {
        return <Navigate to={AuthedRoutes.home} replace />;
    }

    return outlet;
};

export default NonAuthRoute;
