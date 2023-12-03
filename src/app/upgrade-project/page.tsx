'use client';

import { mutateAddNFT, mutateUpdateNFT } from '@/api/GraphQL/NFT/mutation';
import { mutateAddNFTProject } from '@/api/GraphQL/NFTProject/mutation';
import { setAPIKey } from '@/api/authentication';
import { APIKeyInput } from '@/components/Elements/Inputs/APIKeyInput';
import { Spinner } from '@/components/Elements/Spinner';
import { useIsConnected } from '@/hooks/Cardano/wallet.hooks';
import { AddNFTInput } from '@/types/Models/NFT/GraphQL/AddNFT/AddNFTInput';
import { UpdateNFTInput } from '@/types/Models/NFT/GraphQL/UpdateNFT/UpdateNFTInput';
import { NFTUpdateComponent } from '@/types/Transactions/NFTMintBurnUpdateTransaction/NFTMintBurnUpdateTransaction/CreateNFTMintBurnUpdateTransactionInput';
import { ReferenceScriptComponent } from '@/types/Transactions/ReferenceScriptTransaction/CreateReferenceScriptTransaction/CreateReferenceScriptV2TransactionInput';
import { NFTMintTransaction } from '@/utils/Transaction/NFTMintBurnUpdateTransaction/Mint/NFTMintTransaction';
import { NFTUpdateTransaction } from '@/utils/Transaction/NFTMintBurnUpdateTransaction/Update/NFTUpdateTransaction';
import { ReferenceScriptV2Transaction } from '@/utils/Transaction/ReferenceScriptTransaction/ReferenceScriptV2/ReferenceScriptV2Transaction';
import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';

const UpgradeProjectPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { data: isConnected } = useIsConnected();

    return (
        <>
            <div className="flex h-120 w-full flex-col items-center justify-center gap-12">
                <APIKeyInput />
                <div className="flex flex-col gap-2">
                    <Link href={'https://docs.saturnnft.io/docs/api-documentation'} target="_blank" className="text-white hover:text-blue-400">
                        <label className="flex cursor-pointer items-center justify-start gap-4 font-bold">
                            <div className="text-xl">NFT Id</div>
                            <div className="text-xs">(Obtained from Mint NFTs page)</div>
                        </label>
                    </Link>
                    <input
                        id="nft-id"
                        name="nft-id"
                        className="flex w-120 rounded-xl bg-lightspace-300 p-4 font-bold text-white focus:border-0 focus:ring-4 focus:ring-lightspace-100"
                    />
                </div>
                <div>
                    <div
                        onClick={async () => {
                            if (!isConnected) return;

                            setIsLoading(true);
                            await createMintUpgradeNFT();
                            setIsLoading(false);
                        }}
                        className={clsx(
                            'flex h-20 w-80 items-center justify-center rounded-xl text-3xl font-bold text-white drop-shadow-black-sharp transition-all duration-100',
                            isConnected ? 'cursor-pointer bg-blue-600 hover:bg-blue-500 active:bg-blue-400' : 'bg-gray-600'
                        )}
                    >
                        {isLoading ? <Spinner /> : 'Upgrade NFT'}
                    </div>
                </div>
            </div>
        </>
    );
};

export default UpgradeProjectPage;

//---------------------------------------------------------------------------//
// Full Create And Mint
//---------------------------------------------------------------------------//
const createMintUpgradeNFT = async () => {
    try {
        const apiKey = (document.getElementById(`api-key`) as HTMLInputElement)?.value;
        setAPIKey(apiKey);

        const nftId = (document.getElementById(`nft-id`) as HTMLInputElement)?.value;

        // Mint NFT
        const result = await upgradeNFT(nftId);
        return result;
    } catch (error) {
        return null;
    }
};
//---------------------------------------------------------------------------//

//---------------------------------------------------------------------------//
// Upgrade functions
//---------------------------------------------------------------------------//
const upgradeNFT = async (nftId: any) => {
    const nftUpdateComponents: NFTUpdateComponent[] = [
        {
            nftId: nftId,

            // Data
            name: 'Saturn',
            image: '',
            jsonProperties: '{ "blobber": "Saturn", "blobber2": "Saturn" }',
        },
    ];
    const result = await NFTUpdateTransaction(nftUpdateComponents);

    console.info('Upgraded NFTs with Id: ', nftId);
    return result;
};
//---------------------------------------------------------------------------//
