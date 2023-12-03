import { getGraphQLHeaders, v2GraphQLClient } from '@/api/api';
import { AddNFTInput } from '@/types/Models/NFT/GraphQL/AddNFT/AddNFTInput';
import { AddNFTPayload } from '@/types/Models/NFT/GraphQL/AddNFT/AddNFTPayload';
import { DeleteNFTInput } from '@/types/Models/NFT/GraphQL/DeleteNFT/DeleteNFTInput';
import { DeleteNFTPayload } from '@/types/Models/NFT/GraphQL/DeleteNFT/DeleteNFTPayload';
import { UpdateNFTInput } from '@/types/Models/NFT/GraphQL/UpdateNFT/UpdateNFTInput';
import { UpdateNFTPayload } from '@/types/Models/NFT/GraphQL/UpdateNFT/UpdateNFTPayload';
import { gql } from 'graphql-request';

//---------------------------------------------------------------------------------------------------//
// NFT Add, Update, Delete Functions
//---------------------------------------------------------------------------------------------------//
export const mutateAddNFT = async (input: AddNFTInput) => {
    const parameters = { input: input };
    v2GraphQLClient.setHeaders(await getGraphQLHeaders());
    const response: any = await v2GraphQLClient.request(
        gql`
            mutation AddNFT($input: AddNFTInput!) {
                addNFT(input: $input) {
                    nfts {
                        id
                    }
                    error {
                        message
                    }
                }
            }
        `,
        parameters
    );
    const addNFTPayload: AddNFTPayload = response?.addNFT || {};
    return addNFTPayload;
};

export const mutateUpdateNFT = async (input: UpdateNFTInput) => {
    const parameters = { input: input };
    v2GraphQLClient.setHeaders(await getGraphQLHeaders());
    const response: any = await v2GraphQLClient.request(
        gql`
            mutation UpdateNFT($input: UpdateNFTInput!) {
                updateNFT(input: $input) {
                    nft {
                        id
                    }
                    error {
                        message
                    }
                }
            }
        `,
        parameters
    );

    const updateNFTPayload: UpdateNFTPayload = response?.updateNFT || {};
    return updateNFTPayload;
};

export const mutateDeleteNFT = async (input: DeleteNFTInput) => {
    const parameters = { input: input };
    v2GraphQLClient.setHeaders(await getGraphQLHeaders());
    const response: any = await v2GraphQLClient.request(
        gql`
            mutation DeleteNFT($input: DeleteNFTInput!) {
                deleteNFT(input: $input) {
                    nftProject {
                        id
                    }
                    error {
                        message
                    }
                }
            }
        `,
        parameters
    );
    const deleteNFTPayload: DeleteNFTPayload = response?.deleteNFT || {};
    return deleteNFTPayload;
};
//---------------------------------------------------------------------------------------------------//
