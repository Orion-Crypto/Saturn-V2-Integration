import { mutateCreateNFTMintBurnUpdateTransaction, mutateSubmitNFTMintBurnUpdateTransaction } from '@/api/GraphQL/Transaction/NFT/mutation';
import { ConnectWalletError, InvalidInputError, InvalidTransactionSignatureError } from '@/types/Classes/saturnError';
import {
    CreateNFTMintBurnUpdateTransactionInput,
    NFTBurnComponent,
    NFTMintComponent,
    NFTUpdateComponent,
    RoyaltyMintComponent,
} from '@/types/Transactions/NFTMintBurnUpdateTransaction/NFTMintBurnUpdateTransaction/CreateNFTMintBurnUpdateTransactionInput';
import { CreateNFTMintBurnUpdateTransactionPayload } from '@/types/Transactions/NFTMintBurnUpdateTransaction/NFTMintBurnUpdateTransaction/CreateNFTMintBurnUpdateTransactionPayload';
import { SubmitNFTMintBurnUpdateTransactionInput } from '@/types/Transactions/NFTMintBurnUpdateTransaction/NFTMintBurnUpdateTransaction/SubmitNFTMintBurnUpdateTransactionInput';
import { SubmitNFTMintBurnUpdateTransactionPayload } from '@/types/Transactions/NFTMintBurnUpdateTransaction/NFTMintBurnUpdateTransaction/SubmitNFTMintBurnUpdateTransactionPayload';
import { SuccessTransaction } from '@/types/Transactions/SuccessTransaction';
import { TransactionResult } from '@/types/Transactions/TransactionResult';
import CardanoWallet from '@/utils/Cardano/wallet';
import { SignTransaction } from '@/utils/Transaction/GeneralTransactionUtils';

export interface ComposableNFTMintBurnUpdateTransactionProps {
    nftMintComponents?: NFTMintComponent[];
    nftBurnComponents?: NFTBurnComponent[];
    nftUpdateComponents?: NFTUpdateComponent[];
    royaltyMintComponents?: RoyaltyMintComponent[];
}

export const ComposableNFTMintBurnUpdateTransaction = async ({
    nftMintComponents,
    nftBurnComponents,
    nftUpdateComponents,
    royaltyMintComponents,
}: ComposableNFTMintBurnUpdateTransactionProps): Promise<TransactionResult> => {
    try {
        const paymentAddress = await CardanoWallet.lucid?.wallet.address();
        if (!paymentAddress) return { error: ConnectWalletError } as TransactionResult;

        const createInput: CreateNFTMintBurnUpdateTransactionInput = {
            paymentAddress,
            nftMintComponents,
            nftBurnComponents,
            nftUpdateComponents,
            royaltyMintComponents,
        };
        if (!IsValidInput(createInput)) {
            return {
                error: InvalidInputError,
            } as TransactionResult;
        }

        const createTransaction: CreateNFTMintBurnUpdateTransactionPayload = await mutateCreateNFTMintBurnUpdateTransaction(createInput);
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

        const submitInput: SubmitNFTMintBurnUpdateTransactionInput = {
            paymentAddress: paymentAddress,
            successTransactions: submitSuccesses,
        };
        const submitTransaction: SubmitNFTMintBurnUpdateTransactionPayload = await mutateSubmitNFTMintBurnUpdateTransaction(submitInput);
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

const IsValidInput = (createInput: CreateNFTMintBurnUpdateTransactionInput) => {
    const { paymentAddress, nftMintComponents, nftBurnComponents, nftUpdateComponents } = createInput;
    if (!paymentAddress) return false;

    const arrays = [nftMintComponents, nftBurnComponents, nftUpdateComponents];

    const allNull = arrays.every((array) => array === null);
    const allEmpty = arrays.every((array) => array && array.length <= 0);

    return !(allNull || allEmpty);
};
