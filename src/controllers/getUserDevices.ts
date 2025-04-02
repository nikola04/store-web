import { makeRequest } from "../services/apiClient";
import { Device } from "../types/device";

export const getUserDevices = async (): Promise<Device[]> => {
    const response = await makeRequest({
        url: '/user/@me/devices',
        method: 'GET',
        authorize: true
    });
    const data = response.data;
    if(data.error || !data.devices) throw data.message;
    const devices = data.devices as Device[];
    return devices.map(device => ({ ...device, last_login_date: new Date(device.last_login_date) }));
}

export const getUserDevice = async (id: string): Promise<Device> => {
    const response = await makeRequest({
        url: `/user/@me/devices/${id}`,
        method: 'GET',
        authorize: true
    });
    const data = response.data;
    if(data.error || !data.device) throw data.message;
    const device = data.device as Device;
    return ({ ...device, last_login_date: new Date(device.last_login_date) });
}
