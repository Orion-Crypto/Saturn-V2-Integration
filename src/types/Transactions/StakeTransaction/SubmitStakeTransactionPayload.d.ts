import { SaturnError } from '@/types/Classes/saturnError';

export interface SubmitStakeTransactionPayload {
    transactionIds?: string[];
    error?: SaturnError;
}
