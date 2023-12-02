import { PriceData } from '../../../Price/Data/PriceData';

export interface UpdateNFTInput {
    nftId: string;
    assetName?: string;
    name?: string;
    image?: string;
    mediaType?: string;
    jsonProperties?: string;
    files?: NFTFileData[];
    individualMintPrice?: PriceData;
    individualUpdatePrice?: PriceData;
    individualBurnPrice?: PriceData;
}
