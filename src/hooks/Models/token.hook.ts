import { queryClient } from '@/hooks/default';
import { useQuery } from '@tanstack/react-query';

export const BASE_TOKEN_KEY = 'token';

//---------------------------------------------------------------------------//
// Local NFT Functions
//---------------------------------------------------------------------------//
export const getLocalToken = (id: string) => queryClient.getQueryData([BASE_TOKEN_KEY, 'detail', id, 'local']);
export const setLocalToken = (id: string, localToken: any) => queryClient.setQueryData([BASE_TOKEN_KEY, 'detail', id, 'local'], localToken);
export const useGetLocalToken = (id: string, parameters: any) =>
    useQuery({ queryKey: [BASE_TOKEN_KEY, 'detail', id, 'local'], queryFn: () => getLocalToken(id), ...parameters });
//---------------------------------------------------------------------------//
