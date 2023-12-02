export interface GetStakedNFTMainPairsInput {
    stakeProjectId?: string;
    policyId?: string;
    stakedNFTPairInputs?: StakedNFTPairInput[];
}

export interface StakedNFTPairInput {
    assetName?: string;
}
