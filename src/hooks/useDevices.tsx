import { useEffect, useState } from "react";
import { getUserDevice, getUserDevices } from "../controllers/getUserDevices";
import { Device } from "../types/device";

export const useDevices = () => {
    const [devices, setDevices] = useState<Device[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const fetchDevices = async () => {
        try {
            const devices = await getUserDevices();
            setDevices(devices);
        } catch (error) {
            console.error("Failed to fetch devices", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        setLoading(true);
        fetchDevices();
    }, []);
    return ({ devices, loading });
}

export const useDevice = ({ id }: { id?: string }) => {
    const [device, setDevice] = useState<Device|null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const fetchDevices = async () => {
            if(!id) return;
            try {
                const device = await getUserDevice(id);
                setDevice(device);
            } catch (error) {
                console.error("Failed to fetch device", error);
            } finally {
                setLoading(false);
            }
        };

        setLoading(true);
        fetchDevices();
    }, [id]);
    const logoutDevice = () => setDevice((device) => {
        if(!device) return device;
        return ({ ...device, logged_out: true })
    });
    return ({ device, loading, logoutDevice });
}
