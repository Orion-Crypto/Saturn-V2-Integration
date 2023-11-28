export interface GetStakedNFTPartnerPairsInput {
    stakeProjectId?: string;
    policyId?: string;
    stakedNFTPairInputs?: StakedNFTPartnerPairInput[];
}

export interface StakedNFTPartnerPairInput {
    assetName?: string;
}
