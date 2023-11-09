import { SuccessTransaction } from '@/types/Transactions/SuccessTransaction';

export interface SubmitTokenMintBurnUpdateTransactionInput {
    paymentAddress: string;
    successTransactions?: SuccessTransaction[];
}
