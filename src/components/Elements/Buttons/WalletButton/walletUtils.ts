import { CardanoWalletType } from '@/types/Enums/Blockchain/Wallets';
import CardanoWallet from '@/utils/Cardano/wallet';

export const Wallets: any = {
    Nami: { name: 'Nami', image: '/images/wallets/Nami.png', walletType: CardanoWalletType.Nami },
    Eternl: { name: 'Eternl', image: '/images/wallets/Eternl.png', walletType: CardanoWalletType.Eternl },
    Lace: { name: 'Lace', image: '/images/wallets/Lace.png', walletType: CardanoWalletType.Lace },
    Flint: { name: 'Flint', image: '/images/wallets/Flint.png', walletType: CardanoWalletType.Flint },
    Gero: { name: 'Gero', image: '/images/wallets/Gero.png', walletType: CardanoWalletType.Gero },
    Typhon: { name: 'Typhon', image: '/images/wallets/Typhon.png', walletType: CardanoWalletType.Typhon },
    Nufi: { name: 'Nufi', image: '/images/wallets/NuFi.png', walletType: CardanoWalletType.NuFi },
    Vespr: { name: 'Vespr', image: '/images/wallets/Vespr.png', walletType: CardanoWalletType.Vespr },
    Begin: { name: 'Begin', image: '/images/wallets/Begin.png', walletType: CardanoWalletType.Begin },
    Yoroi: { name: 'Yoroi', image: '/images/wallets/Yoroi.png', walletType: CardanoWalletType.Yoroi },
};

export const connect = async (walletType: CardanoWalletType, setIsLoading: any, refetch: any) => {
    setIsLoading(true);
    await CardanoWallet.connect(walletType);
    refetch();
    setIsLoading(false);
};

export const disconnect = async (setIsLoading: any, refetch: any) => {
    setIsLoading(true);
    CardanoWallet.disconnect();
    refetch();
    setIsLoading(false);
};
