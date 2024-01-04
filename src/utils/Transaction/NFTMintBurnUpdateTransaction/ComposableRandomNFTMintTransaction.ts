import { mutateCreateRandomNFTMintTransaction, mutateSubmitRandomNFTMintTransaction } from '@/api/GraphQL/Transaction/NFT/mutation';
import { ConnectWalletError, InvalidTransactionSignatureError } from '@/types/Classes/saturnError';
import { CreateRandomNFTMintTransactionInput } from '@/types/Transactions/NFTMintBurnUpdateTransaction/RandomNFTMintTransaction/CreateRandomNFTMintTransactionInput';
import { CreateRandomNFTMintTransactionPayload } from '@/types/Transactions/NFTMintBurnUpdateTransaction/RandomNFTMintTransaction/CreateRandomNFTMintTransactionPayload';
import { SubmitRandomNFTMintTransactionInput } from '@/types/Transactions/NFTMintBurnUpdateTransaction/RandomNFTMintTransaction/SubmitRandomNFTMintTransactionInput';
import { SubmitRandomNFTMintTransactionPayload } from '@/types/Transactions/NFTMintBurnUpdateTransaction/RandomNFTMintTransaction/SubmitRandomNFTMintTransactionPayload';
import { SuccessTransaction } from '@/types/Transactions/SuccessTransaction';
import { TransactionResult } from '@/types/Transactions/TransactionResult';
import CardanoWallet from '@/utils/Cardano/wallet';
import { SignTransaction } from '@/utils/Transaction/GeneralTransactionUtils';

export interface ComposableRandomNFTMintTransactionProps {
    nftProjectId: string;
    count: number;
    paymentTokens: string[];

    // Other Data
    passwords?: string[];
    gReCaptchaToken: string;
}

export const ComposableRandomNFTMintTransaction = async ({
    nftProjectId,
    count,
    paymentTokens,
    passwords,
    gReCaptchaToken,
}: ComposableRandomNFTMintTransactionProps): Promise<TransactionResult> => {
    try {
        const paymentAddress: any = await CardanoWallet.lucid?.wallet.address();
        if (!paymentAddress) return { error: ConnectWalletError } as TransactionResult;

        const createInput: CreateRandomNFTMintTransactionInput = {
            nftProjectId,
            paymentAddress,
            count,
            paymentTokens,
            passwords,
            gReCaptchaToken,
        };

        const createTransaction: CreateRandomNFTMintTransactionPayload = await mutateCreateRandomNFTMintTransaction(createInput);
        const successTransactions = createTransaction?.successTransactions;
        if (!successTransactions || successTransactions.length <= 0) {
            return { error: createTransaction?.error } as TransactionResult;
        }

        const submitSuccesses: SuccessTransaction[] = [];
        for (const successTransaction of successTransactions) {
            const transactionId: any = successTransaction?.transactionId;
            const hexTransaction: any = successTransaction?.hexTransaction;

            const signedHexTx = await SignTransaction(hexTransaction);
            if (!signedHexTx) {
                return {
                    error: InvalidTransactionSignatureError,
                } as TransactionResult;
            }

            const submitSuccess: SuccessTransaction = {
                transactionId: transactionId,
                hexTransaction: signedHexTx,
            };
            submitSuccesses.push(submitSuccess);
        }

        const submitInput: SubmitRandomNFTMintTransactionInput = {
            paymentAddress: paymentAddress,
            nftProjectId: nftProjectId,
            successTransactions: submitSuccesses,
        };
        const submitTransaction: SubmitRandomNFTMintTransactionPayload = await mutateSubmitRandomNFTMintTransaction(submitInput);
        const transactionIds: any = submitTransaction?.transactionIds;
        if (!transactionIds || transactionIds.length <= 0 || !!submitTransaction.error) {
            return { error: submitTransaction?.error } as TransactionResult;
        }
        return { transactionIds: transactionIds } as TransactionResult;
    } catch (error: any) {
        console.error(error);
        return { error: { message: JSON.stringify(error), code: error?.code } } as TransactionResult;
    }
};
