import { SaturnError } from '@/types/Classes/saturnError';
export interface SubmitReferenceScriptV2TransactionPayload {
    transactionIds?: string[];
    error?: SaturnError;
}
