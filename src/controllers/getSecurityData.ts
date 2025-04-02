import { makeRequest } from "../services/apiClient";
import { ISecurityData } from "../types/security";

export const getSecurityData = async (): Promise<ISecurityData> => {
    const response = await makeRequest({
        url: `/account/security/`,
        method: 'GET',
        authorize: true
    });
    const data = response.data;
    if(data.error || !data.security_data) throw data.message;
    const securityData = data.security_data as ISecurityData;
    const lastPswdChange = securityData.last_password_change != null ? new Date(securityData.last_password_change) : null;
    return ({ ...securityData, last_password_change: lastPswdChange });
}
