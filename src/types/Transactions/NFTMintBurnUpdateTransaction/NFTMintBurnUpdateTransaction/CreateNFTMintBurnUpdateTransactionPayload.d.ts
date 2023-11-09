import { SaturnError } from '@/types/Classes/saturnError';
import { FailTransaction } from '@/types/Transactions/FailTransaction';
import { SuccessTransaction } from '@/types/Transactions/SuccessTransaction';

export interface CreateNFTMintBurnUpdateTransactionPayload {
    successTransactions?: SuccessTransaction[];
    failTransactions?: FailTransaction[];
    error?: SaturnError;
}
