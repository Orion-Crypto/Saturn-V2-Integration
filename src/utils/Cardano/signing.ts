export const getMessageToSign = (nonce: string) => {
    return `Sign in to view account data. Verification: ${nonce}`;
};
