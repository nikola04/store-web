import { useEffect, useState } from "react";
import { IActivity } from "../types/activity";
import { getActivities, getActivity } from "../controllers/getActivities";

export const useActivities = ({ limit }: { limit?: number }) => {
    const [activities, setActivities] = useState<IActivity[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchActivity = async () => {
            try {
                const activities = await getActivities(limit);
                setActivities(activities);
            } catch (error) {
                console.error("Failed to fetch activities", error);
            } finally {
                setLoading(false);
            }
        };
        
        setLoading(true);
        fetchActivity();
    }, [limit]);
    
    return ({ activities, loading });
}

export const useActivitiy = ({ id }: { id?: string }) => {
    const [activity, setActivity] = useState<IActivity|null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if(!id) return;
        const fetchActivity = async () => {
            try {
                const activities = await getActivity(id);
                setActivity(activities);
            } catch (error) {
                console.error("Failed to fetch activity", error);
            } finally {
                setLoading(false);
            }
        };
        
        setLoading(true);
        fetchActivity();
    }, [id]);

    const updateApproval = (state: boolean) => {
        setActivity(prev => prev && ({
            ...prev,
            approved: state
        }));
    };
    
    return ({ activity, loading, updateApproval });
}
