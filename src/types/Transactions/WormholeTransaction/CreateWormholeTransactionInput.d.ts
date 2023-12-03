export interface CreateWormholeTransactionInput {
    paymentAddress: string;

    // Separate component lists for transaction types
    wormholeComponents?: WormholeComponent[];
    wormholeMintComponents?: WormholeMintComponent[];

    // Payment Data
    paymentTokens?: string[] | null;

    // Optional Utxos for cross chain partners
    candidateUtxos?: string[];
}

export interface WormholeComponent {
    nftProjectId?: string;
    nftId?: string;

    // Price Data
    price?: TransactionPrice;
}

export interface WormholeMintComponent {
    nftProjectId?: string;
    nftId?: string;

    // Price Data
    price?: TransactionPrice;
}
