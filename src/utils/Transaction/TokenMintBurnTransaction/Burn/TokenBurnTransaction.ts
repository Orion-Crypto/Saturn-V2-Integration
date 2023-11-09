import { TokenBurnComponent } from '@/types/Transactions/TokenMintBurnUpdateTransaction/CreateTokenMintBurnUpdateTransactionInput';
import { TransactionInfoTab } from '@/utils/Transaction/GeneralTransactionUtils';
import { ComposableTokenMintBurnUpdateTransaction } from '@/utils/Transaction/TokenMintBurnTransaction/ComposableTokenMintBurnUpdateTransaction';

export const TokenBurnTransaction = async (tokenIds: string[], amounts: number[]) => {
    if (!tokenIds || !amounts) return null;

    const length = tokenIds.length;
    if (length !== amounts.length) return null;

    const tokenBurnComponents: TokenBurnComponent[] = [];
    for (let i = 0; i < tokenIds.length; i++) {
        const tokenBurnComponent: TokenBurnComponent = {
            tokenId: tokenIds[i],
            amount: amounts[i],
        };
        tokenBurnComponents.push(tokenBurnComponent);
    }

    const result = await ComposableTokenMintBurnUpdateTransaction({ tokenBurnComponents: tokenBurnComponents });
    TransactionInfoTab(result);

    if (result.transactionIds && result.transactionIds.length > 0 && !result.error) {
        console.log(result.transactionIds[0]);
        //setTokenMintBurnTransaction({ txHash: result.transactionIds[0] });
    }

    return result;
};
