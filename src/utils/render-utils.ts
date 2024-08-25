import React from "react";

import { UserRoles } from "@/models/types";
import { UserScopes } from "@/models/user-scopes";

import { evaluate, UnionExp } from "./bool-utils";

export const renderIf = (condition: boolean) => (node: React.ReactNode) =>
    condition && node;
export const renderNodesIf =
    (condition: boolean) =>
    (...nodes: React.ReactNode[]) =>
        condition ? nodes : [];

export const renderIfUserRoles =
    (acceptRoles: UserRoles[], userRoles: UserRoles) =>
    (node: React.ReactNode) =>
        renderIf(acceptRoles.includes(userRoles))(node);
export const renderIfNotUserRoles =
    (acceptRoles: UserRoles[], userRoles: UserRoles) =>
    (node: React.ReactNode) =>
        renderIf(!acceptRoles.includes(userRoles))(node);

export const renderNodesIfUserRoles =
    (acceptRoles: UserRoles[], userRoles: UserRoles) =>
    (...nodes: React.ReactNode[]) =>
        renderNodesIf(acceptRoles.includes(userRoles))(nodes);
export const renderNodesIfNotUserRoles =
    (acceptRoles: UserRoles[], userRoles: UserRoles) =>
    (...nodes: React.ReactNode[]) =>
        renderNodesIf(!acceptRoles.includes(userRoles))(nodes);

export const renderIfUserScopes =
    (acceptScopes: UnionExp<UserScopes>, userScopes: UserScopes[]) =>
    (node: React.ReactNode) =>
        renderIf(evaluate(userScopes, acceptScopes))(node);
export const renderIfNotUserScopes =
    (acceptScopes: UnionExp<UserScopes>, userScopes: UserScopes[]) =>
    (node: React.ReactNode) =>
        renderIf(!evaluate(userScopes, acceptScopes))(node);

export const renderNodesIfUserScopes =
    (acceptScopes: UnionExp<UserScopes>, userScopes: UserScopes[]) =>
    (...nodes: React.ReactNode[]) =>
        renderNodesIf(evaluate(userScopes, acceptScopes))(nodes);
export const renderNodesIfNotUserScopes =
    (acceptScopes: UnionExp<UserScopes>, userScopes: UserScopes[]) =>
    (...nodes: React.ReactNode[]) =>
        renderNodesIf(!evaluate(userScopes, acceptScopes))(nodes);
