import { SaturnError } from '@/types/Classes/saturnError';

export interface GetPotentialRewardsPayload {
    nftStakeRewardsPayloads?: NFTStakeRewardPayload[];
    error?: SaturnError;
}

export interface NFTStakeRewardPayload {
    stakeProjectId?: string;
    policyId?: string;
    assetName?: string;
    rewards?: number;
    spend_utxo_status?: string;
}
