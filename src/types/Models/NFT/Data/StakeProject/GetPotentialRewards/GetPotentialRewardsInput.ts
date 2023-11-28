export interface GetPotentialRewardsInput {
    stakeProjectId?: string;
    nftStakeRewardInputs?: NFTStakeRewardInput[];
}

export interface NFTStakeRewardInput {
    policyId?: string;
    assetName?: string;
}
