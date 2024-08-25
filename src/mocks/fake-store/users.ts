import { fakerEN_IN as faker } from "@faker-js/faker";

import { NotificationSeverity } from "@/models/responses/notification-data";
import { UserStatus } from "@/models/responses/user-data";
import { UserRole } from "@/models/responses/user-role-data";
import { UserRoles } from "@/models/types";
import { UserScopes } from "@/models/user-scopes";

function createUserRoleData(
    id: number,
    name: UserRoles,
    description: string,
    scopes: UserScopes[],
    canBeDeleted: boolean
) {
    return {
        id,
        name,
        description,
        scopes,
        canBeDeleted,
    };
}

function createUserData(
    id: string,
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    created: string,
    updated: string,
    status: UserStatus,
    role: UserRole,
) {
    return {
        id,
        firstName,
        lastName,
        phone,
        email,
        role,
        created,
        updated,
        status,
    };
}

export const userRoleData = [
    createUserRoleData(
        0,
        "User",
        "This role is of a normal user",
        [

        ],
        false
    ),
    createUserRoleData(
        1,
        "Admin",
        "This role activates partial God Mode, you can do most of the things",
        [
            "users.manage",
            "users.create",
            "users.reset",
            "users.role.view",
            "users.role.edit",
        ],
        false
    ),
    createUserRoleData(
        3,
        "SuperAdmin",
        "This role activates God Mode, you can do anything you want",
        [
            "users.manage",
            "users.create",
            "users.reset",
            "users.delete",
            "users.edit",
            "users.role.view",
            "users.role.reset",
            "users.role.delete",
            "users.role.edit",
        ],
        false
    ),
    createUserRoleData(
        4,
        "HRHead",
        "This role is for HR Head",
        [
            "users.manage",
            "users.create",
            "users.reset",
            "users.delete",
            "users.edit",
            "users.role.view",
            "users.role.reset",
            "users.role.delete",
            "users.role.edit",
        ],
        false
    ),
    createUserRoleData(
        5,
        "CPO",
        "This role is for Chief Procurement Officer",
        [
            "users.manage",
            "users.create",
            "users.reset",
            "users.delete",
            "users.edit",
            "users.role.view",
            "users.role.reset",
            "users.role.delete",
            "users.role.edit",
        ],
        false
    ),
];

export const createUserDatas = (rows: number) =>
    Array.from({ length: rows }, (r) =>
        createUserData(
            faker.string.uuid(),
            faker.person.firstName(),
            faker.person.lastName(),
            faker.phone.number(),
            faker.internet.email(),
            faker.date.anytime()?.toISOString(),
            faker.date.anytime()?.toISOString(),
            faker.helpers.arrayElement<UserStatus>([
                UserStatus.Active,
                UserStatus.Uninitialized,
                UserStatus.Disabled,
            ]),
            faker.helpers.arrayElement<UserRole>([
                UserRole.Admin,
                UserRole.SuperAdmin,
                UserRole.User,
            ])
        )
    );

export const authUsers = {
    user: createUserData(
        faker.string.uuid(),
        faker.person.firstName(),
        faker.person.lastName(),
        faker.phone.number(),
        "standard.user@gmail.com",
        faker.date.anytime()?.toISOString(),
        faker.date.anytime()?.toISOString(),
        UserStatus.Active,
        UserRole.User
    ),
    admin: createUserData(
        faker.string.uuid(),
        faker.person.firstName(),
        faker.person.lastName(),
        faker.phone.number(),
        "admin.user@gmail.com",
        faker.date.anytime()?.toISOString(),
        faker.date.anytime()?.toISOString(),
        UserStatus.Active,
        UserRole.Admin
    ),
    super: createUserData(
        faker.string.uuid(),
        faker.person.firstName(),
        faker.person.lastName(),
        faker.phone.number(),
        "superadmin.user@gmail.com",
        faker.date.anytime()?.toISOString(),
        faker.date.anytime()?.toISOString(),
        UserStatus.Active,
        UserRole.SuperAdmin
    ),
    hrHead: createUserData(
        faker.string.uuid(),
        faker.person.firstName(),
        faker.person.lastName(),
        faker.phone.number(),
        "hr.head@gmail.com",
        faker.date.anytime()?.toISOString(),
        faker.date.anytime()?.toISOString(),
        UserStatus.Active,
        UserRole.HRHead
    ),
    cpo: createUserData(
        faker.string.uuid(),
        faker.person.firstName(),
        faker.person.lastName(),
        faker.phone.number(),
        "cpo@gmail.com",
        faker.date.anytime()?.toISOString(),
        faker.date.anytime()?.toISOString(),
        UserStatus.Active,
        UserRole.CPO
    ),
};

export const allRoles = [
    "users.manage",
    "users.edit",
    "users.delete",
    "users.create",
    "users.reset",
    "users.role.view",
    "users.role.edit",
    "users.role.delete",
    "users.role.reset",
];

function createUserNotification(
    id: string,
    title: string,
    message: string,
    severity: NotificationSeverity,
    type: "approval" | "general",
    date: string,
    read?: boolean,
    data?: any,
    icon?: string,
    url?: string
) {
    return {
        id,
        title,
        message,
        icon,
        severity,
        type,
        date,
        data,
        read,
        url,
    };
}

export const createUserNotifications = (rows: number) =>
    Array.from({ length: rows }, (r, i) =>
        createUserNotification(
            faker.string.uuid(),
            `Notification Title ${i}`,
            `Notification Message ${i}`,
            faker.helpers.arrayElement([
                NotificationSeverity.Warning,
                NotificationSeverity.Error,
                NotificationSeverity.Info,
                NotificationSeverity.Success,
            ]),
            faker.helpers.arrayElement(["approval", "general"]),
            faker.date.past({ refDate: new Date() })?.toISOString(),
            faker.datatype.boolean({ probability: 0.6 })
        )
    );
