// import { useSelector } from "react-redux";
import { FC } from "react";
import { Navigate, useOutlet } from "react-router-dom";

import { NonAuthedRoutes } from "@/constants/route-constants";

// import { selectAuth } from "../../store/modules/authentication";

const AuthRoute: FC = () => {
    // const { isAuthed } = useSelector(selectAuth);
    const { isAuthed } = { isAuthed: true };
    const outlet = useOutlet();

    if (!isAuthed) {
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

    return outlet;
};

export default AuthRoute;
