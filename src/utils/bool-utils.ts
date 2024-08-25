import { BoolExp, BoolExpNot } from "@/models/bool-exp";
import { UserScopes } from "@/models/user-scopes";

export type UnionExp<T = unknown> = T | BoolExp<T> | BoolExpNot<T>;
type UnionExpWithoutNot<T = unknown> = T | BoolExp<T>;

export const orGen = <T>(...oprands: UnionExp<T>[]): BoolExp<T> => ({
    op: "|",
    opr: oprands,
});
export const andGen = <T>(...oprands: UnionExp<T>[]): BoolExp<T> => ({
    op: "&",
    opr: oprands,
});
export const notGen = <T>(oprand: UnionExpWithoutNot<T>): BoolExpNot<T> => ({
    op: "!",
    opr: oprand,
});

export const or = (...oprands: UnionExp<UserScopes>[]) =>
    orGen<UserScopes>(...oprands);
export const and = (...oprands: UnionExp<UserScopes>[]) =>
    andGen<UserScopes>(...oprands);
export const not = (oprand: UnionExpWithoutNot<UserScopes>) =>
    notGen<UserScopes>(oprand);

export const evaluate = (
    scopes: UserScopes[],
    exp: UnionExp<UserScopes>
): boolean => {
    if (typeof exp === "string") {
        return scopes.includes(exp);
    }
    if ("op" in exp && exp.op === "|") {
        return exp.opr
            .map((r) => evaluate(scopes, r))
            .reduce((acc, val) => acc || val, false);
    }
    if ("op" in exp && exp.op === "&") {
        return exp.opr
            .map((r) => evaluate(scopes, r))
            .reduce((acc, val) => acc && val, true);
    }
    if ("op" in exp && exp.op === "!") {
        return !evaluate(scopes, exp.opr);
    }
    return false;
};
