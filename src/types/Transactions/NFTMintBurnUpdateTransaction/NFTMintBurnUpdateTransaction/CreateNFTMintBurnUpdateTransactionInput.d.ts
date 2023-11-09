import { NFTFileData } from '@/types/Models/NFT/Data/NFTFileData';

export interface CreateNFTMintBurnUpdateTransactionInput {
    paymentAddress: string;

    // Separate component lists for transaction types
    nftMintComponents?: NFTMintComponent[];
    nftBurnComponents?: NFTBurnComponent[];
    nftUpdateComponents?: NFTUpdateComponent[];
    royaltyMintComponents?: RoyaltyMintComponent[];

    // Optional Utxos for cross chain partners
    utxos?: string[];
}

export interface NFTMintComponent {
    nftId?: string;
}

export interface NFTBurnComponent {
    nftId?: string;
}

export interface NFTUpdateComponent {
    nftId?: string;

    // Data
    name?: string;
    image?: string;
    mediaType?: string;
    description?: string;
    jsonProperties?: string;
    files?: NFTFileData[];
}

export interface RoyaltyMintComponent {
    nftProjectId?: string;
}
