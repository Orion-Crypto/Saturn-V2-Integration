import { queryClient } from '@/hooks/default';
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
