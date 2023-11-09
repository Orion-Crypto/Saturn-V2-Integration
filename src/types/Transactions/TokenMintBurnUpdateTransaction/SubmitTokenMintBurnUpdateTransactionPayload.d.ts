import { SaturnError } from '@/types/Classes/saturnError';

export interface SubmitTokenMintBurnUpdateTransactionPayload {
    transactionIds?: string[];
    error?: SaturnError;
}
