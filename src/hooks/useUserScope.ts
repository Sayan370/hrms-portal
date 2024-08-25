import { useMemo } from "react";
import { selectUser } from "@/stores/modules/authentication";
import { useSelector } from "react-redux";

import { UserScopes } from "@/models/user-scopes";
import { evaluate, UnionExp } from "@/utils/bool-utils";

const useUserScope = (scopes: UnionExp<UserScopes>) => {
    const { user } = useSelector(selectUser);
    const allowed = useMemo(
        () => (user?.scp ? evaluate(user?.scp, scopes) : false),
        [user]
    );
    return {
        shouldShow: allowed,
        disabled: !allowed,
    };
};

export default useUserScope;
