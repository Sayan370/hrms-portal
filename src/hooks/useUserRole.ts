import { useMemo } from "react";
import { selectUser } from "@/stores/modules/authentication";
import { useSelector } from "react-redux";

import { RouteGuard } from "@/models/route-guard";
import { isUserRoleAllowed } from "@/utils/route-utils";

type UserRoleGaurd = Pick<RouteGuard, "allowedRoles" | "exceptRoles">;

const useUserRole = (gaurds: UserRoleGaurd) => {
    const { user } = useSelector(selectUser);
    const allowed = useMemo(
        () => (user?.role ? isUserRoleAllowed(gaurds, user.role) : false),
        [user]
    );
    return {
        shouldShow: allowed,
        disabled: !allowed,
    };
};

export default useUserRole;
