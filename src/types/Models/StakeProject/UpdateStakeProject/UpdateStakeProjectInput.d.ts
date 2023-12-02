export interface UpdateStakeProjectInput {
    // Basic Data
    stakeProjectId?: string;

    // Stake Distribution Data
    name?: string | null;
    primaryStakingPolicyId?: string | null;
    totalDistribution?: number | null;
    totalRemainingDistribution?: number | null;
    dailyNFTDistribution?: number | null;
    dailySecondaryNFTDistribution?: number | null;

    // Token Data
    tokenPolicyId?: string | null;
    tokenAssetName?: string | null;
    tokenDecimals?: number | null;

    // Price Data
    prices?: PriceData[];

    // Fees
    platformFeePercent?: number | null;
    platformFeeBase?: number | null;
}
