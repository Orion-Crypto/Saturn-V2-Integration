import {
    NFTMintComponent,
    RoyaltyMintComponent,
} from '@/types/Transactions/NFTMintBurnUpdateTransaction/NFTMintBurnUpdateTransaction/CreateNFTMintBurnUpdateTransactionInput';
import { TransactionInfoTab } from '@/utils/Transaction/GeneralTransactionUtils';
import { ComposableNFTMintBurnUpdateTransaction } from '@/utils/Transaction/NFTMintBurnUpdateTransaction/ComposableNFTMintBurnUpdateTransaction';

export const NFTMintTransaction = async (nftIds: string[], royaltyNFTProjectId: any = null) => {
    if (!nftIds || nftIds.length <= 0) return null;

    const nftMintComponents: NFTMintComponent[] = [];
    for (let i = 0; i < nftIds.length; i++) {
        const nftMintComponent: NFTMintComponent = {
            nftId: nftIds[i],
        };
        nftMintComponents.push(nftMintComponent);
    }

    const royaltyMintComponents: RoyaltyMintComponent[] = [];
    if (royaltyNFTProjectId) {
        royaltyMintComponents.push({
            nftProjectId: royaltyNFTProjectId,
        });
    }

    const result = await ComposableNFTMintBurnUpdateTransaction({
        nftMintComponents: nftMintComponents,
        royaltyMintComponents: royaltyMintComponents,
    });
    TransactionInfoTab(result);
    return result;
};
