import { SaturnError } from '@/types/Classes/saturnError';

export interface SubmitNFTMintBurnUpdateTransactionPayload {
    transactionIds?: string[];
    error?: SaturnError;
}
