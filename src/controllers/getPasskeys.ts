import { makeRequest } from "../services/apiClient";
import { IPasskey } from "../types/user";

export const getPasskeys = async (): Promise<IPasskey[]> => {
    const response = await makeRequest({
        url: `/account/security/passkeys`,
        method: 'GET',
        authorize: true
    });
    const data = response.data;
    if(data.error || !data.passkeys) throw data.message;
    const passkeys = data.passkeys as IPasskey[];
    return passkeys.map((passkey) => ({ ...passkey, created_at: new Date(passkey.created_at) }));
}
