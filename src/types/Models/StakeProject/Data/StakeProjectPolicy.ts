export interface StakeProjectPolicy {
    id: string;
    stake_project_id: string;

    primary_staking_policy_id?: string | null;

    daily_nft_distribution?: number | null;

    first_unstake_nft_bonus?: number | null;

    stabilization_days?: number | null;
}
