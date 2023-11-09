import { queryClient } from '@/hooks/default';
import { Wallet } from '@/types/Classes/wallet';
import CardanoWallet from '@/utils/Cardano/wallet';
import { useQuery } from '@tanstack/react-query';

const BASE_WALLET_KEY = 'wallet';
export const IS_CONNECTED_KEY = [BASE_WALLET_KEY, 'isConnected'];
export const CONNECTED_WALLET_KEY = [BASE_WALLET_KEY, 'connected'];

//---------------------------------------------------------------------------------------------------//
// Connected and Signed In Wallet Data Functions
//---------------------------------------------------------------------------------------------------//
export const getConnectedWallet = () => queryClient.getQueryData(CONNECTED_WALLET_KEY);
export const setConnectedWallet = async (wallet: Wallet | null) => queryClient.setQueryData(CONNECTED_WALLET_KEY, wallet);
export const useGetConnectedWallet = () => useQuery({ queryKey: CONNECTED_WALLET_KEY, queryFn: () => getConnectedWallet() ?? null });

//---------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------//
// Wallet Hooks
//---------------------------------------------------------------------------------------------------//
export const useIsConnected = () => useQuery({ queryKey: IS_CONNECTED_KEY, queryFn: async () => await CardanoWallet.isConnected() });
//---------------------------------------------------------------------------------------------------//
