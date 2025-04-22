export interface RegisterForm {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface LoginForm {
    username: string;
    password: string;
}

export interface ResetPasswordForm {
    email: string;
    verifyCode: string;
    newPassword: string;
    confirmPassword: string;
}