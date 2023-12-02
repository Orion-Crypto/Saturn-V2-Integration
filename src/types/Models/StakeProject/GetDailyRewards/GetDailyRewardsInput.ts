export interface GetDailyRewardsInput {
    stakeProjectId?: string;
    nftDailyStakeRewardInputs?: NFTDailyStakeRewardInput[];
}

export interface NFTDailyStakeRewardInput {
    policyId?: string;
    assetName?: string;
}
