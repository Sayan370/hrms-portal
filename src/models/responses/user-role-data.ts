export interface UserRoleData {
    description: string;
    scopes: string[];
    name: string;
    canBeDeleted: boolean;
    id: number;
}

export enum UserRole {
    User,
    Admin,
    SuperAdmin,
    HRHead,
    CPO,
    // APIUser,
}
