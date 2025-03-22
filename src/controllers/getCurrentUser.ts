import { makeRequest } from "../services/apiClient";
import { User } from "../types/user";

export const getCurrentUser = async (): Promise<User> => {
    const response = await makeRequest({
        url: '/user/@me',
        method: 'GET',
        authorize: true
    });
    const data = response.data;
    if(data.error || !data.user) throw data.message;
    return data.user as User;
}
