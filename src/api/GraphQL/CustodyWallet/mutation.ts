import { getGraphQLHeaders, v2GraphQLClient } from '@/api/api';
import { AddCustodialWalletInput } from '@/types/Models/CustodyWallet/GraphQL/AddCustodialWallet/AddCustodialWalletInput';
import { AddCustodialWalletPayload } from '@/types/Models/CustodyWallet/GraphQL/AddCustodialWallet/AddCustodialWalletPayload';
import { DeleteCustodialWalletInput } from '@/types/Models/CustodyWallet/GraphQL/DeleteCustodialWallet/DeleteCustodialWalletInput';
import { DeleteCustodialWalletPayload } from '@/types/Models/CustodyWallet/GraphQL/DeleteCustodialWallet/DeleteCustodialWalletPayload';
import { SignTransactionInput } from '@/types/Models/CustodyWallet/GraphQL/SignTransaction/SignTransactionInput';
import { SignTransactionPayload } from '@/types/Models/CustodyWallet/GraphQL/SignTransaction/SignTransactionPayload';
import { gql } from 'graphql-request';

//---------------------------------------------------------------------------------------------------//
// Custodial Add Functions
//---------------------------------------------------------------------------------------------------//
export const mutateAddCustodialWallet = async (input: AddCustodialWalletInput) => {
    const parameters = { input: input };
    v2GraphQLClient.setHeaders(await getGraphQLHeaders());
    const response: any = await v2GraphQLClient.request(
        gql`
            mutation AddCustodialWallet($input: AddCustodialWalletInput!) {
                addCustodialWallet(input: $input) {
                    custodialWallet {
                        id
                        address
                    }
                    error {
                        message
                    }
                }
            }
        `,
        parameters
    );

    const addCustodialWallet: AddCustodialWalletPayload = response?.addCustodialWallet;
    const custodialWallet: any = addCustodialWallet?.custodialWallet || {};
    return custodialWallet;
};

export const mutateDeleteCustodialWallet = async (input: DeleteCustodialWalletInput) => {
    const parameters = { input: input };
    v2GraphQLClient.setHeaders(await getGraphQLHeaders());
    const response: any = await v2GraphQLClient.request(
        gql`
            mutation DeleteCustodialWallet($input: DeleteCustodialWalletInput!) {
                deleteCustodialWallet(input: $input) {
                    custodialWallets {
                        id
                        address
                    }
                    error {
                        message
                    }
                }
            }
        `,
        parameters
    );

    const deleteCustodialWallet: DeleteCustodialWalletPayload = response?.deleteCustodialWallet;
    const custodialWallets: any = deleteCustodialWallet?.custodialWallets || {};
    return custodialWallets;
};

export const mutateSignTransaction = async (input: SignTransactionInput) => {
    const parameters = { input: input };
    v2GraphQLClient.setHeaders(await getGraphQLHeaders());
    const response: any = await v2GraphQLClient.request(
        gql`
            mutation SignTransaction($input: SignTransactionInput!) {
                signTransaction(input: $input) {
                    signedHexTransaction
                    error {
                        message
                    }
                }
            }
        `,
        parameters
    );

    const signTransaction: SignTransactionPayload = response?.signTransaction;
    const signedHexTransaction: any = signTransaction?.signedHexTransaction || '';
    return signedHexTransaction;
};
//---------------------------------------------------------------------------------------------------//
