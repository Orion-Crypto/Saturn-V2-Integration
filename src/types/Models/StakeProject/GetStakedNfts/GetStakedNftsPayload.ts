import { SaturnError } from '@/types/Classes/saturnError';

export interface GetStakedNFTsPayload {
    nfts?: StakedNFT[];
    error?: SaturnError;
}

export interface StakedNFT {
    policyId?: string;
    assetName?: string;
    rewardsAccumulated?: number;
    daysStaked?: number;
}
