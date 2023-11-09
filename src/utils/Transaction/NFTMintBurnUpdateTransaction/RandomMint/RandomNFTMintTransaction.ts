import { TransactionInfoTab } from '@/utils/Transaction/GeneralTransactionUtils';
import { ComposableRandomNFTMintTransaction } from '@/utils/Transaction/NFTMintBurnUpdateTransaction/ComposableRandomNFTMintTransaction';

export const RandomNFTMintTransaction = async (
    nftProjectId: string,
    count: number,
    paymentTokens: string[],
    passwords: string[],
    gReCaptchaToken: string
) => {
    if (!nftProjectId) return null;

    const result = await ComposableRandomNFTMintTransaction({ nftProjectId, count, paymentTokens, passwords, gReCaptchaToken });
    TransactionInfoTab(result);

    if (result.transactionIds && result.transactionIds.length > 0 && !result.error) {
        console.log(result.transactionIds);
    }
    return result;
};
