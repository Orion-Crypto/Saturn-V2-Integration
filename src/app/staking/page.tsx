'use client';

import {
    queryDailyRewards,
    queryDailyRewardsWithPending,
    queryPotentialRewards,
    queryPotentialRewardsWithPending,
    queryRemainingTokens,
    queryStakedNftCounts,
    queryStakedNftMainPairs,
    queryStakedNftPartnerPairs,
} from '@/api/GraphQL/StakeProject/query';
import { mutateCreateStakeTransaction, mutateSubmitStakeTransaction } from '@/api/GraphQL/Transaction/Stake/mutation';
import { InvalidTransactionSignatureError } from '@/types/Classes/saturnError';
import { GetDailyRewardsInput, NFTDailyStakeRewardInput } from '@/types/Models/StakeProject/GetDailyRewards/GetDailyRewardsInput';
import { GetDailyRewardsWithPendingInput } from '@/types/Models/StakeProject/GetDailyRewardsWithPending/GetDailyRewardsWithPendingInput';
import { GetPotentialRewardsInput, NFTStakeRewardInput } from '@/types/Models/StakeProject/GetPotentialRewards/GetPotentialRewardsInput';
import { GetPotentialRewardsWithPendingInput } from '@/types/Models/StakeProject/GetPotentialRewardsWithPending/GetPotentialRewardsWithPendingInput';
import { GetStakedNFTMainPairsInput, StakedNFTPairInput } from '@/types/Models/StakeProject/GetStakedNFTMainPairs/GetStakedNFTMainPairsInput';
import { GetStakedNFTPartnerPairsInput } from '@/types/Models/StakeProject/GetStakedNFTPartnerPairs/GetStakedNFTPartnerPairsInput';
import {
    ClaimComponent,
    CreateStakeTransactionInput,
    StakeComponent,
    UnstakeComponent,
} from '@/types/Transactions/StakeTransaction/CreateStakeTransactionInput';
import { CreateStakeTransactionPayload } from '@/types/Transactions/StakeTransaction/CreateStakeTransactionPayload';
import { SubmitStakeTransactionInput } from '@/types/Transactions/StakeTransaction/SubmitStakeTransactionInput';
import { SubmitStakeTransactionPayload } from '@/types/Transactions/StakeTransaction/SubmitStakeTransactionPayload';
import { SuccessTransaction } from '@/types/Transactions/SuccessTransaction';
import { TransactionResult } from '@/types/Transactions/TransactionResult';
import { SignTransaction } from '@/utils/Transaction/GeneralTransactionUtils';
import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';

