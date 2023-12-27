import { calculateStringFromParameters } from '@/api/GraphQL/parameters';
import { getGraphQLHeaders, v2GraphQLClient } from '@/api/api';
import { GraphQLParameters } from '@/types/GraphQL/GraphQLParameters';
import { GetCustodialWalletInput } from '@/types/Models/CustodyWallet/GraphQL/GetCustodialWallet/GetCustodialWalletInput';
import { gql } from 'graphql-request';

//---------------------------------------------------------------------------------------------------//
// Get Custodial Wallet Functions
//---------------------------------------------------------------------------------------------------//
export const queryCustodialWallet = async (address: string) => {
    if (!address) return null;

    v2GraphQLClient.setHeaders(await getGraphQLHeaders());
    const input: GetCustodialWalletInput = { address: address };
    const parameters = { input: input };
    const response: any = await v2GraphQLClient.request(
        gql`
            query CustodialWallet($input: GetNFTInput!) {
                custodialWallet(input: $input) {
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
    const custodialWallet = response?.custodialWallet?.custodialWallet || {};
    return custodialWallet;
};

export const queryCustodialWallets = async (parameters?: GraphQLParameters) => {
    v2GraphQLClient.setHeaders(await getGraphQLHeaders());

    const response: any = await v2GraphQLClient.request(
        gql`
            query CustodialWallets() {
                custodialWallets(${calculateStringFromParameters(parameters)}) {
                    edges {
                        cursor
                        node {
                            id
                            address
                        }
                    }
                    pageInfo {
                        startCursor
                        endCursor
                        hasNextPage
                        hasPreviousPage
                    }
                    totalCount
                }
            }
        `
    );
    const custodialWallets: any = response?.custodialWallets || {};
    return custodialWallets;
};
//---------------------------------------------------------------------------------------------------//
