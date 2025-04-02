import { makeRequest } from "../services/apiClient";

export const approveActivity = async (id: string, approve: boolean) => {
    const response = await makeRequest({
        url: `/user/@me/activities/${id}`,
        method: 'PATCH',
        body: {
            approve
        },
        authorize: true
    });
    const data = response.data;
    if(data.error) throw data.message;
    return;
}
