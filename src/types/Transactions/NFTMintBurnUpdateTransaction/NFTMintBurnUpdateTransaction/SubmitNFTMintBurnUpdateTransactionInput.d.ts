import { SuccessTransaction } from '@/types/Transactions/SuccessTransaction';

export interface SubmitNFTMintBurnUpdateTransactionInput {
    paymentAddress: string;
    successTransactions?: SuccessTransaction[];
}
