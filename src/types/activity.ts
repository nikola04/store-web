import { DeviceOS, DeviceType, Location } from "./device";

export enum Activity{
    LOGIN = 'login'
}

export interface IActivity {
    id: string;
    device_id: string;
    device?: {
        name?: string,
        type?: DeviceType,
        os?: DeviceOS,
        app?: string,
        current_device: boolean
    };
    type: Activity;
    login_session_id?: string;
    location?: Location;
    ip?: string;
    approved: boolean|null;
    created_at: Date;
}
