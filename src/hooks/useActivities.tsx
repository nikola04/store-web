import { useEffect, useState } from "react";
import { IActivity } from "../types/activity";
import { getUserActivities } from "../controllers/getUserActivities";

export const useActivities = ({ limit }: { limit?: number }) => {
    const [activities, setActivities] = useState<IActivity[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchActivity = async () => {
            try {
                const activities = await getUserActivities(limit);
                setActivities(activities);
            } catch (error) {
                console.error("Failed to fetch logins", error);
            } finally {
                setLoading(false);
            }
        };
        
        setLoading(true);
        fetchActivity();
    }, [limit]);
    
    return ({ activities, loading });
}
