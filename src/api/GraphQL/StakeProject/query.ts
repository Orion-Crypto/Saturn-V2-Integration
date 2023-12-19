import { getGraphQLHeaders, graphQLClient, v2GraphQLClient } from '@/api/api';
import { GetDailyRewardsInput } from '@/types/Models/StakeProject/GetDailyRewards/GetDailyRewardsInput';
import { GetDailyRewardsPayload } from '@/types/Models/StakeProject/GetDailyRewards/GetDailyRewardsPayload';
import { GetPotentialRewardsInput } from '@/types/Models/StakeProject/GetPotentialRewards/GetPotentialRewardsInput';
import { GetPotentialRewardsPayload } from '@/types/Models/StakeProject/GetPotentialRewards/GetPotentialRewardsPayload';
import { GetRemainingTokensPayload } from '@/types/Models/StakeProject/GetRemainingTokens/GetRemainingTokensPayload';
import { GetStakedNFTMainPairsInput } from '@/types/Models/StakeProject/GetStakedNFTMainPairs/GetStakedNFTMainPairsInput';
import { GetStakedNFTMainPairsPayload } from '@/types/Models/StakeProject/GetStakedNFTMainPairs/GetStakedNFTMainPairsPayload';
import { GetStakedNFTPartnerPairsInput } from '@/types/Models/StakeProject/GetStakedNFTPartnerPairs/GetStakedNFTPartnerPairsInput';
import { GetStakedNFTPartnerPairsPayload } from '@/types/Models/StakeProject/GetStakedNFTPartnerPairs/GetStakedNFTPartnerPairsPayload';
import { GetStakedNFTCountsPayload } from '@/types/Models/StakeProject/GetStakedNftCounts/GetStakedNftsCountPayload';
import { gql } from 'graphql-request';

export const graphQLStakeProject = `
    id
    name
    primary_staking_policy_id
    total_distribution
    total_remaining_distribution
    daily_nft_distribution
    daily_secondary_nft_distribution
    token_policy_id
    token_asset_name
    token_decimals
    is_verified
    prices {
        id
        ada_price
        allow_ada_payment
        is_main_price
        token_prices {
            token_price
            token_full_name
            token_name
            token_image
            token_decimals
            allow_token_payment
        }
    }
    plutus_script {
        id
        script_address
        transaction_hash
        transaction_index
    }
    stake_project_policies {
        id
        stake_project_id
        primary_staking_policy_id
        daily_nft_distribution
        first_unstake_nft_bonus
        stabilization_days
    }
    stake_project_multiplier_rules {
        id
        stake_project_id
        policy_id
        trait
        value
        multiplier
    }
    stake_project_pair_multiplier_rules {
        id
        stake_project_id
        main_policy_id
        partner_policy_id
        partner_trait
        partner_trait_value
        multiplier
    }
`;

//---------------------------------------------------------------------------------------------------//
// Get NFTProject Functions
//---------------------------------------------------------------------------------------------------//
export const queryStakeProject = async (id: string) => {
    if (!id) return null;

    graphQLClient.setHeaders(await getGraphQLHeaders());
    const input = { id: id };
    const response: any = await graphQLClient.request(
        gql`
            query StakeProject($id: String!) {
                stakeProject(id: $id) {
                    ${graphQLStakeProject}
                }
            }
        `,
        input
    );
    const stakeProject: any = response?.stakeProject || {};
    return stakeProject;
};

//---------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------//
// Token Get Amount Functions
//---------------------------------------------------------------------------------------------------//
export const queryPotentialRewards = async (input: GetPotentialRewardsInput) => {
    graphQLClient.setHeaders(await getGraphQLHeaders());
    const parameters = { input: input };
    const response: any = await graphQLClient.request(
        gql`
            query PotentialRewards($input: GetPotentialRewardsInput!) {
                potentialRewards(input: $input) {
                    nftStakeRewardsPayloads {
                        stakeProjectId
                        policyId
                        assetName
                        rewards
                        daysStaked
                        spend_utxo_status
                    }
                    error {
                        message
                    }
                }
            }
        `,
        parameters
    );

    const getPotentialRewardsPayload: GetPotentialRewardsPayload = response?.potentialRewards;
    const getPotentialRewards: any = getPotentialRewardsPayload?.nftStakeRewardsPayloads || {};
    return getPotentialRewards;
};

