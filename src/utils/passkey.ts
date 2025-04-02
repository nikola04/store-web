import { stringToArrayBuffer } from "./helpers";

export const createPasskey = async (options: PublicKeyCredentialCreationOptions) => {
    const publicKey = {
        ...options,
        challenge: typeof options.challenge === 'string' ? stringToArrayBuffer(options.challenge) : options.challenge,
        user: {
            ...options.user,
            id: typeof options.user.id === 'string' ? stringToArrayBuffer(options.user.id) : options.user.id
        },
        excludeCredentials: options.excludeCredentials?.map((cred) => ({
            ...cred,
            id: typeof cred.id === 'string' ? stringToArrayBuffer(cred.id) : cred.id
        })) || []
    };            
    const attestation = await navigator.credentials.create({ publicKey });
    return attestation;
}
