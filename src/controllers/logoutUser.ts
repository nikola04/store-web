import { makeRequest } from "../services/apiClient";

export const logoutUser = async (): Promise<void> => {
    const response = await makeRequest({
        url: '/auth/logout',
        method: 'POST',
        authorize: true
    });
    const data = response.data;
    if(data.error) throw data.message;
    return;
}
