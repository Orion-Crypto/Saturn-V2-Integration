import { RoyaltyMintComponent } from '@/types/Transactions/NFTMintBurnUpdateTransaction/NFTMintBurnUpdateTransaction/CreateNFTMintBurnUpdateTransactionInput';
import { TransactionInfoTab } from '@/utils/Transaction/GeneralTransactionUtils';
import { ComposableNFTMintBurnUpdateTransaction } from '@/utils/Transaction/NFTMintBurnUpdateTransaction/ComposableNFTMintBurnUpdateTransaction';

export const RoyaltyMintTransaction = async (nftProjectId: any) => {
    if (!nftProjectId) return null;

    const royaltyMintComponents: RoyaltyMintComponent[] = [
        {
            nftProjectId: nftProjectId,
        },
    ];

    const result = await ComposableNFTMintBurnUpdateTransaction({ royaltyMintComponents: royaltyMintComponents });
    TransactionInfoTab(result);

    if (result.transactionIds && result.transactionIds.length > 0 && !result.error) {
        //setNFTMintBurnUpdateTransaction({ txHash: result.transactionIds[0] });
    }
    return result;
};
