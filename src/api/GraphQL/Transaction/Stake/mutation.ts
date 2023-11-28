import { getGraphQLHeaders, v2GraphQLClient } from '@/api/api';
import { CreateStakeTransactionInput } from '@/types/Transactions/StakeTransaction/CreateStakeTransactionInput';
import { CreateStakeTransactionPayload } from '@/types/Transactions/StakeTransaction/CreateStakeTransactionPayload';
import { SubmitStakeTransactionInput } from '@/types/Transactions/StakeTransaction/SubmitStakeTransactionInput';
import { SubmitStakeTransactionPayload } from '@/types/Transactions/StakeTransaction/SubmitStakeTransactionPayload';
import { gql } from 'graphql-request';

//---------------------------------------------------------------------------------------------------//
// Create, Submit, and Cancel Reference Script Transaction Functions
//---------------------------------------------------------------------------------------------------//
export const mutateCreateStakeTransaction = async (input: CreateStakeTransactionInput) => {
    const parameters = { input: input };
    v2GraphQLClient.setHeaders(await getGraphQLHeaders());
    const response: any = await v2GraphQLClient.request(
        gql`
            mutation CreateStakeTransaction($input: CreateStakeTransactionInput!) {
                createStakeTransaction(input: $input) {
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
    const createStakeTransactionPayload: CreateStakeTransactionPayload = response?.createStakeTransaction || {};
    return createStakeTransactionPayload;
};

export const mutateSubmitStakeTransaction = async (input: SubmitStakeTransactionInput) => {
    const parameters = { input: input };
    v2GraphQLClient.setHeaders(await getGraphQLHeaders());
    const response: any = await v2GraphQLClient.request(
        gql`
            mutation SubmitStakeTransaction($input: SubmitStakeTransactionInput!) {
                submitStakeTransaction(input: $input) {
                    transactionIds
                    error {
                        message
                    }
                }
            }
        `,
        parameters
    );
    const submitStakeTransactionPayload: SubmitStakeTransactionPayload = response?.submitStakeTransaction || {};
    return submitStakeTransactionPayload;
};
//---------------------------------------------------------------------------------------------------//
