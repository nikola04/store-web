export interface Location {
    lat?: number;
    lon?: number;
    city?: string;
    country?: string;
}

export type DeviceType = 'Desktop'|'Mobile'|'Tablet'|'SmartTV'|'Console'|'Embedded'|'Wearable'|'XR'
export type DeviceOS = 'MacOS'|'Windows'|'IOS'|'Android'|'Linux'|'ChromeOS'|'Linux'|'Playstation'|'Nintendo'|'Xbox'
export interface Device {
    id: string;
    name?: string;
    type?: DeviceType;
    os?: DeviceOS;
    app?: string;
    logged_out: boolean;
    last_session_id: string;
    last_login_date: Date;
    last_login_ip?: string;
    last_login_location?: Location,
    current_device: boolean;
}

export type DeviceCategory = 'Mac Computer'|'Windows Computer'|'Chrome Desktop'|'iPhone'|'Android Phone'|'Windows Phone'|'iPad'|'Android Tablet'|'Windows Tablet'|'Chrome Tablet'|'Gaming Console'|'Smart TV'|'Linux Device'|'Other'
export interface DeviceCategoryGroup {
    category: DeviceCategory;
    size: number;
    devices: Device[];
    devices_names: string[];
    devices_last_login: Date;
}
