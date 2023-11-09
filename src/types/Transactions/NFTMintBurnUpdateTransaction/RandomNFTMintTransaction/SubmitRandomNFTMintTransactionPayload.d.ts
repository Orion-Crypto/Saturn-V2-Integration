import { SaturnError } from '@/types/Classes/saturnError';

export interface SubmitRandomNFTMintTransactionPayload {
    transactionIds?: string[];
    error?: SaturnError;
}
