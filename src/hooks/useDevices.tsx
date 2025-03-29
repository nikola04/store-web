import { useEffect, useState } from "react";
import { Device, getUserDevices } from "../controllers/getUserDevices";

export const useDevices = () => {
    const [devices, setDevices] = useState<Device[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const fetchDevices = async () => {
        try {
            const devices = await getUserDevices();
            setDevices(devices);
        } catch (error) {
            console.error("Failed to fetch logins", error);
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
