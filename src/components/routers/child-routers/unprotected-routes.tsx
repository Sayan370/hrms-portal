import React from "react";
import { selectUser } from "@/stores/modules/authentication";
import { useSelector } from "react-redux";

import { Loading } from "@/components/loading";

const UnprotectedRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { loading } = useSelector(selectUser);

    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{!loading ? children : <Loading grow color="secondary" />}</>;
};

export default UnprotectedRoute;
