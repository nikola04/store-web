import { PlatformType } from "../components/icons/PlatformIcon";
import { Device, DeviceCategory, DeviceCategoryGroup, DeviceOS, DeviceType } from "../controllers/getUserDevices";

export const getDeviceCategory = (type?: DeviceType, os?: DeviceOS): DeviceCategory => {
    if(type === 'Console') return 'Gaming Console';
    if(type === 'SmartTV') return 'Smart TV';
    
    if(os === 'MacOS') return 'Mac Computer';
    if(os === 'Linux') return 'Linux Device';
    if(os === 'IOS'){
        if(type === 'Mobile') return 'iPhone';
        if(type === 'Tablet') return 'iPad';
    }
    if(os === 'Windows'){
        if(type === 'Desktop') return 'Windows Computer';
        if(type === 'Mobile') return 'Windows Phone';
        if(type === 'Tablet') return 'Windows Tablet';
    }
    if(os === 'Android'){
        if(type === 'Mobile') return 'Android Phone';
        if(type === 'Tablet') return 'Android Tablet';
    }
    if(os === 'ChromeOS'){
        if(type === 'Desktop') return 'Chrome Desktop';
        if(type === 'Tablet') return 'Chrome Tablet';
    }

    // Default
    return 'Other';
}

export const groupDevicesByCategory = (devices: Device[]): DeviceCategoryGroup[] => {
    const groups: DeviceCategoryGroup[] = [];
    devices.forEach(device => {
        const category = getDeviceCategory(device.type, device.os);
        let added = false;
        for(const group of groups){
            if(group.category != category) continue;
            group.devices.push(device);
            if(device.name) group.devices_names.push(device.name);
            group.size++;
            added = true;
            break;
        };
        if(added) return;
        groups.push({
            category,
            size: 1,
            devices: [device],
            devices_names: device.name ? [device.name] : []
        });
    });
    return groups;
}

export const getPlatformIconByCategory = (category: DeviceCategory): PlatformType|null => {
    if(category === 'Mac Computer' || category === 'iPhone' || category === 'iPad') return 'mac';
    if(category === 'Windows Computer' || category === 'Windows Phone' || category === 'Windows Tablet') return 'windows';
    if(category === 'Linux Device') return 'linux';
    if(category === 'Gaming Console') return 'gconsole';
    if(category === 'Android Phone' || category === 'Android Tablet') return 'android';
    if(category === 'Smart TV') return 'smarttv';
    return null;
}
