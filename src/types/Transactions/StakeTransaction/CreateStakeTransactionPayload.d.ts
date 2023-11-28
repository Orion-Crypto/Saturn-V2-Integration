import { SaturnError } from '@/types/Classes/saturnError';

export interface CreateStakeTransactionPayload {
    successTransactions?: SuccessTransaction[];
    failTransactions?: FailTransaction[];
    error?: SaturnError;
}
