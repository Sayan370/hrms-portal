import { UnionExp } from "@/utils/bool-utils";

import { UserRoles } from "./types";
import { UserScopes } from "./user-scopes";

// TODO: Redefine types in such a way that both allowed and except flag of same entity cannot be present
export interface RouteGuard {
    allowedRoles?: UserRoles[];
    exceptRoles?: UserRoles[];
    allowedScopes?: UnionExp<UserScopes>;
}
