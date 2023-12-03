import { WormholeComponent } from '@/types/Transactions/WormholeTransaction/CreateWormholeTransactionInput';
import { TransactionInfoTab } from '@/utils/Transaction/GeneralTransactionUtils';
import { ComposableWormholeTransaction } from '@/utils/Transaction/WormholeTransaction/ComposableWormholeTransaction';

export const WormholeTransaction = async (nftProjectIds: string[], nftIds: string[], paymentTokens: string[]) => {
    if (!nftProjectIds || nftProjectIds.length <= 0) return null;
    if (!nftIds || nftIds.length <= 0) return null;
    if (nftProjectIds.length !== nftIds.length) return null;

    const wormholeComponents: WormholeComponent[] = [];
    for (let i = 0; i < nftIds.length; i++) {
        const wormholeComponent: WormholeComponent = {
            nftProjectId: nftProjectIds[i],
            nftId: nftIds[i],
        };
        wormholeComponents.push(wormholeComponent);
    }

    const result = await ComposableWormholeTransaction({
        wormholeComponents: wormholeComponents,
        paymentTokens: paymentTokens,
    });
    TransactionInfoTab(result);
    return result;
};
