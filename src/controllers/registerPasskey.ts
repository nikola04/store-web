import { makeRequest } from "../services/apiClient";
import { IPasskey } from "../types/user";

export const startPasskeyRegistration = async (): Promise<PublicKeyCredentialCreationOptions> => {
    const response = await makeRequest({
        url: '/account/security/passkeys/start',
        method: 'POST',
        authorize: true
    });
    const data = response.data;
    if(data.error || !data.options) throw data.message;
    const options = data.options as PublicKeyCredentialCreationOptions;
    return options;
}

export const verifyPasskeyRegistration = async (attestationResponse: unknown): Promise<IPasskey> => {
    const response = await makeRequest({
        url: '/account/security/passkeys/verify',
        method: 'POST',
        authorize: true,
        body: {
            attestationResponse
        }
    });
    const data = response.data;
    if(data.error || !data.passkey) throw data.message;
    const passkey = data.passkey as IPasskey;
    return ({ ...passkey, created_at: new Date(passkey.created_at) });
}
