import { CONNECTED_WALLET_KEY, IS_CONNECTED_KEY } from '@/hooks/Cardano/wallet.hooks';
import { queryClient } from '@/hooks/default';
import { CardanoWalletType } from '@/types/Enums/Blockchain/Wallets';
import CardanoWallet from '@/utils/Cardano/wallet';

export const connectIfNotConnected = async () => {
    const isConnected = await CardanoWallet.isConnected();
    if (isConnected) return true;

    const walletType = getFirstWalletType();
    const connected = await CardanoWallet.connect(walletType);
    if (connected) {
        queryClient.invalidateQueries({ queryKey: IS_CONNECTED_KEY });
        queryClient.invalidateQueries({ queryKey: CONNECTED_WALLET_KEY });
    }
    return connected;
};

export const getFirstWalletType = () => {
    let walletType = CardanoWalletType.Nami;
    if (window.cardano && 'nami' in window.cardano) {
        walletType = CardanoWalletType.Nami;
    } else if (window.cardano && 'eternl' in window.cardano) {
        walletType = CardanoWalletType.Eternl;
    } else if (window.cardano && 'lace' in window.cardano) {
        walletType = CardanoWalletType.Lace;
    } else if (window.cardano && 'flint' in window.cardano) {
        walletType = CardanoWalletType.Flint;
    } else if (window.cardano && 'gerowallet' in window.cardano) {
        walletType = CardanoWalletType.Gero;
    } else if (window.cardano && 'typhoncip30' in window.cardano) {
        walletType = CardanoWalletType.Typhon;
    } else if (window.cardano && 'nufi' in window.cardano) {
        walletType = CardanoWalletType.NuFi;
    } else if (window.cardano && 'vespr' in window.cardano) {
        walletType = CardanoWalletType.Vespr;
    } else if (window.cardano && 'begin' in window.cardano) {
        walletType = CardanoWalletType.Begin;
    } else if (window.cardano && 'yoroi' in window.cardano) {
        walletType = CardanoWalletType.Yoroi;
    }
    return walletType;
};
