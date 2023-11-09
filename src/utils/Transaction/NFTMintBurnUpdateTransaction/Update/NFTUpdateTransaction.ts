import { getLocalNFT } from '@/hooks/Models/nft.hook';
import { NFTFileData } from '@/types/Models/NFT/Data/NFTFileData';
import { NFTUpdateComponent } from '@/types/Transactions/NFTMintBurnUpdateTransaction/NFTMintBurnUpdateTransaction/CreateNFTMintBurnUpdateTransactionInput';
import { TransactionInfoTab } from '@/utils/Transaction/GeneralTransactionUtils';
import { ComposableNFTMintBurnUpdateTransaction } from '@/utils/Transaction/NFTMintBurnUpdateTransaction/ComposableNFTMintBurnUpdateTransaction';

export const NFTUpdateTransaction = async (nftIds: string[]) => {
    if (!nftIds || nftIds.length <= 0) return null;

    const nftUpdateComponents: NFTUpdateComponent[] = [];
    for (let i = 0; i < nftIds.length; i++) {
        const nftValues: any = await calculateUpdateData(nftIds[i]);
        const nftUpdateComponent: NFTUpdateComponent = {
            nftId: nftIds[i],
            name: nftValues.name,
            image: nftValues.image,
            mediaType: nftValues.mediaType,
            jsonProperties: nftValues.jsonProperties,
            files: nftValues.files,
        };

        nftUpdateComponents.push(nftUpdateComponent);
    }

    const result = await ComposableNFTMintBurnUpdateTransaction({ nftUpdateComponents: nftUpdateComponents });
    TransactionInfoTab(result);

    if (result.transactionIds && result.transactionIds.length > 0 && !result.error) {
        console.log(result.transactionIds[0]);
        //setNFTMintBurnUpdateTransaction({ txHash: result.transactionIds[0] });
    }
    return result;
};

export const calculateUpdateData = async (id: string) => {
    const localNFT: any = getLocalNFT(id);

    // Upload all new files
    const uploadFiles = [];
    let localFileIndex = 0;
    const uploadFilesIndices = [];
    for (const file of localNFT.files) {
        if (file && file.file) {
            uploadFilesIndices.push(localFileIndex);
            uploadFiles.push(file.file);
        }

        localFileIndex += 1;
    }

    // NFT Data
    const assetName = localNFT.asset_name;
    const name = localNFT.name;
    const image = localNFT.image;
    const mediaType = localNFT.media_type;

    const properties: any = {};
    for (let i = 0; i < localNFT?.properties?.length; i++) {
        const key = localNFT.properties[i].key;
        const value = localNFT.properties[i].value;
        if (key) {
            properties[key] = value;
        }
    }

    const files: NFTFileData[] = [];
    for (const localNFTFile of localNFT.files) {
        const file: NFTFileData = {
            name: localNFTFile.name,
            src: localNFTFile.src,
            mediaType: localNFTFile.media_type,
            jsonProperties: localNFTFile.json_properties,
            fileId: localNFTFile.file_id,
        };
        files.push(file);
    }
    const jsonProperties = JSON.stringify(properties);

    return {
        assetName: assetName,
        name: name,
        image,
        mediaType,
        jsonProperties: jsonProperties,
        files: files,
    };
};
