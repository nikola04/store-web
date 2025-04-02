import { makeRequest } from "../services/apiClient";
import { IActivity } from "../types/activity";

export const getActivities = async (limit: number = 10): Promise<IActivity[]> => {
    const response = await makeRequest({
        url: `/account/activities?limit=${limit}`,
        method: 'GET',
        authorize: true
    });
    const data = response.data;
    if(data.error || !data.activities) throw data.message;
    const activities = data.activities as IActivity[];
    return activities.map((activity) => ({ ...activity, created_at: new Date(activity.created_at) }));
}

export const getActivity = async (id: string): Promise<IActivity> => {
    const response = await makeRequest({
        url: `/account/activities/${id}`,
        method: 'GET',
        authorize: true
    });
    const data = response.data;
    if(data.error || !data.activity) throw data.message;
    const activity = data.activity as IActivity;
    return ({ ...activity, created_at: new Date(activity.created_at) });
}
