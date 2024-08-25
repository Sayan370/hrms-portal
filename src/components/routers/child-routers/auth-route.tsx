import { FC, PropsWithChildren } from "react";
import { selectAuth, selectUser } from "@/stores/modules/authentication";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { GaurdRouteProps } from "@/models/gaurd-route-props";
import { NonAuthedRoutes } from "@/constants/route-constants";
import { isUserRoleAllowed, isUserScopeAllowed } from "@/utils/route-utils";
import { Loading } from "@/components/loading";

const AuthRoute: FC<PropsWithChildren<GaurdRouteProps>> = ({
    children,
    route,
}) => {
    const { isAuthed } = useSelector(selectAuth);
    const { user } = useSelector(selectUser);
    const { loading } = useSelector(selectUser);

    if (
        !isAuthed ||
        (route.guard &&
            user &&
            !(
                isUserRoleAllowed(route.guard, user.role) ||
                isUserScopeAllowed(route.guard, user.scp)
            ))
    ) {
        return (
            <Navigate
                replace
                to={{
                    pathname: NonAuthedRoutes.login,
                    // state: { from: props.location },
                }}
            />
        );
    }

    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{!loading ? children : <Loading grow color="success" />}</>;
};

export default AuthRoute;
