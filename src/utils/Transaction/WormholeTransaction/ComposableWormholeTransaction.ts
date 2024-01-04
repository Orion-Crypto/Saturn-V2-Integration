import { mutateCreateWormholeTransaction, mutateSubmitWormholeTransaction } from '@/api/GraphQL/Transaction/Wormhole/mutation';
import { ConnectWalletError, InvalidInputError, InvalidTransactionSignatureError } from '@/types/Classes/saturnError';
import {
    NFTBurnComponent,
    NFTMintComponent,
} from '@/types/Transactions/NFTMintBurnUpdateTransaction/NFTMintBurnUpdateTransaction/CreateNFTMintBurnUpdateTransactionInput';
import { SuccessTransaction } from '@/types/Transactions/SuccessTransaction';
import { TransactionResult } from '@/types/Transactions/TransactionResult';
import { CreateWormholeTransactionInput } from '@/types/Transactions/WormholeTransaction/CreateWormholeTransactionInput';
import { CreateWormholeTransactionPayload } from '@/types/Transactions/WormholeTransaction/CreateWormholeTransactionPayload';
import { SubmitWormholeTransactionInput } from '@/types/Transactions/WormholeTransaction/SubmitWormholeTransactionInput';
import { SubmitWormholeTransactionPayload } from '@/types/Transactions/WormholeTransaction/SubmitWormholeTransactionPayload';
import CardanoWallet from '@/utils/Cardano/wallet';
import { SignTransaction } from '@/utils/Transaction/GeneralTransactionUtils';

export interface ComposableWormholeTransactionProps {
    wormholeComponents?: NFTMintComponent[];
    wormholeMintComponents?: NFTBurnComponent[];

    // Payment Data
    paymentTokens: string[];
}

export const ComposableWormholeTransaction = async ({
    wormholeComponents,
    wormholeMintComponents,
    paymentTokens,
}: ComposableWormholeTransactionProps): Promise<TransactionResult> => {
    try {
        const paymentAddress = await CardanoWallet.lucid?.wallet.address();
        if (!paymentAddress) return { error: ConnectWalletError } as TransactionResult;

        const createInput: CreateWormholeTransactionInput = {
            paymentAddress,
            wormholeComponents,
            wormholeMintComponents,
            paymentTokens,
        };
        if (!IsValidInput(createInput)) {
            return {
                error: InvalidInputError,
            } as TransactionResult;
        }

        const createTransaction: CreateWormholeTransactionPayload = await mutateCreateWormholeTransaction(createInput);
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

        const submitInput: SubmitWormholeTransactionInput = {
            paymentAddress: paymentAddress,
            successTransactions: submitSuccesses,
        };
        const submitTransaction: SubmitWormholeTransactionPayload = await mutateSubmitWormholeTransaction(submitInput);
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

const IsValidInput = (createInput: CreateWormholeTransactionInput) => {
    const { paymentAddress, wormholeComponents, wormholeMintComponents } = createInput;
    if (!paymentAddress) return false;

    const arrays = [wormholeComponents, wormholeMintComponents];

    const allNull = arrays.every((array) => array === null);
    const allEmpty = arrays.every((array) => array && array.length <= 0);

    return !(allNull || allEmpty);
};
