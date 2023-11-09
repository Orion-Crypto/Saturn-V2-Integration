export interface CreateRandomNFTMintTransactionInput {
    nftProjectId: string;
    paymentAddress: string;
    count: number;
    paymentTokens: string[];

    // Other Data
    candidateUtxos?: string[];
    passwords?: string[];
    gReCaptchaToken: string;
}
