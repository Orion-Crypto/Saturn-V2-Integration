import { getAPIKey, getJWTToken } from '@/api/authentication';
import { GraphQLClient } from 'graphql-request';

export const v2GraphQLClient = new GraphQLClient('https://api.preprod.saturnnft.io/v2/graphql/');

export const getGraphQLHeaders = async () => {
    const headers: any = {} as HeadersInit;
    try {
        const jwt = getJWTToken() as string;
        if (jwt) {
            headers['Authorization'] = `Bearer ${jwt}`;
            return headers;
        }

        const apiKey = getAPIKey();
        if (apiKey) {
            headers['Authorization'] = `Bearer ${apiKey}`;
            return headers;
        }

        return headers;
    } catch (error) {
        console.error(error);
        return headers;
    }
};

export const fetchPolicyIdAssetImages = async (policyId: string, assets: string[]) => {
    const response = await fetch(`localhost:3000/assets/${policyId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ assets: assets }),
    });
    return response.json();
};
