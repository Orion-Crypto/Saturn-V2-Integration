export interface UpdateNFTProjectInput {
    // Basic Data
    nftProjectId?: string;
    name?: string;

    // Price Data
    mintPrices?: PriceData[];
    updatePrices?: PriceData[];
    burnPrices?: PriceData[];

    // Project Data
    lockAfterDatetime?: Date | null;
    mintEnd?: Date | null;

    // Dynamic Data
    updateProjectOwnerKeysRequired?: number | null;
    updateRequiresNFTOwner?: boolean | null;

    // Royalties
    nftProjectRoyaltyRecipients?: UpdateNFTProjectRoyaltyRecipient[];

    // NFT Project Mint
    maxPerTransaction?: number;
    maxPerWallet?: number;
}

export interface UpdateNFTProjectRoyaltyRecipient {
    royaltyAddress?: string | null;
    royaltyPercent?: number | null;
    minLovelaceRoyalty?: number | null;
    maxLovelaceRoyalty?: number | null;
}
