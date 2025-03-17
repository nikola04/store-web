import { createAPIClient } from "../services/apiClient";

type User = {
    id: string;
    name: string|null;
    email: string;
    created_at: Date;
    updated_at: Date;
}

export const getCurrentUser = async (signal?: AbortSignal): Promise<User> => {
    const apiClient = createAPIClient();
    const response = await apiClient.request({
        url: '/user/@me',
        method: 'GET',
        signal
    });
    const data = response.data;
    if(data.error || !data.user) throw data.message;
    return data.user as User;
}
