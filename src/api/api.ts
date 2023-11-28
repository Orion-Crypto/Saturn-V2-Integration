import { getAPIKey, getJWTToken } from '@/api/authentication';
import { GraphQLClient } from 'graphql-request';

//export const v2GraphQLClient = new GraphQLClient(process.env.NEXT_PUBLIC_V2_GRAPHQL_API_URL as string);
export const v2GraphQLClient = new GraphQLClient("https://api.preprod.saturnnft.io/graphql/");
//export const v2GraphQLClient = new GraphQLClient("https://localhost:5001/graphql/");
//export const v2GraphQLClient = new GraphQLClient("https://api.saturnnft.io/graphql/");


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