const StakeSettings = () => {
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

    const stakeProject = 'd51282e9-dacf-434d-b069-5c972e9d672d';

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
        <div className="mb-12 mt-4 flex w-full flex-col">
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
            <div className="absolute bottom-0 right-0 z-10 h-32 w-32">
                {' '}
                {/* Adjust the position and size here */}
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

            <div className="z-10 flex w-full flex-col justify-center text-xl font-bold">
                <div className="flex w-full flex-col items-center gap-8 rounded-lg border-0 border-lightspace-200 px-16 py-2 font-bold text-white drop-shadow-black-sharp">
                    <div className="flex w-full flex-col gap-4">
                        <div className="mb-6 mt-3 flex w-full flex-col justify-start gap-8">
                            <button
                                onClick={stakeNFTs}
                                //disabled={isStakingNFTs} // Disable button when isStakingNFTs is true
                                disabled={true}
                                className={clsx(
                                    'flex h-14 w-56 items-center justify-center rounded-lg bg-gray-500 text-2xl font-bold drop-shadow-black-sharp'
                                )}
                            >
                                <div className="drop-shadow-black-sharp">{'Stake NFT'}</div>
                            </button>
                            <button
                                onClick={unstakeNFTs}
                                //disabled={isUnstakingNFTs} // Disable button when isUnstakingNFTs is true
                                disabled={true}
                                className={clsx(
                                    'flex h-14 w-56 items-center justify-center rounded-lg bg-gray-500 text-2xl font-bold drop-shadow-black-sharp'
                                )}
                            >
                                <div className="drop-shadow-black-sharp">{'Unstake NFT'}</div>
                            </button>
                            <button
                                onClick={claimNFTs}
                                //disabled={isClaimingNFTs} // Disable button when isClaimingNFTs is true
                                disabled={true}
                                className={clsx(
                                    'flex h-14 w-56 items-center justify-center rounded-lg bg-gray-500 text-2xl font-bold drop-shadow-black-sharp'
                                )}
                            >
                                <div className="drop-shadow-black-sharp">{'Claim NFT'}</div>
                            </button>
                            <button
                                onClick={getPotentialRewards}
                                disabled={isGettingPotentialRewards} // Disable button when isGettingPotentialRewards is true
                                className={clsx(
                                    'flex h-14 w-56 items-center justify-center rounded-lg bg-yellow-500 text-2xl font-bold drop-shadow-black-sharp',
                                    'hover:bg-yellow-400',
                                    'active:bg-yellow-300'
                                )}
                            >
                                <div className="drop-shadow-black-sharp">{'Get Potential Rewards'}</div>
                            </button>
                            <button
                                onClick={getRemainingTokens}
                                disabled={isGettingRemainingTokens} // Disable button when isGettingRemainingTokens is true
                                className={clsx(
                                    'flex h-14 w-56 items-center justify-center rounded-lg bg-yellow-500 text-2xl font-bold drop-shadow-black-sharp',
                                    'hover:bg-yellow-400',
                                    'active:bg-yellow-300'
                                )}
                            >
                                <div className="drop-shadow-black-sharp">{'Get Remaining Tokens'}</div>
                            </button>
                            <button
                                onClick={getStakedNFTCounts}
                                disabled={isGettingStakedNftCounts} // Disable button when isGettingStakedNftCounts is true
                                className={clsx(
                                    'flex h-14 w-56 items-center justify-center rounded-lg bg-yellow-500 text-2xl font-bold drop-shadow-black-sharp',
                                    'hover:bg-yellow-400',
                                    'active:bg-yellow-300'
                                )}
                            >
                                <div className="drop-shadow-black-sharp">{'Get Staked NFT Counts'}</div>
                            </button>
                            <button
                                onClick={getStakedNFTMainPairs}
                                disabled={isGettingStakedNftMainPairs} // Disable button when isGettingStakedNftMainPairs is true
                                className={clsx(
                                    'flex h-14 w-56 items-center justify-center rounded-lg bg-yellow-500 text-2xl font-bold drop-shadow-black-sharp',
                                    'hover:bg-yellow-400',
                                    'active:bg-yellow-300'
                                )}
                            >
                                <div className="drop-shadow-black-sharp">{'Get Staked NFT Main Pairs'}</div>
                            </button>
                            <button
                                onClick={getStakedNFTPartnerPairs}
                                disabled={isGettingStakedNftPartnerPairs} // Disable button when isGettingStakedNftPartnerPairs is true
                                className={clsx(
                                    'flex h-14 w-56 items-center justify-center rounded-lg bg-yellow-500 text-2xl font-bold drop-shadow-black-sharp',
                                    'hover:bg-yellow-400',
                                    'active:bg-yellow-300'
                                )}
                            >
                                <div className="drop-shadow-black-sharp">{'Get Staked NFT Partner Pairs'}</div>
                            </button>
                            <button
                                onClick={getNFTDailyRewards}
                                disabled={isGettingDailyRewards} // Disable button when isGettingDailyRewards is true
                                className={clsx(
                                    'flex h-14 w-56 items-center justify-center rounded-lg bg-yellow-500 text-2xl font-bold drop-shadow-black-sharp',
                                    'hover:bg-yellow-400',
                                    'active:bg-yellow-300'
                                )}
                            >
                                <div className="drop-shadow-black-sharp">{'Get Daily Rewards'}</div>
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
            stakeProjectId: 'd51282e9-dacf-434d-b069-5c972e9d672d',
            policyId: '80fe5596d16d7c9e5255e46670e59d8644baf94d2a55ec9b382c4639',
            assetName: '000de1404e4654202331383239',
        };

        const stakeComponent2: StakeComponent = {
            stakeProjectId: 'd51282e9-dacf-434d-b069-5c972e9d672d',
            policyId: '612cc2c8dccb72811bb01f2a4d56e4d1aa1e7f0fca10874c18883c1f',
            assetName: '546573744e46547331',
        };

        const stakeComponent3: StakeComponent = {
            stakeProjectId: 'd51282e9-dacf-434d-b069-5c972e9d672d',
            policyId: '20863f181a21b131b01cab3d12242e598a408ba99440181635414a63',
            assetName: '000de1404d756c67616b6f6e677a31',
        };

        const createInput: CreateStakeTransactionInput = {
            paymentAddress: 'addr_test1qpg8uwvs82jxknfkfdfv9dea2vhxe4zgagnxfms3nl5gqq2gst2av4c4typr5vszq7lwsehathdlmnyw99v75met0e0qlkrk2p',
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
            paymentAddress: 'addr_test1qpg8uwvs82jxknfkfdfv9dea2vhxe4zgagnxfms3nl5gqq2gst2av4c4typr5vszq7lwsehathdlmnyw99v75met0e0qlkrk2p',
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
            stakeProjectId: 'd51282e9-dacf-434d-b069-5c972e9d672d',
            policyId: '80fe5596d16d7c9e5255e46670e59d8644baf94d2a55ec9b382c4639',
            assetName: '000de1404e4654202331383239',
        };

        const unstakeComponent2: UnstakeComponent = {
            stakeProjectId: 'd51282e9-dacf-434d-b069-5c972e9d672d',
            policyId: '612cc2c8dccb72811bb01f2a4d56e4d1aa1e7f0fca10874c18883c1f',
            assetName: '546573744e46547331',
        };

        const unstakeComponent3: UnstakeComponent = {
            stakeProjectId: 'd51282e9-dacf-434d-b069-5c972e9d672d',
            policyId: '20863f181a21b131b01cab3d12242e598a408ba99440181635414a63',
            assetName: '000de1404d756c67616b6f6e677a31',
        };

        const createInput: CreateStakeTransactionInput = {
            paymentAddress: 'addr_test1qpg8uwvs82jxknfkfdfv9dea2vhxe4zgagnxfms3nl5gqq2gst2av4c4typr5vszq7lwsehathdlmnyw99v75met0e0qlkrk2p',
            stakeComponents: [],
            unstakeComponents: [unstakeComponent1, unstakeComponent2, unstakeComponent3],
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
            paymentAddress: 'addr_test1qpg8uwvs82jxknfkfdfv9dea2vhxe4zgagnxfms3nl5gqq2gst2av4c4typr5vszq7lwsehathdlmnyw99v75met0e0qlkrk2p',
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
            stakeProjectId: 'd51282e9-dacf-434d-b069-5c972e9d672d',
            policyId: '80fe5596d16d7c9e5255e46670e59d8644baf94d2a55ec9b382c4639',
            assetName: '000de1404e4654202331383239',
        };

        const claimComponent2: ClaimComponent = {
            stakeProjectId: 'd51282e9-dacf-434d-b069-5c972e9d672d',
            policyId: '612cc2c8dccb72811bb01f2a4d56e4d1aa1e7f0fca10874c18883c1f',
            assetName: '546573744e46547331',
        };

        const claimComponent3: ClaimComponent = {
            stakeProjectId: 'd51282e9-dacf-434d-b069-5c972e9d672d',
            policyId: '20863f181a21b131b01cab3d12242e598a408ba99440181635414a63',
            assetName: '000de1404d756c67616b6f6e677a31',
        };

        const createInput: CreateStakeTransactionInput = {
            paymentAddress: 'addr_test1qpg8uwvs82jxknfkfdfv9dea2vhxe4zgagnxfms3nl5gqq2gst2av4c4typr5vszq7lwsehathdlmnyw99v75met0e0qlkrk2p',
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
            paymentAddress: 'addr_test1qpg8uwvs82jxknfkfdfv9dea2vhxe4zgagnxfms3nl5gqq2gst2av4c4typr5vszq7lwsehathdlmnyw99v75met0e0qlkrk2p',
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
        const stakeProjectId = 'd51282e9-dacf-434d-b069-5c972e9d672d';

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

//This API call works the same as the one above, but it also returns the pending stake Utxos, aka the Utxos that are currently being staked
const getPotentialRewardsWithPendingFunction = async (event: any, stakeProject: any) => {
    event.preventDefault();
    try {
        const stakeProjectId = 'd51282e9-dacf-434d-b069-5c972e9d672d';

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

        const getPotentialRewardsInput: GetPotentialRewardsWithPendingInput = {
            stakeProjectId: stakeProjectId,
            nftStakeRewardWithPendingInputs: [stakeNft1, stakeNft2, stakeNft3],
        };

        const result = await queryPotentialRewardsWithPending(getPotentialRewardsInput);
        return result;
    } catch (error: any) {
        console.log(error);
    }
};

const getRemainingTokensFunction = async (event: any, stakeProject: any) => {
    event.preventDefault();
    try {
        const stakeProjectId = 'd51282e9-dacf-434d-b069-5c972e9d672d';

        const result = await queryRemainingTokens(stakeProjectId);
        return result;
    } catch (error: any) {
        console.log(error);
    }
};

const getStakedNftCountsFunction = async (event: any, stakeProject: any) => {
    event.preventDefault();
    try {
        const stakeProjectId = 'd51282e9-dacf-434d-b069-5c972e9d672d';
        const result = await queryStakedNftCounts(stakeProjectId);
        return result;
    } catch (error: any) {
        console.log(error);
    }
};

const getStakedNFTMainPairsFunction = async (event: any, stakeProject: any) => {
    event.preventDefault();
    try {
        const stakeProjectId = 'd51282e9-dacf-434d-b069-5c972e9d672d';

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
        const stakeProjectId = 'd51282e9-dacf-434d-b069-5c972e9d672d';

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
        const stakeProjectId = 'd51282e9-dacf-434d-b069-5c972e9d672d';

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

//This API call works the same as the one above, but it also returns the pending stake Utxos, aka the Utxos that are currently being staked
const getNFTDailyRewardsWithPendingFunction = async (event: any, stakeProject: any) => {
    event.preventDefault();
    try {
        const stakeProjectId = 'd51282e9-dacf-434d-b069-5c972e9d672d';

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

        const getPotentialRewardsInput: GetDailyRewardsWithPendingInput = {
            stakeProjectId: stakeProjectId,
            nftDailyStakeRewardWithPendingInputs: [stakeNft1, stakeNft2, stakeNft3],
        };

        const result = await queryDailyRewardsWithPending(getPotentialRewardsInput);
        return result;
    } catch (error: any) {
        console.log(error);
    }
};
//---------------------------------------------------------------------------//
