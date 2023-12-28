export interface GetPotentialRewardsWithPendingInput {
    stakeProjectId?: string;
    nftStakeRewardWithPendingInputs?: NFTStakeRewardInput[];
}

export interface NFTStakeRewardInput {
    policyId?: string;
    assetName?: string;
}
