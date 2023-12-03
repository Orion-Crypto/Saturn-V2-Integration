import { getGraphQLHeaders, v2GraphQLClient } from '@/api/api';
import { CreateWormholeTransactionInput } from '@/types/Transactions/WormholeTransaction/CreateWormholeTransactionInput';
import { CreateWormholeTransactionPayload } from '@/types/Transactions/WormholeTransaction/CreateWormholeTransactionPayload';
import { SubmitWormholeTransactionInput } from '@/types/Transactions/WormholeTransaction/SubmitWormholeTransactionInput';
import { SubmitWormholeTransactionPayload } from '@/types/Transactions/WormholeTransaction/SubmitWormholeTransactionPayload';
import { gql } from 'graphql-request';

//---------------------------------------------------------------------------------------------------//
// Create and Submit NFT Transaction Functions
//---------------------------------------------------------------------------------------------------//
export const mutateCreateWormholeTransaction = async (input: CreateWormholeTransactionInput) => {
    const parameters = { input: input };
    v2GraphQLClient.setHeaders(await getGraphQLHeaders());
    const response: any = await v2GraphQLClient.request(
        gql`
            mutation CreateWormholeTransaction($input: CreateWormholeTransactionInput!) {
                createWormholeTransaction(input: $input) {
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
    const createWormholeTransactionPayload: CreateWormholeTransactionPayload = response?.createWormholeTransaction || {};
    return createWormholeTransactionPayload;
};

export const mutateSubmitWormholeTransaction = async (input: SubmitWormholeTransactionInput) => {
    const parameters = { input: input };
    v2GraphQLClient.setHeaders(await getGraphQLHeaders());
    const response: any = await v2GraphQLClient.request(
        gql`
            mutation SubmitWormholeTransaction($input: SubmitWormholeTransactionInput!) {
                submitWormholeTransaction(input: $input) {
                    transactionIds
                    error {
                        message
                    }
                }
            }
        `,
        parameters
    );
    const submitWormholeTransactionPayload: SubmitWormholeTransactionPayload = response?.submitWormholeTransaction || {};
    return submitWormholeTransactionPayload;
};
//---------------------------------------------------------------------------------------------------//
