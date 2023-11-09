export interface SaturnError {
    message?: string;
    code?: string;
    link?: string;
}

export const ConnectWalletError = { message: 'Please connect your wallet' } as SaturnError;
export const InvalidInputError = {
    message: 'Invalid transaction input. Please reach out for help in the Saturn Discord server',
    link: 'https://discord.com/invite/NvVNfQmPjp',
} as SaturnError;

export const InvalidTransactionSignatureError = {
    message: 'Invalid transaction signature. Please reach out for help in the Saturn Discord server',
    link: 'https://discord.com/invite/NvVNfQmPjp',
} as SaturnError;
