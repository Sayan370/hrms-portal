import { UserRoles } from "./types";
import { UserScopes } from "./user-scopes";

export interface AccountUser {
    given_name: string;
    family_name: string;
    email: string;
    phone_number: string;
    // sub: string,
    role: UserRoles;
    gender: string;
    id: string;
    picture: string;
    jti: string;
    scp: UserScopes[];
    nbf: number;
    exp: number;
    iat: number;
    iss: string;
    aud: string;
    cust_id?: string | null;
    building_code?: string | null;
}
