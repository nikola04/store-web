import { DeviceOS, DeviceType, Location } from "../controllers/getUserDevices";

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
    session?: {
        ip?: string;
        location?: Location;
    },
    approved: boolean|null;
    created_at: Date;
}
