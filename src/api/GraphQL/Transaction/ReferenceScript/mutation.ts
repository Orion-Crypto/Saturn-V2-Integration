import { getGraphQLHeaders, v2GraphQLClient } from '@/api/api';
import { CreateReferenceScriptV2TransactionInput } from '@/types/Transactions/TokenMintBurnUpdateTransaction/ReferenceScriptTransaction/CreateReferenceScriptTransaction/CreateReferenceScriptV2TransactionInput';
import { CreateReferenceScriptV2TransactionPayload } from '@/types/Transactions/TokenMintBurnUpdateTransaction/ReferenceScriptTransaction/CreateReferenceScriptTransaction/CreateReferenceScriptV2TransactionPayload';
import { SubmitReferenceScriptV2TransactionInput } from '@/types/Transactions/TokenMintBurnUpdateTransaction/ReferenceScriptTransaction/SubmitReferenceScriptTransaction/SubmitReferenceScriptV2TransactionInput';
import { SubmitReferenceScriptV2TransactionPayload } from '@/types/Transactions/TokenMintBurnUpdateTransaction/ReferenceScriptTransaction/SubmitReferenceScriptTransaction/SubmitReferenceScriptV2TransactionPayload';
import { gql } from 'graphql-request';

//---------------------------------------------------------------------------------------------------//
// Create, Submit, and Cancel Reference Script Transaction Functions
//---------------------------------------------------------------------------------------------------//
export const mutateCreateReferenceScriptV2Transaction = async (input: CreateReferenceScriptV2TransactionInput) => {
    const parameters = { input: input };
    v2GraphQLClient.setHeaders(await getGraphQLHeaders());
    const response: any = await v2GraphQLClient.request(
        gql`
            mutation CreateReferenceScriptV2Transaction($input: CreateReferenceScriptV2TransactionInput!) {
                createReferenceScriptV2Transaction(input: $input) {
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
    const createReferenceScriptV2TransactionPayload: CreateReferenceScriptV2TransactionPayload =
        response?.createReferenceScriptV2Transaction || {};
    return createReferenceScriptV2TransactionPayload;
};

export const mutateSubmitReferenceScriptV2Transaction = async (input: SubmitReferenceScriptV2TransactionInput) => {
    const parameters = { input: input };
    v2GraphQLClient.setHeaders(await getGraphQLHeaders());
    const response: any = await v2GraphQLClient.request(
        gql`
            mutation SubmitReferenceScriptV2Transaction($input: SubmitReferenceScriptV2TransactionInput!) {
                submitReferenceScriptV2Transaction(input: $input) {
                    transactionIds
                    error {
                        message
                    }
                }
            }
        `,
        parameters
    );
    const submitReferenceScriptV2TransactionPayload: SubmitReferenceScriptV2TransactionPayload =
        response?.submitReferenceScriptV2Transaction || {};
    return submitReferenceScriptV2TransactionPayload;
};
//---------------------------------------------------------------------------------------------------//
