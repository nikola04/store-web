import { makeRequest } from "../services/apiClient";
import { IActivity } from "../types/activity";

export const getUserActivities = async (limit: number = 10): Promise<IActivity[]> => {
    const response = await makeRequest({
        url: `/user/@me/activities?limit=${limit}`,
        method: 'GET',
        authorize: true
    });
    const data = response.data;
    if(data.error || !data.activities) throw data.message;
    return data.activities as IActivity[];
}

export const getUserActivity = async (id: string): Promise<IActivity> => {
    const response = await makeRequest({
        url: `/user/@me/activities/${id}`,
        method: 'GET',
        authorize: true
    });
    const data = response.data;
    if(data.error || !data.activity) throw data.message;
    return data.activity as IActivity;
}
