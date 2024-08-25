export interface LoginCredential {
    username: string;
    password: string;
    rememberMe: boolean;
}

export interface ResetPassData {
    requestHash: string;
    oldPassword: string;
    newPassword: string;
}
