export interface GetDailyRewardsWithPendingInput {
    stakeProjectId?: string;
    nftDailyStakeRewardWithPendingInputs?: NFTDailyStakeRewardInput[];
}

export interface NFTDailyStakeRewardInput {
    policyId?: string;
    assetName?: string;
}
