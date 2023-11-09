export interface CreateTokenMintBurnUpdateTransactionInput {
    paymentAddress: string;

    // Separate component lists for transaction types
    tokenMintComponents?: TokenMintComponent[];
    tokenBurnComponents?: TokenBurnComponent[];
    tokenUpdateComponents?: TokenUpdateComponent[];

    // Optional Utxos for cross chain partners
    utxos?: string[];
}

export interface TokenMintComponent {
    tokenId?: string;
    amount?: number;
}

export interface TokenBurnComponent {
    tokenId?: string;
    amount?: number;
}

export interface TokenUpdateComponent {
    tokenId?: string;

    // Data
    name?: string;
    image?: string
    mediaType?: string;
    description?: string;
    ticker?: string;
    logo?: string
    properties?: string;
    tokenDecimals: number;
}
