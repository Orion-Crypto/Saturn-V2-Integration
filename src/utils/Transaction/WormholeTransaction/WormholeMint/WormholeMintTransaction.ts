import { WormholeMintComponent } from '@/types/Transactions/WormholeTransaction/CreateWormholeTransactionInput';
import { TransactionInfoTab } from '@/utils/Transaction/GeneralTransactionUtils';
import { ComposableWormholeTransaction } from '@/utils/Transaction/WormholeTransaction/ComposableWormholeTransaction';

export const WormholeMintTransaction = async (nftProjectIds: string[], nftIds: string[]) => {
    if (!nftProjectIds || nftProjectIds.length <= 0) return null;
    if (!nftIds || nftIds.length <= 0) return null;
    if (nftProjectIds.length !== nftIds.length) return null;

    const wormholeMintComponents: WormholeMintComponent[] = [];
    for (let i = 0; i < nftIds.length; i++) {
        const wormholeMintComponent: WormholeMintComponent = {
            nftProjectId: nftProjectIds[i],
            nftId: nftIds[i],
        };
        wormholeMintComponents.push(wormholeMintComponent);
    }

    const result = await ComposableWormholeTransaction({
        wormholeMintComponents: wormholeMintComponents,
        paymentTokens: [''],
    });
    TransactionInfoTab(result);
    return result;
};
