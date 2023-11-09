import { SuccessTransaction } from '@/types/Transactions/SuccessTransaction';

export interface SubmitRandomNFTMintTransactionInput {
    paymentAddress: string;
    nftProjectId: string;
    successTransactions?: SuccessTransaction[];
}
