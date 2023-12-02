import { SaturnError } from '@/types/Classes/saturnError';

export interface DeleteNFTPayload {
    nftProject: any;
    nfts: any;
    error: SaturnError;
}
