import { makeRequest } from "../services/apiClient";

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
    last_login: Date;
    last_login_location?: Location,
    current_device: boolean;
}

export type DeviceCategory = 'Mac Computer'|'Windows Computer'|'Chrome Desktop'|'iPhone'|'Android Phone'|'Windows Phone'|'iPad'|'Android Tablet'|'Windows Tablet'|'Chrome Tablet'|'Gaming Console'|'Smart TV'|'Linux Device'|'Other'
export interface DeviceCategoryGroup {
    category: DeviceCategory;
    size: number;
    devices: Device[];
    devices_names: string[];
}

export const getUserDevices = async (): Promise<Device[]> => {
    const response = await makeRequest({
        url: '/user/@me/devices',
        method: 'GET',
        authorize: true
    });
    const data = response.data;
    if(data.error || !data.devices) throw data.message;
    return data.devices as Device[];
}
