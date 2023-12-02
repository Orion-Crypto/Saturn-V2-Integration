import { getGraphQLHeaders, v2GraphQLClient } from '@/api/api';
import { AddNFTProjectPayload } from '@/types/Models/NFTProject/GraphQL/AddNFTProject/AddNFTProjectPayload';
import { DeleteNFTProjectInput } from '@/types/Models/NFTProject/GraphQL/DeleteNFTProject/DeleteNFTProjectInput';
import { DeleteNFTProjectPayload } from '@/types/Models/NFTProject/GraphQL/DeleteNFTProject/DeleteNFTProjectPayload';
import { UpdateNFTProjectInput } from '@/types/Models/NFTProject/GraphQL/UpdateNFTProject/UpdateNFTProjectInput';
import { UpdateNFTProjectPayload } from '@/types/Models/NFTProject/GraphQL/UpdateNFTProject/UpdateNFTProjectPayload';
import { gql } from 'graphql-request';

//---------------------------------------------------------------------------------------------------//
// NFTProject Add, Update, Delete Functions
//---------------------------------------------------------------------------------------------------//
export const mutateAddNFTProject = async () => {
    v2GraphQLClient.setHeaders(await getGraphQLHeaders());
    const response: any = await v2GraphQLClient.request(
        gql`
            mutation AddNFTProject() {
                addNFTProject() {
                    nftProject {
                        id
                    }
                    error {
                        message
                    }
                }
            }
        `
    );

    const addNFTProjectPayload: AddNFTProjectPayload = response?.addNFTProject;
    const nftProject: any = addNFTProjectPayload?.nftProject || {};
    return nftProject;
};

export const mutateUpdateNFTProject = async (input: UpdateNFTProjectInput) => {
    const parameters = { input: input };
    v2GraphQLClient.setHeaders(await getGraphQLHeaders());
    const response: any = await v2GraphQLClient.request(
        gql`
            mutation UpdateNFTProject($input: UpdateNFTProjectInput!) {
                updateNFTProject(input: $input) {
                    nftProject {
                        id
                    }
                    error {
                        message
                        code
                    }
                }
            }
        `,
        parameters
    );

    const updateNFTProjectPayload: UpdateNFTProjectPayload = response?.updateNFTProject || {};
    return updateNFTProjectPayload;
};

export const mutateDeleteNFTProject = async (input: DeleteNFTProjectInput) => {
    const parameters = { input: input };
    v2GraphQLClient.setHeaders(await getGraphQLHeaders());
    const response: any = await v2GraphQLClient.request(
        gql`
            mutation DeleteNFTProject($input: DeleteNFTProjectInput!) {
                deleteNFTProject(input: $input) {
                    nftProjects {
                        id
                    }
                    error {
                        message
                    }
                }
            }
        `,
        parameters
    );

    const deleteNFTProject: DeleteNFTProjectPayload = response?.deleteNFTProject;
    const nftProjects: any = deleteNFTProject.nftProjects || {};
    return nftProjects;
};
//---------------------------------------------------------------------------------------------------//
