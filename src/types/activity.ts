import { DeviceOS, DeviceType } from "../controllers/getUserDevices";

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
        app?: string
    };
    type: Activity;
    login_session_id?: string;
    approved: boolean;
    created_at: Date;
}
