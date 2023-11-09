import { CardanoNetwork } from '@/types/Enums/Blockchain/Network';

export const getNetwork = () => {
    const networkString = process.env.NEXT_PUBLIC_CARDANO_NETWORK;
    const envNetwork = networkString === 'mainnet' ? CardanoNetwork.Mainnet : CardanoNetwork.Preprod;
    return envNetwork;
};
