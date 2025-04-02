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

export const logoutSession = async (sessionId: string) => {
    const response = await makeRequest({
        url: `/account/sessions/${sessionId}`,
        method: 'DELETE',
        authorize: true
    })
    const data = response.data;
    if(data.error) throw data.message;
    return;
}
