import { NFTBurnComponent } from '@/types/Transactions/NFTMintBurnUpdateTransaction/NFTMintBurnUpdateTransaction/CreateNFTMintBurnUpdateTransactionInput';
import { TransactionInfoTab } from '@/utils/Transaction/GeneralTransactionUtils';
import { ComposableNFTMintBurnUpdateTransaction } from '@/utils/Transaction/NFTMintBurnUpdateTransaction/ComposableNFTMintBurnUpdateTransaction';

export const NFTBurnTransaction = async (nftIds: string[]) => {
    if (!nftIds || nftIds.length <= 0) return null;

    const nftBurnComponents: NFTBurnComponent[] = [];
    for (let i = 0; i < nftIds.length; i++) {
        const nftBurnomponent: NFTBurnComponent = {
            nftId: nftIds[i],
        };
        nftBurnComponents.push(nftBurnomponent);
    }

    const result = await ComposableNFTMintBurnUpdateTransaction({ nftBurnComponents: nftBurnComponents });
    TransactionInfoTab(result);

    if (result.transactionIds && result.transactionIds.length > 0 && !result.error) {
        console.log(result.transactionIds[0]);
        //setNFTMintBurnUpdateTransaction({ txHash: result.transactionIds[0] });
    }
    return result;
};
