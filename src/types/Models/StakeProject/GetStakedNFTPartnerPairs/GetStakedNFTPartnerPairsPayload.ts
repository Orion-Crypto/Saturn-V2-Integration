import { SaturnError } from '@/types/Classes/saturnError';

export interface GetStakedNFTPartnerPairsPayload {
    stakedNFTPairPayloads?: StakedNFTPartnerPairPayload[];
    error?: SaturnError;
}

export interface StakedNFTPartnerPairPayload {
    stakeProjectId?: string;
    mainPolicyId?: string;
    mainAssetName?: string;
    partnerPolicyId?: string;
    partnerAssetName?: string;
}
