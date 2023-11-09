import { TokenMintComponent } from '@/types/Transactions/TokenMintBurnUpdateTransaction/CreateTokenMintBurnUpdateTransactionInput';
import { TransactionInfoTab } from '@/utils/Transaction/GeneralTransactionUtils';
import { ComposableTokenMintBurnUpdateTransaction } from '@/utils/Transaction/TokenMintBurnTransaction/ComposableTokenMintBurnUpdateTransaction';

export const TokenMintTransaction = async (tokenIds: string[], amounts: number[]) => {
    if (!tokenIds || !amounts) return null;

    const length = tokenIds.length;
    if (length !== amounts.length) return null;

    const tokenMintComponents: TokenMintComponent[] = [];
    for (let i = 0; i < tokenIds.length; i++) {
        const tokenMintComponent: TokenMintComponent = {
            tokenId: tokenIds[i],
            amount: amounts[i],
        };
        tokenMintComponents.push(tokenMintComponent);
    }

    const result = await ComposableTokenMintBurnUpdateTransaction({ tokenMintComponents: tokenMintComponents });
    TransactionInfoTab(result);

    if (result.transactionIds && result.transactionIds.length > 0 && !result.error) {
        console.log(result.transactionIds[0]);
        //setTokenMintBurnTransaction({ txHash: result.transactionIds[0] });
    }
    return result;
};
