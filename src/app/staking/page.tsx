'use client'

import { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { mutateCreateStakeTransaction, mutateSubmitStakeTransaction } from '@/api/GraphQL/Transaction/Stake/mutation';
import { ClaimComponent, CreateStakeTransactionInput, StakeComponent, UnstakeComponent } from '@/types/Transactions/StakeTransaction/CreateStakeTransactionInput';
import { CreateStakeTransactionPayload } from '@/types/Transactions/StakeTransaction/CreateStakeTransactionPayload';
import { queryDailyRewards, queryPotentialRewards, queryRemainingTokens, queryStakedNftCounts, queryStakedNftMainPairs, queryStakedNftPartnerPairs, queryStakedNfts } from '@/api/GraphQL/StakeProject/query';
import { GetPotentialRewardsInput, NFTStakeRewardInput } from '@/types/Models/NFT/Data/StakeProject/GetPotentialRewards/GetPotentialRewardsInput';
import { GetDailyRewardsInput, NFTDailyStakeRewardInput } from '@/types/Models/NFT/Data/StakeProject/GetDailyRewards/GetDailyRewardsInput';
import { GetStakedNFTPartnerPairsInput } from '@/types/Models/NFT/Data/StakeProject/GetStakedNFTPartnerPairs/GetStakedNFTPartnerPairsInput';
import { GetStakedNFTMainPairsInput, StakedNFTPairInput } from '@/types/Models/NFT/Data/StakeProject/GetStakedNFTMainPairs/GetStakedNFTMainPairsInput';
import { TransactionResult } from '@/types/Transactions/TransactionResult';
import { SuccessTransaction } from '@/types/Transactions/SuccessTransaction';
import { SignTransaction } from '@/utils/Transaction/GeneralTransactionUtils';
import { SubmitStakeTransactionInput } from '@/types/Transactions/StakeTransaction/SubmitStakeTransactionInput';
import { SubmitStakeTransactionPayload } from '@/types/Transactions/StakeTransaction/SubmitStakeTransactionPayload';
import { InvalidTransactionSignatureError } from '@/types/Classes/saturnError';


export const StakeSettings = () => {
    const [isStakingNFTs, setIsStakingNFTs] = useState(false);
    const [isUnstakingNFTs, setIsUnstakingNFTs] = useState(false);
    const [isClaimingNFTs, setIsClaimingNFTs] = useState(false);
    const [isGettingPotentialRewards, setIsGettingPotentialRewards] = useState(false);
    const [isGettingRemainingTokens, setIsGettingRemainingTokens] = useState(false);
    const [isGettingStakedNfts, setIsGettingStakedNfts] = useState(false);
    const [isGettingStakedNftCounts, setIsGettingStakedNftCounts] = useState(false);
    const [isGettingStakedNftMainPairs, setIsGettingStakedNftMainPairs] = useState(false);
    const [isGettingStakedNftPartnerPairs, setIsGettingStakedNftPartnerPairs] = useState(false);
    const [isGettingDailyRewards, setIsGettingDailyRewards] = useState(false);

    const stakeProject = "d51282e9-dacf-434d-b069-5c972e9d672d";

    const stakeNFTs = async (event: any) => {
        setIsStakingNFTs(true);
        await stakeNFT(event);
        setIsStakingNFTs(false);
    };

    const unstakeNFTs = async (event: any) => {
        setIsUnstakingNFTs(true);
        await unstakeNFT(event, stakeProject);
        setIsUnstakingNFTs(false);
    };

    const claimNFTs = async (event: any) => {
        setIsClaimingNFTs(true);
        await claimNFT(event, stakeProject);
        setIsClaimingNFTs(false);
    };

    const getPotentialRewards = async (event: any) => {
        setIsGettingPotentialRewards(true);
        await getPotentialRewardsFunction(event, stakeProject);
        setIsGettingPotentialRewards(false);
    };

    const getRemainingTokens = async (event: any) => {
        setIsGettingRemainingTokens(true);
        await getRemainingTokensFunction(event, stakeProject);
        setIsGettingRemainingTokens(false);
    };

    const getStakedNFTs = async (event: any) => {
        setIsGettingStakedNfts(true);
        await getStakedNFTsFunction(event, stakeProject);
        setIsGettingStakedNfts(false);
    };

    const getStakedNFTCounts = async (event: any) => {
        setIsGettingStakedNftCounts(true);
        await getStakedNftCountsFunction(event, stakeProject);
        setIsGettingStakedNftCounts(false);
    };

    const getStakedNFTMainPairs = async (event: any) => {
        setIsGettingStakedNftMainPairs(true);
        await getStakedNFTMainPairsFunction(event, stakeProject);
        setIsGettingStakedNftMainPairs(false);
    };

    const getStakedNFTPartnerPairs = async (event: any) => {
        setIsGettingStakedNftPartnerPairs(true);
        await getStakedNFTPartnerPairsFunction(event, stakeProject);
        setIsGettingStakedNftPartnerPairs(false);
    };

    const getNFTDailyRewards = async (event: any) => {
        setIsGettingDailyRewards(true);
        await getNFTDailyRewardsFunction(event, stakeProject);
        setIsGettingDailyRewards(false);
    };

    return (
        <div className="mb-12 mt-4 flex flex-col w-full">
             <div className="absolute inset-0 z-0 bg-gradient-to-b from-space-800 to-space-900">
            <Image
                src={'/images/EarthBackground.png'}
                alt="Saturn NFT"
                layout={'fill'}
                objectFit={'cover'}
                objectPosition={'center'}
                quality={100}
                priority={true}
                className="opacity-100"
            />
            </div>
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-space-800 to-space-900">
                <Image
                    src={'/images/BlobParty.png'}
                    alt="Saturn NFT"
                    layout={'fill'}
                    objectFit={'cover'}
                    objectPosition={'center'}
                    quality={100}
                    priority={true}
                    className="opacity-100"
                />
            </div>
            <div className="absolute bottom-0 right-0 z-10 w-32 h-32"> {/* Adjust the position and size here */}
                <Image
                    src={'/images/Logo.png'}
                    alt="Saturn NFT"
                    layout={'fill'}
                    objectFit={'cover'}
                    objectPosition={'center'}
                    quality={100}
                    priority={true}
                    className="opacity-100"
                />
            </div>

            <div className="flex flex-col w-full justify-center text-xl font-bold z-10">
                    <div className="flex w-full flex-col items-center gap-8 rounded-lg border-0 border-lightspace-200 bg-lightspace-500 px-16 py-2 font-bold text-white drop-shadow-black-sharp">

                        <div className="flex w-full flex-col gap-4">
                            
                            <div className="mb-6 mt-3 flex flex-col gap-8 w-full justify-start">
                                <button
                                    onClick={stakeNFTs}
                                    className={clsx(
                                        'flex h-14 w-56 items-center justify-center rounded-lg bg-yellow-500 text-2xl font-bold drop-shadow-black-sharp',
                                        'hover:bg-yellow-400',
                                        'active:bg-yellow-300'
                                    )}
                                >
                                    <div className="drop-shadow-black-sharp">{'Stake NFT'}</div>
                                </button>
                                <button
                                    onClick={unstakeNFTs}
                                    className={clsx(
                                        'flex h-14 w-56 items-center justify-center rounded-lg bg-yellow-500 text-2xl font-bold drop-shadow-black-sharp',
                                        'hover:bg-yellow-400',
                                        'active:bg-yellow-300'
                                    )}
                                >
                                    <div className="drop-shadow-black-sharp">{'Unstake NFT'}</div>
                                </button>
                                <button
                                    onClick={claimNFTs}
                                    className={clsx(
                                        'flex h-14 w-56 items-center justify-center rounded-lg bg-yellow-500 text-2xl font-bold drop-shadow-black-sharp',
                                        'hover:bg-yellow-400',
                                        'active:bg-yellow-300'
                                    )}
                                >
                                    <div className="drop-shadow-black-sharp">{'Claim NFT'}</div>
                                </button>
                                <button
                                    onClick={getPotentialRewards}
                                    className={clsx(
                                        'flex h-14 w-56 items-center justify-center rounded-lg bg-yellow-500 text-2xl font-bold drop-shadow-black-sharp',
                                        'hover:bg-yellow-400',
                                        'active:bg-yellow-300'
                                    )}
                                >
                                    <div className="drop-shadow-black-sharp">
                                        {'Get Potential Rewards'}
                                    </div>
                                </button>
                                <button
                                    onClick={getRemainingTokens}
                                    className={clsx(
                                        'flex h-14 w-56 items-center justify-center rounded-lg bg-yellow-500 text-2xl font-bold drop-shadow-black-sharp',
                                        'hover:bg-yellow-400',
                                        'active:bg-yellow-300'
                                    )}
                                >
                                    <div className="drop-shadow-black-sharp">
                                        {'Get Remaining Tokens'}
                                    </div>
                                </button>
                                <button
                                    onClick={getStakedNFTs}
                                    className={clsx(
                                        'flex h-14 w-56 items-center justify-center rounded-lg bg-yellow-500 text-2xl font-bold drop-shadow-black-sharp',
                                        'hover:bg-yellow-400',
                                        'active:bg-yellow-300'
                                    )}
                                >
                                    <div className="drop-shadow-black-sharp">
                                        {'Get Staked NFTs'}
                                    </div>
                                </button>
                                <button
                                    onClick={getStakedNFTCounts}
                                    className={clsx(
                                        'flex h-14 w-56 items-center justify-center rounded-lg bg-yellow-500 text-2xl font-bold drop-shadow-black-sharp',
                                        'hover:bg-yellow-400',
                                        'active:bg-yellow-300'
                                    )}
                                >
                                    <div className="drop-shadow-black-sharp">
                                        {'Get Staked NFT Counts'}
                                    </div>
                                </button>
                                <button
                                    onClick={getStakedNFTMainPairs}
                                    className={clsx(
                                        'flex h-14 w-56 items-center justify-center rounded-lg bg-yellow-500 text-2xl font-bold drop-shadow-black-sharp',
                                        'hover:bg-yellow-400',
                                        'active:bg-yellow-300'
                                    )}
                                >
                                    <div className="drop-shadow-black-sharp">
                                        {'Get Staked NFT Main Pairs'}
                                    </div>
                                </button>
                                <button
                                    onClick={getStakedNFTPartnerPairs}
                                    className={clsx(
                                        'flex h-14 w-56 items-center justify-center rounded-lg bg-yellow-500 text-2xl font-bold drop-shadow-black-sharp',
                                        'hover:bg-yellow-400',
                                        'active:bg-yellow-300'
                                    )}
                                >
                                    <div className="drop-shadow-black-sharp">
                                        {'Get Staked NFT Partner Pairs'}
                                    </div>
                                </button>
                                <button
                                    onClick={getNFTDailyRewards}
                                    className={clsx(
                                        'flex h-14 w-56 items-center justify-center rounded-lg bg-yellow-500 text-2xl font-bold drop-shadow-black-sharp',
                                        'hover:bg-yellow-400',
                                        'active:bg-yellow-300'
                                    )}
                                >
                                    <div className="drop-shadow-black-sharp">
                                        {'Get Daily Rewards'}
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    );
};

export default StakeSettings;


//---------------------------------------------------------------------------//

//---------------------------------------------------------------------------//
// Save functions
//---------------------------------------------------------------------------//

const stakeNFT = async (event: any) => {
    event.preventDefault();
    try {
        const stakeComponent1: StakeComponent = {
            stakeProjectId: "d51282e9-dacf-434d-b069-5c972e9d672d",
            policyId: '80fe5596d16d7c9e5255e46670e59d8644baf94d2a55ec9b382c4639',
            assetName: '000de1404e4654202331383239',
        };

        const stakeComponent2: StakeComponent = {
            stakeProjectId: "d51282e9-dacf-434d-b069-5c972e9d672d",
            policyId: '612cc2c8dccb72811bb01f2a4d56e4d1aa1e7f0fca10874c18883c1f',
            assetName: '546573744e46547331',
        };

        const stakeComponent3: StakeComponent = {
            stakeProjectId: "d51282e9-dacf-434d-b069-5c972e9d672d",
            policyId: '20863f181a21b131b01cab3d12242e598a408ba99440181635414a63',
            assetName: '000de1404d756c67616b6f6e677a31',
        };

        const createInput: CreateStakeTransactionInput = {
            paymentAddress: "addr_test1qpg8uwvs82jxknfkfdfv9dea2vhxe4zgagnxfms3nl5gqq2gst2av4c4typr5vszq7lwsehathdlmnyw99v75met0e0qlkrk2p",
            stakeComponents: [stakeComponent1, stakeComponent2, stakeComponent3],
            unstakeComponents: [],
            addStakeTokenComponents: [],
        };

        const createTransaction: CreateStakeTransactionPayload = await mutateCreateStakeTransaction(createInput);
        
        const successTransactions = createTransaction?.successTransactions;
        if (!successTransactions || successTransactions.length <= 0) {
            return { error: createTransaction?.error } as TransactionResult;
        }

        const submitSuccesses: SuccessTransaction[] = [];
        for (const successTransaction of successTransactions) {
            const transactionId: any = successTransaction?.transactionId;
            const hexTransaction: any = successTransaction?.hexTransaction;

            // Sign each transaction
            const signedHexTx = await SignTransaction(hexTransaction);
            if (!signedHexTx) {
                return {
                    error: InvalidTransactionSignatureError,
                } as TransactionResult;
            }

            const submitSuccess: SuccessTransaction = {
                transactionId: transactionId,
                hexTransaction: signedHexTx,
            };
            submitSuccesses.push(submitSuccess);
        }

        const submitInput: SubmitStakeTransactionInput = {
            paymentAddress: "addr_test1qpg8uwvs82jxknfkfdfv9dea2vhxe4zgagnxfms3nl5gqq2gst2av4c4typr5vszq7lwsehathdlmnyw99v75met0e0qlkrk2p",
            successTransactions: submitSuccesses,
        };
        const submitTransaction: SubmitStakeTransactionPayload = await mutateSubmitStakeTransaction(submitInput);

        const transactionIds: any = submitTransaction?.transactionIds;
        if (!transactionIds || transactionIds.length <= 0 || !!submitTransaction.error) {
            return { error: submitTransaction?.error } as TransactionResult;
        }
        return { transactionIds: transactionIds } as TransactionResult;
    } catch (error: any) {
      console.log(error);
    }
};

const unstakeNFT = async (event: any, stakeProject: any) => {
    event.preventDefault();
    try {
        const unstakeComponent1: UnstakeComponent = {
            stakeProjectId: "d51282e9-dacf-434d-b069-5c972e9d672d",
            policyId: '80fe5596d16d7c9e5255e46670e59d8644baf94d2a55ec9b382c4639',
            assetName: '000de1404e4654202331383239',
        };

        const unstakeComponent2: UnstakeComponent = {
            stakeProjectId: "d51282e9-dacf-434d-b069-5c972e9d672d",
            policyId: '612cc2c8dccb72811bb01f2a4d56e4d1aa1e7f0fca10874c18883c1f',
            assetName: '546573744e46547331',
        };

        const unstakeComponent3: UnstakeComponent = {
            stakeProjectId: "d51282e9-dacf-434d-b069-5c972e9d672d",
            policyId: '20863f181a21b131b01cab3d12242e598a408ba99440181635414a63',
            assetName: '000de1404d756c67616b6f6e677a31',
        };


        const createInput: CreateStakeTransactionInput = {
            paymentAddress: "addr_test1qpg8uwvs82jxknfkfdfv9dea2vhxe4zgagnxfms3nl5gqq2gst2av4c4typr5vszq7lwsehathdlmnyw99v75met0e0qlkrk2p",
            stakeComponents: [],
            unstakeComponents: [unstakeComponent1, unstakeComponent2, unstakeComponent3],
            addStakeTokenComponents: [],
        };

        const createTransaction: CreateStakeTransactionPayload = await mutateCreateStakeTransaction(createInput);

        console.log("1");
        
        const successTransactions = createTransaction?.successTransactions;
        if (!successTransactions || successTransactions.length <= 0) {
            return { error: createTransaction?.error } as TransactionResult;
        }

        const submitSuccesses: SuccessTransaction[] = [];

        console.log("2");
        for (const successTransaction of successTransactions) {
            const transactionId: any = successTransaction?.transactionId;
            const hexTransaction: any = successTransaction?.hexTransaction;

            console.log("3");

            // Sign each transaction
            const signedHexTx = await SignTransaction(hexTransaction);
            if (!signedHexTx) {
                return {
                    error: InvalidTransactionSignatureError,
                } as TransactionResult;
            }

            console.log("4");

            const submitSuccess: SuccessTransaction = {
                transactionId: transactionId,
                hexTransaction: signedHexTx,
            };

            console.log("5");

            submitSuccesses.push(submitSuccess);
        }

        const submitInput: SubmitStakeTransactionInput = {
            paymentAddress: "addr_test1qpg8uwvs82jxknfkfdfv9dea2vhxe4zgagnxfms3nl5gqq2gst2av4c4typr5vszq7lwsehathdlmnyw99v75met0e0qlkrk2p",
            successTransactions: submitSuccesses,
        };
        const submitTransaction: SubmitStakeTransactionPayload = await mutateSubmitStakeTransaction(submitInput);

        const transactionIds: any = submitTransaction?.transactionIds;
        if (!transactionIds || transactionIds.length <= 0 || !!submitTransaction.error) {
            return { error: submitTransaction?.error } as TransactionResult;
        }
        return { transactionIds: transactionIds } as TransactionResult;
    } catch (error: any) {
      console.log(error);
    }
};

const claimNFT = async (event: any, stakeProject: any) => {
    event.preventDefault();
    try {
        const claimComponent1: ClaimComponent = {
            stakeProjectId: "d51282e9-dacf-434d-b069-5c972e9d672d",
            policyId: '80fe5596d16d7c9e5255e46670e59d8644baf94d2a55ec9b382c4639',
            assetName: '000de1404e4654202331383239',
        };

        const claimComponent2: ClaimComponent = {
            stakeProjectId: "d51282e9-dacf-434d-b069-5c972e9d672d",
            policyId: '612cc2c8dccb72811bb01f2a4d56e4d1aa1e7f0fca10874c18883c1f',
            assetName: '546573744e46547331',
        };

        const claimComponent3: ClaimComponent = {
            stakeProjectId: "d51282e9-dacf-434d-b069-5c972e9d672d",
            policyId: '20863f181a21b131b01cab3d12242e598a408ba99440181635414a63',
            assetName: '000de1404d756c67616b6f6e677a31',
        };

        const createInput: CreateStakeTransactionInput = {
            paymentAddress: "addr_test1qpg8uwvs82jxknfkfdfv9dea2vhxe4zgagnxfms3nl5gqq2gst2av4c4typr5vszq7lwsehathdlmnyw99v75met0e0qlkrk2p",
            stakeComponents: [],
            unstakeComponents: [claimComponent1, claimComponent2, claimComponent3],
            addStakeTokenComponents: [],
        };

        const createTransaction: CreateStakeTransactionPayload = await mutateCreateStakeTransaction(createInput);
        
        const successTransactions = createTransaction?.successTransactions;
        if (!successTransactions || successTransactions.length <= 0) {
            return { error: createTransaction?.error } as TransactionResult;
        }

        const submitSuccesses: SuccessTransaction[] = [];
        for (const successTransaction of successTransactions) {
            const transactionId: any = successTransaction?.transactionId;
            const hexTransaction: any = successTransaction?.hexTransaction;

            // Sign each transaction
            const signedHexTx = await SignTransaction(hexTransaction);
            if (!signedHexTx) {
                return {
                    error: InvalidTransactionSignatureError,
                } as TransactionResult;
            }

            const submitSuccess: SuccessTransaction = {
                transactionId: transactionId,
                hexTransaction: signedHexTx,
            };
            submitSuccesses.push(submitSuccess);
        }

        const submitInput: SubmitStakeTransactionInput = {
            paymentAddress: "addr_test1qpg8uwvs82jxknfkfdfv9dea2vhxe4zgagnxfms3nl5gqq2gst2av4c4typr5vszq7lwsehathdlmnyw99v75met0e0qlkrk2p",
            successTransactions: submitSuccesses,
        };
        const submitTransaction: SubmitStakeTransactionPayload = await mutateSubmitStakeTransaction(submitInput);

        const transactionIds: any = submitTransaction?.transactionIds;
        if (!transactionIds || transactionIds.length <= 0 || !!submitTransaction.error) {
            return { error: submitTransaction?.error } as TransactionResult;
        }
        return { transactionIds: transactionIds } as TransactionResult;
    } catch (error: any) {
      console.log(error);
    }
};

const getPotentialRewardsFunction = async (event: any, stakeProject: any) => {
    event.preventDefault();
    try {
        const stakeProjectId = "d51282e9-dacf-434d-b069-5c972e9d672d";
        console.log(stakeProjectId);

        const stakeNft1: NFTStakeRewardInput = {
            policyId: '80fe5596d16d7c9e5255e46670e59d8644baf94d2a55ec9b382c4639',
            assetName: '000de1404e4654202331383530',
        };

        const stakeNft2: NFTStakeRewardInput = {
            policyId: '80fe5596d16d7c9e5255e46670e59d8644baf94d2a55ec9b382c4639',
            assetName: '000de1404e4654202331383330',
        };

        const stakeNft3: NFTStakeRewardInput = {
            policyId: '80fe5596d16d7c9e5255e46670e59d8644baf94d2a55ec9b382c4639',
            assetName: '000de1404e4654202331383438',
        };

        const getPotentialRewardsInput: GetPotentialRewardsInput = {
            stakeProjectId: stakeProjectId,
            nftStakeRewardInputs: [stakeNft1, stakeNft2, stakeNft3],
        };

        const result = await queryPotentialRewards(getPotentialRewardsInput);
        return result;
    } catch (error: any) {
      console.log(error);
    }
};

const getRemainingTokensFunction = async (event: any, stakeProject: any) => {
    event.preventDefault();
    try {
        const stakeProjectId = "d51282e9-dacf-434d-b069-5c972e9d672d";

        const result = await queryRemainingTokens(stakeProjectId);
        return result;
    } catch (error: any) {
      console.log(error);
    }
};

const getStakedNFTsFunction = async (event: any, stakeProject: any) => {
    event.preventDefault();
    try {
        const stakeProjectId = "d51282e9-dacf-434d-b069-5c972e9d672d";
        const result = await queryStakedNfts(stakeProjectId);
        return result;
    } catch (error: any) {
      console.log(error);
    }
};

const getStakedNftCountsFunction = async (event: any, stakeProject: any) => {
    event.preventDefault();
    try {
        const stakeProjectId = "d51282e9-dacf-434d-b069-5c972e9d672d";
        const result = await queryStakedNftCounts(stakeProjectId);
        return result;
    } catch (error: any) {
        console.log(error);
      }
};

const getStakedNFTMainPairsFunction = async (event: any, stakeProject: any) => {
    event.preventDefault();
    try {
        const stakeProjectId = "d51282e9-dacf-434d-b069-5c972e9d672d";

        const stakeNft1: StakedNFTPairInput = {
            assetName: '000de1404e4654202331383336',
        };

        const stakeNft2: StakedNFTPairInput = {
            assetName: '000de1404e4654202331383239',
        };

        const stakeNft3: StakedNFTPairInput = {
            assetName: '000de1404e4654202331383432',
        };

        const getStakedNFTMainPairsInput: GetStakedNFTMainPairsInput = {
            stakeProjectId: stakeProjectId,
            policyId: '80fe5596d16d7c9e5255e46670e59d8644baf94d2a55ec9b382c4639',
            stakedNFTPairInputs: [stakeNft1, stakeNft2, stakeNft3],
        };

        const result = await queryStakedNftMainPairs(getStakedNFTMainPairsInput);
        return result;
    } catch (error: any) {
        console.log(error);
      }
};

const getStakedNFTPartnerPairsFunction = async (event: any, stakeProject: any) => {
    event.preventDefault();
    try {
        const stakeProjectId = "d51282e9-dacf-434d-b069-5c972e9d672d";

        const stakeNft1: StakedNFTPairInput = {
            assetName: '000de140546573686f6d65',
        };

        const stakeNft2: StakedNFTPairInput = {
            assetName: '000de1404c757675796f',
        };

        const stakeNft3: StakedNFTPairInput = {
            assetName: '000de1404d6f6c61746f',
        };

        const getStakedNFTMainPairsInput: GetStakedNFTPartnerPairsInput = {
            stakeProjectId: stakeProjectId,
            policyId: '80fe5596d16d7c9e5255e46670e59d8644baf94d2a55ec9b382c4639',
            stakedNFTPairInputs: [stakeNft1, stakeNft2, stakeNft3],
        };

        const result = await queryStakedNftPartnerPairs(getStakedNFTMainPairsInput);
        return result;
    } catch (error: any) {
        console.log(error);
      }
};

const getNFTDailyRewardsFunction = async (event: any, stakeProject: any) => {
    event.preventDefault();
    try {
        const stakeProjectId = "d51282e9-dacf-434d-b069-5c972e9d672d";

        const stakeNft1: NFTDailyStakeRewardInput = {
            policyId: '80fe5596d16d7c9e5255e46670e59d8644baf94d2a55ec9b382c4639',
            assetName: '000de1404e4654202331383530',
        };

        const stakeNft2: NFTDailyStakeRewardInput = {
            policyId: '80fe5596d16d7c9e5255e46670e59d8644baf94d2a55ec9b382c4639',
            assetName: '000de1404e4654202331383330',
        };

        const stakeNft3: NFTDailyStakeRewardInput = {
            policyId: '80fe5596d16d7c9e5255e46670e59d8644baf94d2a55ec9b382c4639',
            assetName: '000de1404e4654202331383438',
        };

        const getPotentialRewardsInput: GetDailyRewardsInput = {
            stakeProjectId: stakeProjectId,
            nftDailyStakeRewardInputs: [stakeNft1, stakeNft2, stakeNft3],
        };

        const result = await queryDailyRewards(getPotentialRewardsInput);
        return result;
    } catch (error: any) {
        console.log(error);
      }
};
//---------------------------------------------------------------------------//
