import { UserScopes } from "./user-scopes";

export interface BoolExp<T> {
    op: "|" | "&";
    opr: (T | BoolExp<T> | BoolExpNot<T>)[];
}

export interface BoolExpNot<T> {
    op: "!";
    opr: T | BoolExp<T>;
}
