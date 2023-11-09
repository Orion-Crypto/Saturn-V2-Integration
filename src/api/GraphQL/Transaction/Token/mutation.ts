import { getGraphQLHeaders, v2GraphQLClient } from '@/api/api';
import { CreateTokenMintBurnUpdateTransactionInput } from '@/types/Transactions/TokenMintBurnUpdateTransaction/CreateTokenMintBurnUpdateTransactionInput';
import { CreateTokenMintBurnUpdateTransactionPayload } from '@/types/Transactions/TokenMintBurnUpdateTransaction/CreateTokenMintBurnUpdateTransactionPayload';
import { SubmitTokenMintBurnUpdateTransactionInput } from '@/types/Transactions/TokenMintBurnUpdateTransaction/SubmitTokenMintBurnUpdateTransactionInput';
import { SubmitTokenMintBurnUpdateTransactionPayload } from '@/types/Transactions/TokenMintBurnUpdateTransaction/SubmitTokenMintBurnUpdateTransactionPayload';
import { gql } from 'graphql-request';

//---------------------------------------------------------------------------------------------------//
// Create and Submit Token Transaction Functions
//---------------------------------------------------------------------------------------------------//
export const mutateCreateTokenMintBurnUpdateTransaction = async (input: CreateTokenMintBurnUpdateTransactionInput) => {
    const parameters = { input: input };
    v2GraphQLClient.setHeaders(await getGraphQLHeaders());
    const response: any = await v2GraphQLClient.request(
        gql`
            mutation CreateTokenMintBurnUpdateTransaction($input: CreateTokenMintBurnUpdateTransactionInput!) {
                createTokenMintBurnUpdateTransaction(input: $input) {
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
    const createTokenMintBurnUpdateTransactionPayload: CreateTokenMintBurnUpdateTransactionPayload =
        response?.createTokenMintBurnUpdateTransaction || {};
    return createTokenMintBurnUpdateTransactionPayload;
};

export const mutateSubmitTokenMintBurnUpdateTransaction = async (input: SubmitTokenMintBurnUpdateTransactionInput) => {
    const parameters = { input: input };
    v2GraphQLClient.setHeaders(await getGraphQLHeaders());
    const response: any = await v2GraphQLClient.request(
        gql`
            mutation SubmitTokenMintBurnUpdateTransaction($input: SubmitTokenMintBurnUpdateTransactionInput!) {
                submitTokenMintBurnUpdateTransaction(input: $input) {
                    transactionIds
                    error {
                        message
                    }
                }
            }
        `,
        parameters
    );
    const submitTokenMintBurnUpdateTransactionPayload: SubmitTokenMintBurnUpdateTransactionPayload =
        response?.submitTokenMintBurnUpdateTransaction || {};
    return submitTokenMintBurnUpdateTransactionPayload;
};
//---------------------------------------------------------------------------------------------------//
