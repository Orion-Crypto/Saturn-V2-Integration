import { NFTUpdateComponent } from '@/types/Transactions/NFTMintBurnUpdateTransaction/NFTMintBurnUpdateTransaction/CreateNFTMintBurnUpdateTransactionInput';
import { TransactionInfoTab } from '@/utils/Transaction/GeneralTransactionUtils';
import { ComposableNFTMintBurnUpdateTransaction } from '@/utils/Transaction/NFTMintBurnUpdateTransaction/ComposableNFTMintBurnUpdateTransaction';

export const NFTUpdateTransaction = async (nftUpdateComponents: NFTUpdateComponent[]) => {
    if (!nftUpdateComponents || nftUpdateComponents.length <= 0) return null;

    const result = await ComposableNFTMintBurnUpdateTransaction({ nftUpdateComponents: nftUpdateComponents });
    TransactionInfoTab(result);
    return result;
};
