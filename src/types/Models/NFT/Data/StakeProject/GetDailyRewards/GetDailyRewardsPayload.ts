import { SaturnError } from '@/types/Classes/saturnError';

export interface GetDailyRewardsPayload {
    nftDailyStakeRewardsPayloads?: NFTDailyStakeRewardPayload[];
    error?: SaturnError;
}

export interface NFTDailyStakeRewardPayload {
    stakeProjectId?: string;
    policyId?: string;
    assetName?: string;
    rewards?: number;
}
