import { UserRoles } from "../types";
import { UserRole } from "./user-role-data";

export interface UserData {
    status: UserStatus;
    password: string | null;
    firstName: string;
    lastName: string;
    role: UserRole;
    phone: string | null;
    email: string;
    created?: string;
    updated?: string;
}

export enum UserStatus {
    Active,
    Disabled,
    Uninitialized,
}
