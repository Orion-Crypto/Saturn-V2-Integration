import { getGraphQLHeaders, v2GraphQLClient } from '@/api/api';
import { CreateNFTMintBurnUpdateTransactionInput } from '@/types/Transactions/NFTMintBurnUpdateTransaction/NFTMintBurnUpdateTransaction/CreateNFTMintBurnUpdateTransactionInput';
import { CreateNFTMintBurnUpdateTransactionPayload } from '@/types/Transactions/NFTMintBurnUpdateTransaction/NFTMintBurnUpdateTransaction/CreateNFTMintBurnUpdateTransactionPayload';
import { SubmitNFTMintBurnUpdateTransactionInput } from '@/types/Transactions/NFTMintBurnUpdateTransaction/NFTMintBurnUpdateTransaction/SubmitNFTMintBurnUpdateTransactionInput';
import { SubmitNFTMintBurnUpdateTransactionPayload } from '@/types/Transactions/NFTMintBurnUpdateTransaction/NFTMintBurnUpdateTransaction/SubmitNFTMintBurnUpdateTransactionPayload';
import { CreateRandomNFTMintTransactionInput } from '@/types/Transactions/NFTMintBurnUpdateTransaction/RandomNFTMintTransaction/CreateRandomNFTMintTransactionInput';
import { CreateRandomNFTMintTransactionPayload } from '@/types/Transactions/NFTMintBurnUpdateTransaction/RandomNFTMintTransaction/CreateRandomNFTMintTransactionPayload';
import { SubmitRandomNFTMintTransactionInput } from '@/types/Transactions/NFTMintBurnUpdateTransaction/RandomNFTMintTransaction/SubmitRandomNFTMintTransactionInput';
import { SubmitRandomNFTMintTransactionPayload } from '@/types/Transactions/NFTMintBurnUpdateTransaction/RandomNFTMintTransaction/SubmitRandomNFTMintTransactionPayload';
import { gql } from 'graphql-request';

//---------------------------------------------------------------------------------------------------//
// Create, Submit Random NFT Transaction Functions
//---------------------------------------------------------------------------------------------------//
export const mutateCreateRandomNFTMintTransaction = async (input: CreateRandomNFTMintTransactionInput) => {
    const parameters = { input: input };
    v2GraphQLClient.setHeaders(await getGraphQLHeaders());
    const response: any = await v2GraphQLClient.request(
        gql`
            mutation CreateRandomNFTMintTransaction($input: CreateRandomNFTMintTransactionInput!) {
                createRandomNFTMintTransaction(input: $input) {
                    successTransactions {
                        transactionId
                        hexTransaction
                    }
                    error {
                        message
                    }
                }
            }
        `,
        parameters
    );
    const createRandomNFTMintTransactionPayload: CreateRandomNFTMintTransactionPayload = response?.createRandomNFTMintTransaction || {};
    return createRandomNFTMintTransactionPayload;
};

export const mutateSubmitRandomNFTMintTransaction = async (input: SubmitRandomNFTMintTransactionInput) => {
    const parameters = { input: input };
    v2GraphQLClient.setHeaders(await getGraphQLHeaders());
    const response: any = await v2GraphQLClient.request(
        gql`
            mutation SubmitRandomNFTMintTransaction($input: SubmitRandomNFTMintTransactionInput!) {
                submitRandomNFTMintTransaction(input: $input) {
                    transactionIds
                    error {
                        message
                    }
                }
            }
        `,
        parameters
    );
    const submitRandomNFTMintTransactionPayload: SubmitRandomNFTMintTransactionPayload = response?.submitRandomNFTMintTransaction || {};
    return submitRandomNFTMintTransactionPayload;
};
//---------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------//
// Create and Submit NFT Transaction Functions
//---------------------------------------------------------------------------------------------------//
export const mutateCreateNFTMintBurnUpdateTransaction = async (input: CreateNFTMintBurnUpdateTransactionInput) => {
    const parameters = { input: input };
    v2GraphQLClient.setHeaders(await getGraphQLHeaders());
    const response: any = await v2GraphQLClient.request(
        gql`
            mutation CreateNFTMintBurnUpdateTransaction($input: CreateNFTMintBurnUpdateTransactionInput!) {
                createNFTMintBurnUpdateTransaction(input: $input) {
                    successTransactions {
                        transactionId
                        hexTransaction
                    }
                    error {
                        message
                    }
                }
            }
        `,
        parameters
    );
    const createNFTMintBurnUpdateTransactionPayload: CreateNFTMintBurnUpdateTransactionPayload =
        response?.createNFTMintBurnUpdateTransaction || {};
    return createNFTMintBurnUpdateTransactionPayload;
};

export const mutateSubmitNFTMintBurnUpdateTransaction = async (input: SubmitNFTMintBurnUpdateTransactionInput) => {
    const parameters = { input: input };
    v2GraphQLClient.setHeaders(await getGraphQLHeaders());
    const response: any = await v2GraphQLClient.request(
        gql`
            mutation SubmitNFTMintBurnUpdateTransaction($input: SubmitNFTMintBurnUpdateTransactionInput!) {
                submitNFTMintBurnUpdateTransaction(input: $input) {
                    transactionIds
                    error {
                        message
                    }
                }
            }
        `,
        parameters
    );
    const submitNFTMintBurnUpdateTransactionPayload: SubmitNFTMintBurnUpdateTransactionPayload =
        response?.submitNFTMintBurnUpdateTransaction || {};
    return submitNFTMintBurnUpdateTransactionPayload;
};
//---------------------------------------------------------------------------------------------------//
