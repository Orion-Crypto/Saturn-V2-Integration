import { getLocalToken } from '@/hooks/Models/token.hook';
import { TokenUpdateComponent } from '@/types/Transactions/TokenMintBurnUpdateTransaction/CreateTokenMintBurnUpdateTransactionInput';
import { TransactionInfoTab } from '@/utils/Transaction/GeneralTransactionUtils';
import { ComposableTokenMintBurnUpdateTransaction } from '@/utils/Transaction/TokenMintBurnTransaction/ComposableTokenMintBurnUpdateTransaction';

export const TokenUpdateTransaction = async (tokenIds: string[]) => {
    if (!tokenIds) return null;

    const tokenUpdateComponents: TokenUpdateComponent[] = [];
    for (const tokenId of tokenIds) {
        const tokenValues = await calculateUpdateData(tokenId);
        tokenUpdateComponents.push({
            tokenId: tokenId,
            name: tokenValues.name,
            image: tokenValues.image,
            mediaType: tokenValues.mediaType,
            description: tokenValues.description,
            ticker: tokenValues.ticker,
            logo: tokenValues.image,
            tokenDecimals: Number(tokenValues.tokenDecimals),
            properties: tokenValues.jsonProperties,
        });
    }

    const result = await ComposableTokenMintBurnUpdateTransaction({ tokenUpdateComponents: tokenUpdateComponents });
    TransactionInfoTab(result);

    // if (result.transactionIds && result.transactionIds.length > 0 && !result.error) {
    //     setTokenMintBurnTransaction({ txHash: result.transactionIds[0] });
    // }
    return result;
};

export const calculateUpdateData = async (id: string) => {
    const localToken: any = getLocalToken(id);

    // NFT Data
    const assetName = localToken.asset_name;
    const name = localToken.name;
    let image = localToken.image;
    const mediaType = localToken.media_type;
    const description = localToken.description;
    const ticker = localToken.ticker;

    const properties: any = {};
    for (let i = 0; i < localToken?.properties?.length; i++) {
        const key = localToken.properties[i].key;
        const value = localToken.properties[i].value;
        if (key) {
            properties[key] = value;
        }
    }
    const jsonProperties = JSON.stringify(properties);

    return {
        assetName: assetName,
        name: name,
        image,
        mediaType,
        description,
        ticker,
        tokenDecimals: localToken.token_decimals,
        jsonProperties: jsonProperties,
    };
};
