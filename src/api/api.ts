import { GraphQLClient } from 'graphql-request';

export const v2GraphQLClient = new GraphQLClient(process.env.NEXT_PUBLIC_V2_GRAPHQL_API_URL as string);
