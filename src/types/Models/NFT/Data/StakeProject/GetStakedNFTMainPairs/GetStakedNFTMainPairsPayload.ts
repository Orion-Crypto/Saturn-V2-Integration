import { SaturnError } from '@/types/Classes/saturnError';

export interface GetStakedNFTMainPairsPayload {
    stakedNFTPairPayloads?: StakedNFTMainPairPayload[];
    error?: SaturnError;
}

export interface StakedNFTMainPairPayload {
    stakeProjectId?: string;
    mainPolicyId?: string;
    mainAssetName?: string;
    partnerPolicyId?: string;
    partnerAssetName?: string;
}
