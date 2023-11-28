import { getGraphQLHeaders, graphQLClient } from '@/api/api';
import { AddStakeProjectsPayload } from '@/types/Models/StakeProject/AddStakeProjects/AddStakeProjectsPayload';
import { DeleteStakeProjectInput } from '@/types/Models/StakeProject/DeleteStakeProjects/DeleteStakeProjectsInput';
import { DeleteStakeProjectPayload } from '@/types/Models/StakeProject/DeleteStakeProjects/DeleteStakesPayload';
import { UpdateStakeProjectInput } from '@/types/Models/StakeProject/UpdateStakeProject/UpdateStakeProjectInput';
import { UpdateStakeProjectPayload } from '@/types/Models/StakeProject/UpdateStakeProject/UpdateStakeProjectPayload';
import { UpdateStakeProjectMultiplierRulesInput } from '@/types/Models/StakeProject/UpdateStakeProjectMultiplierRules/UpdateStakeProjectMultiplierRulesInput';
import { UpdateStakeProjectMultiplierRulesPayload } from '@/types/Models/StakeProject/UpdateStakeProjectMultiplierRules/UpdateStakeProjectMultiplierRulesPayload';
import { UpdateStakeProjectPairMultiplierRulesInput } from '@/types/Models/StakeProject/UpdateStakeProjectPairMultiplierRules/UpdateStakeProjectPairMultiplierRulesInput';
import { UpdateStakeProjectPairMultiplierRulesPayload } from '@/types/Models/StakeProject/UpdateStakeProjectPairMultiplierRules/UpdateStakeProjectPairMultiplierRulesPayload';
import { UpdateStakeProjectPoliciesInput } from '@/types/Models/StakeProject/UpdateStakeProjectPolicies/UpdateStakeProjectPolicyInput';
import { UpdateStakeProjectPoliciesPayload } from '@/types/Models/StakeProject/UpdateStakeProjectPolicies/UpdateStakeProjectPolicyPayload';
import { gql } from 'graphql-request';

//---------------------------------------------------------------------------------------------------//
// StakeProject Add, Update, Delete Functions
//---------------------------------------------------------------------------------------------------//
export const mutateAddStakeProject = async () => {
    graphQLClient.setHeaders(await getGraphQLHeaders());
    const response: any = await graphQLClient.request(
        gql`
            mutation AddStakeProject() {
                addStakeProject() {
                    stakeProject {
                        id
                    }
                    error {
                        message
                    }
                }
            }
        `
    );

    const addStakeProjectPayload: AddStakeProjectsPayload = response?.addStakeProject;
    const addStakeProject: any = addStakeProjectPayload?.stakeProject || {};
    return addStakeProject;
};

export const mutateUpdateStakeProject = async (input: UpdateStakeProjectInput) => {
    const parameters = { input: input };
    graphQLClient.setHeaders(await getGraphQLHeaders());
    const response: any = await graphQLClient.request(
        gql`
            mutation UpdateStakeProject($input: UpdateStakeProjectInput!) {
                updateStakeProject(input: $input) {
                    stakeProject {
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

    const updateStakeProjectPayload: UpdateStakeProjectPayload = response?.updateStakeProject || {};
    return updateStakeProjectPayload;
};

export const mutateDeleteStakeProject = async (input: DeleteStakeProjectInput) => {
    const parameters = { input: input };
    graphQLClient.setHeaders(await getGraphQLHeaders());
    const response: any = await graphQLClient.request(
        gql`
            mutation DeleteStakeProject($input: DeleteStakeProjectInput!) {
                deleteStakeProject(input: $input) {
                    stakeProjects {
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

    const deleteStakeProject: DeleteStakeProjectPayload = response?.deleteStakeProject;
    const stakeProjects: any = deleteStakeProject.stakeProjects || {};
    return stakeProjects;
};

//---------------------------------------------------------------------------------------------------//
// Stake Project Extra Policy Update Function
//---------------------------------------------------------------------------------------------------//

export const mutateUpdateStakeProjectPolicies = async (input: UpdateStakeProjectPoliciesInput) => {
    const parameters = { input: input };
    graphQLClient.setHeaders(await getGraphQLHeaders());
    const response: any = await graphQLClient.request(
        gql`
            mutation UpdateStakeProjectPolicies($input: UpdateStakeProjectPoliciesInput!) {
                updateStakeProjectPolicies(input: $input) {
                    stakeProjectPolicies {
                        id
                        stake_project_id
                        primary_staking_policy_id
                        daily_nft_distribution
                        first_unstake_nft_bonus
                        stabilization_days
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

    const updateStakeProjectPoliciesPayload: UpdateStakeProjectPoliciesPayload = response?.updateStakeProjectPolicies || {};
    return updateStakeProjectPoliciesPayload;
};

//---------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------//
// Stake Project Multiplier Update Functions
//---------------------------------------------------------------------------------------------------//

export const mutateUpdateStakeProjectMultiplierRules = async (input: UpdateStakeProjectMultiplierRulesInput) => {
    const parameters = { input: input };
    graphQLClient.setHeaders(await getGraphQLHeaders());
    const response: any = await graphQLClient.request(
        gql`
            mutation UpdateStakeProjectMultiplierRules($input: UpdateStakeProjectMultiplierRulesInput!) {
                updateStakeProjectMultiplierRules(input: $input) {
                    stakeProjectMultiplierRules {
                        id
                        stake_project_id
                        policy_id
                        trait
                        value
                        multiplier
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

    const updateStakeProjectMultipliersPayload: UpdateStakeProjectMultiplierRulesPayload = response?.updateStakeProjectMultiplierRules || {};
    return updateStakeProjectMultipliersPayload;
};

export const mutateUpdateStakeProjectPairMultiplierRules = async (input: UpdateStakeProjectPairMultiplierRulesInput) => {
    const parameters = { input: input };
    graphQLClient.setHeaders(await getGraphQLHeaders());
    const response: any = await graphQLClient.request(
        gql`
            mutation UpdateStakeProjectPairMultiplierRules($input: UpdateStakeProjectPairMultiplierRulesInput!) {
                updateStakeProjectPairMultiplierRules(input: $input) {
                    stakeProjectPairMultiplierRules {
                        id
                        stake_project_id
                        main_policy_id
                        partner_policy_id
                        partner_trait
                        partner_trait_value
                        multiplier
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

    const updateStakeProjectPairMultipliersPayload: UpdateStakeProjectPairMultiplierRulesPayload =
        response?.updateStakeProjectPairMultiplierRules || {};
    return updateStakeProjectPairMultipliersPayload;
};

//---------------------------------------------------------------------------------------------------//
