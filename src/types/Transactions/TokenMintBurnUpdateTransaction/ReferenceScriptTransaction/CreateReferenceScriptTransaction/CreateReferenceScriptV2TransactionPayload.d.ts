import { SaturnError } from '@/types/Classes/saturnError';

export interface CreateReferenceScriptV2TransactionPayload {
    successTransactions?: SuccessTransaction[];
    failTransactions?: FailTransaction[];
    error?: SaturnError;
}
