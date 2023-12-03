import { SaturnError } from '@/types/Classes/saturnError';

export interface CreateWormholeTransactionPayload {
    successTransactions?: SuccessTransaction[];
    failTransactions?: FailTransaction[];
    error?: SaturnError;
}
