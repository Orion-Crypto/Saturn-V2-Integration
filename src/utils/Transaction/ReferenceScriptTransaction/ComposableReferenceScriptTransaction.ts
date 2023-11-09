import {
    mutateCreateReferenceScriptV2Transaction,
    mutateSubmitReferenceScriptV2Transaction,
} from '@/api/GraphQL/Transaction/ReferenceScript/mutation';
import { ConnectWalletError, InvalidInputError, InvalidTransactionSignatureError } from '@/types/Classes/saturnError';
import {
    CreateReferenceScriptV2TransactionInput,
    ReferenceScriptComponent,
} from '@/types/Transactions/ReferenceScriptTransaction/CreateReferenceScriptTransaction/CreateReferenceScriptV2TransactionInput';
import { CreateReferenceScriptV2TransactionPayload } from '@/types/Transactions/ReferenceScriptTransaction/CreateReferenceScriptTransaction/CreateReferenceScriptV2TransactionPayload';
import { SubmitReferenceScriptV2TransactionInput } from '@/types/Transactions/ReferenceScriptTransaction/SubmitReferenceScriptTransaction/SubmitReferenceScriptV2TransactionInput';
import { SubmitReferenceScriptV2TransactionPayload } from '@/types/Transactions/ReferenceScriptTransaction/SubmitReferenceScriptTransaction/SubmitReferenceScriptV2TransactionPayload';
import { SuccessTransaction } from '@/types/Transactions/SuccessTransaction';
import { TransactionResult } from '@/types/Transactions/TransactionResult';
import CardanoWallet from '@/utils/Cardano/wallet';
import { SignTransaction } from '@/utils/Transaction/GeneralTransactionUtils';

export interface ComposableReferenceScriptTransactionProps {
    referenceScriptComponents?: ReferenceScriptComponent[];
}
export const ComposableReferenceScriptTransaction = async ({
    referenceScriptComponents = [],
}: ComposableReferenceScriptTransactionProps): Promise<TransactionResult> => {
    try {
        const paymentAddress = await CardanoWallet.lucid?.wallet.address();
        if (!paymentAddress) return { error: ConnectWalletError } as TransactionResult;

        const createInput: CreateReferenceScriptV2TransactionInput = {
            paymentAddress,
            referenceScriptComponents,
        };
        if (!IsValidInput(createInput)) {
            return {
                error: InvalidInputError,
            } as TransactionResult;
        }

        const createTransaction: CreateReferenceScriptV2TransactionPayload = await mutateCreateReferenceScriptV2Transaction(createInput);
        const successTransactions = createTransaction?.successTransactions;
        if (!successTransactions || successTransactions.length <= 0) {
            return { error: createTransaction?.error } as TransactionResult;
        }

        const submitSuccesses: SuccessTransaction[] = [];
        for (const successTransaction of successTransactions) {
            const transactionId: any = successTransaction?.transactionId;
            const hexTransaction: any = successTransaction?.hexTransaction;

            // Sign each transaction
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

        const submitInput: SubmitReferenceScriptV2TransactionInput = {
            paymentAddress: paymentAddress,
            successTransactions: submitSuccesses,
        };

        const submitTransaction: SubmitReferenceScriptV2TransactionPayload = await mutateSubmitReferenceScriptV2Transaction(submitInput);
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

const IsValidInput = (createInput: CreateReferenceScriptV2TransactionInput) => {
    const { paymentAddress, referenceScriptComponents } = createInput;
    if (!paymentAddress || !referenceScriptComponents || referenceScriptComponents.length <= 0) return false;

    return true;
};
