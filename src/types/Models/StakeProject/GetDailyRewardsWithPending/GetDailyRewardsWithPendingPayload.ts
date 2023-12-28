import { SaturnError } from '@/types/Classes/saturnError';

export interface GetDailyRewardsWithPendingPayload {
    nftDailyStakeRewardsWithPendingPayloads?: NFTDailyStakeRewardWithPendingPayload[];
    error?: SaturnError;
}

export interface NFTDailyStakeRewardWithPendingPayload {
    stakeProjectId?: string;
    policyId?: string;
    assetName?: string;
    rewards?: number;
    active_utxo_status?: string;
    spend_utxo_status?: string;
}
