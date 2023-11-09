import { SaturnError } from '@/types/Classes/saturnError';

export interface CreateNFTMintBurnUpdateTransactionPayload {
    successTransactions?: SuccessTransaction[];
    failTransactions?: FailTransaction[];
    error?: SaturnError;
}
