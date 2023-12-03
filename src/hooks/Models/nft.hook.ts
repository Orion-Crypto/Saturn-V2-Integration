import { fetchPolicyIdAssetImages } from '@/api/api';
import { queryClient } from '@/hooks/default';
import CardanoWallet from '@/utils/Cardano/wallet';
import { useQuery } from '@tanstack/react-query';

export const BASE_NFT_KEY = 'nft';

//---------------------------------------------------------------------------//
// Local NFT Functions
//---------------------------------------------------------------------------//
export const getLocalNFT = (id: string) => queryClient.getQueryData([BASE_NFT_KEY, 'detail', id, 'local']);
export const setLocalNFT = (id: string, localNFT: any) => queryClient.setQueryData([BASE_NFT_KEY, 'detail', id, 'local'], localNFT);
export const useGetLocalNFT = (id: string, parameters: any) =>
    useQuery({ queryKey: [BASE_NFT_KEY, 'detail', id, 'local'], queryFn: () => getLocalNFT(id) ?? null, ...parameters });
//---------------------------------------------------------------------------//

//---------------------------------------------------------------------------//
// Wallet NFT Functions (Used for wormhole to get NFTs from the wallet)
//---------------------------------------------------------------------------//
export const GetNFTImages = async (policyId: string, page: number, pageSize: number) => {
    const isConnected = await CardanoWallet.isConnected();
    if (!isConnected) return undefined;

    const paymentAddress = await CardanoWallet.lucid?.wallet.address();
    if (!paymentAddress) return undefined;

    const utxos = await CardanoWallet.lucid?.wallet.getUtxos();
    if (!utxos) return undefined;

    const policyIdAssets = [];
    for (const utxo of utxos) {
        const assetsRecord = utxo?.assets;
        if (!assetsRecord) continue;

        const assets = Object.entries(assetsRecord);
        for (const [key] of assets) {
            if (IsAssetFromPolicyId(policyId, key)) {
                policyIdAssets.push(key);
            }
        }
    }

    // Paginate the assets on the client
    const paginatedHexAssets = [];
    const paginatedAssets: any = GetPaginatedAssets(policyIdAssets, page, pageSize);
    for (const paginatedAsset of paginatedAssets) {
        paginatedHexAssets.push(`${paginatedAsset}`);
    }

    // Fetch the assets from NFT-CDN or Blockfrost
    const imageResponse = await fetchPolicyIdAssetImages(policyId, paginatedHexAssets);
    const paginatedMetadata = imageResponse?.metadata;

    //const policyIdLength = 56;
    const paginatedData = [];
    for (let i = 0; i < paginatedMetadata.length; i++) {
        paginatedData.push({
            name: paginatedMetadata[i]?.onchain_metadata?.name,
            image: paginatedMetadata[i]?.onchain_metadata?.image,
            fingerprint: paginatedMetadata[i]?.fingerprint,
        });
    }

    const totalPages = Math.ceil(policyIdAssets.length / pageSize);
    const currentPage = page;
    const data = { data: paginatedData, pageInfo: { currentPage, totalPages } };
    return data;
};

export const IsAssetFromPolicyId = (policyId: string, assetName: string) => {
    return assetName.startsWith(policyId);
};

const GetPaginatedAssets = (assets: string[], page: number, pageSize: number) => {
    const zeroIndexPage = page - 1; // page pogically start with 1, but technically with 0
    return assets.slice(zeroIndexPage * pageSize, (zeroIndexPage + 1) * pageSize);
};
//---------------------------------------------------------------------------------------------------//