export const queryDailyRewards = async (input: GetDailyRewardsInput) => {
    graphQLClient.setHeaders(await getGraphQLHeaders());
    const parameters = { input: input };
    const response: any = await graphQLClient.request(
        gql`
            query DailyRewards($input: GetDailyRewardsInput!) {
                dailyRewards(input: $input) {
                    nftDailyStakeRewardsPayloads {
                        stakeProjectId
                        policyId
                        assetName
                        rewards
                    }
                    error {
                        message
                    }
                }
            }
        `,
        parameters
    );

    const getDailyRewardsPayload: GetDailyRewardsPayload = response?.potentialRewards;
    const getDailyRewards: any = getDailyRewardsPayload?.nftDailyStakeRewardsPayloads || {};
    return getDailyRewards;
};

export const queryRemainingTokens = async (id: string) => {
    if (!id) return null;
    graphQLClient.setHeaders(await getGraphQLHeaders());
    const input = { id: id };
    const response: any = await graphQLClient.request(
        gql`
            query RemainingTokens($id: String!) {
                remainingTokens(id: $id) {
                    tokens
                    error {
                        message
                    }
                }
            }
        `,
        input
    );

    const getRemainingTokensPayload: GetRemainingTokensPayload = response?.remainingTokens;
    const getRemainingTokens: any = getRemainingTokensPayload?.tokens || {};
    return getRemainingTokens;
};

export const queryStakedNftCounts = async (id: string) => {
    if (!id) return null;
    graphQLClient.setHeaders(await getGraphQLHeaders());
    const input = { id: id };
    const response: any = await graphQLClient.request(
        gql`
            query StakedNftCounts($id: String!) {
                stakedNftCounts(id: $id) {
                    stakedNftCounts {
                        key
                        value
                    }
                    error {
                        message
                    }
                }
            }
        `,
        input
    );

    const getStakedNftCountsPayload: GetStakedNFTCountsPayload = response?.stakedNftCounts;
    const getStakedNftCounts: any = getStakedNftCountsPayload?.stakedNftCounts || {};
    return getStakedNftCounts;
};

export const queryStakedNftMainPairs = async (input: GetStakedNFTMainPairsInput) => {
    graphQLClient.setHeaders(await getGraphQLHeaders());
    const parameters = { input: input };
    const response: any = await graphQLClient.request(
        gql`
            query StakedNftMainPairs($input: GetStakedNFTMainPairsInput!) {
                stakedNftMainPairs(input: $input) {
                    stakedNFTPairPayloads {
                        stakeProjectId
                        mainPolicyId
                        mainAssetName
                        partnerPolicyId
                        partnerAssetName
                    }
                    error {
                        message
                    }
                }
            }
        `,
        parameters
    );

    const getStakedNftMainPairsPayload: GetStakedNFTMainPairsPayload = response?.stakedNftMainPairs;
    const getStakedNFTPairPayloads: any = getStakedNftMainPairsPayload?.stakedNFTPairPayloads || {};
    return getStakedNFTPairPayloads;
};

export const queryStakedNftPartnerPairs = async (input: GetStakedNFTPartnerPairsInput) => {
    graphQLClient.setHeaders(await getGraphQLHeaders());
    const parameters = { input: input };
    const response: any = await graphQLClient.request(
        gql`
            query StakedNftPartnerPairs($input: GetStakedNFTPartnerPairsInput!) {
                stakedNftPartnerPairs(input: $input) {
                    stakedNFTPairPayloads {
                        stakeProjectId
                        mainPolicyId
                        mainAssetName
                        partnerPolicyId
                        partnerAssetName
                    }
                    error {
                        message
                    }
                }
            }
        `,
        parameters
    );

    const getStakedNftPartnerPairsPayload: GetStakedNFTPartnerPairsPayload = response?.stakedNftPartnerPairs;
    const getStakedNFTPairPayloads: any = getStakedNftPartnerPairsPayload?.stakedNFTPairPayloads || {};
    return getStakedNFTPairPayloads;
};
//---------------------------------------------------------------------------------------------------//
