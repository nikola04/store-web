export interface ISecurityData{
    verified_email: boolean,
    enabled_2fa: boolean,
    last_password_change: Date|null,
    passkeys_count: number
}
