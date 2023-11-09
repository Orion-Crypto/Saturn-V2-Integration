import { CardanoWalletType } from "@/types/Enums/Blockchain/Wallets";

export interface Wallet {
    walletType: CardanoWalletType;
    address: string;
}
