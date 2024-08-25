import React, { FC, PropsWithChildren } from "react";
import { selectAuth, selectUser } from "@/stores/modules/authentication";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { GaurdRouteProps } from "@/models/gaurd-route-props";
import { AuthedRoutes } from "@/constants/route-constants";
import { Loading } from "@/components/loading";

const NonAuthRoute: FC<PropsWithChildren<GaurdRouteProps>> = ({ children }) => {
    const { isAuthed } = useSelector(selectAuth);
    const { loading } = useSelector(selectUser);

    if (isAuthed) {
        return <Navigate to={AuthedRoutes.home} replace />;
    }

    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{!loading ? children : <Loading grow color="info" />}</>;
};

export default NonAuthRoute;
