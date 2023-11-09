import { SaturnError } from '@/types/Classes/saturnError';

export interface CreateTokenMintBurnUpdateTransactionPayload {
    successTransactions?: SuccessTransaction[];
    failTransactions?: FailTransaction[];
    error?: SaturnError;
}
