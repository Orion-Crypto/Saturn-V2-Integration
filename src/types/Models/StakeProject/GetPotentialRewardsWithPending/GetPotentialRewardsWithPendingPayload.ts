import { SaturnError } from '@/types/Classes/saturnError';

export interface GetPotentialRewardsWithPendingPayload {
    nftStakeRewardsWithPendingPayloads?: NFTStakeRewardPayload[];
    error?: SaturnError;
}

export interface NFTStakeRewardPayload {
    stakeProjectId?: string;
    policyId?: string;
    assetName?: string;
    rewards?: number;
    daysStaked?: number;
    active_utxo_status?: string;
    spend_utxo_status?: string;
}
