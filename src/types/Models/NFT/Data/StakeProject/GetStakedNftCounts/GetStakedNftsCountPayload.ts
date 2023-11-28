import { SaturnError } from '@/types/Classes/saturnError';

export interface GetStakedNFTCountsPayload {
    stakedNftCounts?: { [key: string]: number };
    error?: SaturnError;
}
