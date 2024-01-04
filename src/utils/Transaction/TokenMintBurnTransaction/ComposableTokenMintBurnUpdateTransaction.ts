import {
    mutateCreateTokenMintBurnUpdateTransaction,
    mutateSubmitTokenMintBurnUpdateTransaction,
} from '@/api/GraphQL/Transaction/Token/mutation';
import { ConnectWalletError, InvalidInputError, InvalidTransactionSignatureError } from '@/types/Classes/saturnError';
import { SuccessTransaction } from '@/types/Transactions/SuccessTransaction';
import {
    CreateTokenMintBurnUpdateTransactionInput,
    TokenBurnComponent,
    TokenMintComponent,
    TokenUpdateComponent,
} from '@/types/Transactions/TokenMintBurnUpdateTransaction/CreateTokenMintBurnUpdateTransactionInput';
import { CreateTokenMintBurnUpdateTransactionPayload } from '@/types/Transactions/TokenMintBurnUpdateTransaction/CreateTokenMintBurnUpdateTransactionPayload';
import { SubmitTokenMintBurnUpdateTransactionInput } from '@/types/Transactions/TokenMintBurnUpdateTransaction/SubmitTokenMintBurnUpdateTransactionInput';
import { SubmitTokenMintBurnUpdateTransactionPayload } from '@/types/Transactions/TokenMintBurnUpdateTransaction/SubmitTokenMintBurnUpdateTransactionPayload';
import { TransactionResult } from '@/types/Transactions/TransactionResult';
import CardanoWallet from '@/utils/Cardano/wallet';
import { SignTransaction } from '@/utils/Transaction/GeneralTransactionUtils';

export interface ComposableTokenMintBurnUpdateTransactionProps {
    tokenMintComponents?: TokenMintComponent[];
    tokenBurnComponents?: TokenBurnComponent[];
    tokenUpdateComponents?: TokenUpdateComponent[];
}

export const ComposableTokenMintBurnUpdateTransaction = async ({
    tokenMintComponents = [],
    tokenBurnComponents = [],
    tokenUpdateComponents = [],
}: ComposableTokenMintBurnUpdateTransactionProps = {}): Promise<TransactionResult> => {
    try {
        const paymentAddress = await CardanoWallet.lucid?.wallet.address();
        if (!paymentAddress) return { error: ConnectWalletError } as TransactionResult;
        const createInput: CreateTokenMintBurnUpdateTransactionInput = {
            paymentAddress,
            tokenMintComponents,
            tokenBurnComponents,
            tokenUpdateComponents,
        };
        if (!IsValidInput(createInput)) {
            return {
                error: InvalidInputError,
            } as TransactionResult;
        }
        const createTransaction: CreateTokenMintBurnUpdateTransactionPayload = await mutateCreateTokenMintBurnUpdateTransaction(createInput);
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

        const submitInput: SubmitTokenMintBurnUpdateTransactionInput = {
            paymentAddress: paymentAddress,
            successTransactions: submitSuccesses,
        };
        const submitTransaction: SubmitTokenMintBurnUpdateTransactionPayload = await mutateSubmitTokenMintBurnUpdateTransaction(submitInput);
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

const IsValidInput = (createInput: CreateTokenMintBurnUpdateTransactionInput) => {
    const { paymentAddress, tokenMintComponents, tokenBurnComponents, tokenUpdateComponents } = createInput;
    if (!paymentAddress) return false;

    const arrays = [tokenMintComponents, tokenBurnComponents, tokenUpdateComponents];

    const allNull = arrays.every((array) => array === null);
    const allEmpty = arrays.every((array) => array && array.length <= 0);

    return !(allNull || allEmpty);
};
