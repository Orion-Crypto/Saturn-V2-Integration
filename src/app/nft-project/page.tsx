'use client';

import { mutateAddNFT, mutateUpdateNFT } from '@/api/GraphQL/NFT/mutation';
import { mutateAddNFTProject } from '@/api/GraphQL/NFTProject/mutation';
import { setAPIKey } from '@/api/authentication';
import { APIKeyInput } from '@/components/Elements/Inputs/APIKeyInput';
import { Spinner } from '@/components/Elements/Spinner';
import { useIsConnected } from '@/hooks/Cardano/wallet.hooks';
import { AddNFTInput } from '@/types/Models/NFT/GraphQL/AddNFT/AddNFTInput';
import { UpdateNFTInput } from '@/types/Models/NFT/GraphQL/UpdateNFT/UpdateNFTInput';
import { NFTMintTransaction } from '@/utils/Transaction/NFTMintBurnUpdateTransaction/Mint/NFTMintTransaction';
import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';

const NFTProjectPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { data: isConnected } = useIsConnected();

    return (
        <>
            <div className="flex h-120 w-full flex-col items-center justify-center gap-12">
                <APIKeyInput />
                <div>
                    <div
                        onClick={async () => {
                            if (!isConnected) return;

                            setIsLoading(true);
                            await createAndMintNFT();
                            setIsLoading(false);
                        }}
                        className={clsx(
                            'flex rounded-xl px-24 py-6 text-3xl font-bold text-white drop-shadow-black-sharp transition-all duration-100',
                            isConnected ? 'cursor-pointer bg-blue-600 hover:bg-blue-500 active:bg-blue-400' : 'bg-gray-600'
                        )}
                    >
                        {isLoading ? <Spinner /> : 'Mint NFT'}
                    </div>
                </div>
            </div>
        </>
    );
};

export default NFTProjectPage;

//---------------------------------------------------------------------------//
// Full Create And Mint
//---------------------------------------------------------------------------//
const createAndMintNFT = async () => {
    const apiKey = (document.getElementById(`api-key`) as HTMLInputElement)?.value;
    setAPIKey(apiKey);

    const nftProject = await createNFTProject();
    const nft = await createNFT(nftProject);
    const result = await mintNFT(nft);

    console.log('result', result);
    return result;
};
//---------------------------------------------------------------------------//

//---------------------------------------------------------------------------//
// Create NFT Project functions
//---------------------------------------------------------------------------//
const createNFTProject = async () => {
    const nftProject = await mutateAddNFTProject();
    return nftProject;
};

const createNFT = async (nftProject: any) => {
    const addNFTInput: AddNFTInput = {
        nftProjectId: nftProject?.id,
        count: 1,
    };
    const addNFT: any = await mutateAddNFT(addNFTInput);

    const updateNFT: UpdateNFTInput = {
        nftId: addNFT?.id,
        assetName: 'test',
        name: 'test',
        image: '',
        jsonProperties: '{ "blob": "cute" }',
    };
    const updatedNFT = await mutateUpdateNFT(updateNFT);
    return updatedNFT;
};
//---------------------------------------------------------------------------//

//---------------------------------------------------------------------------//
// Mint functions
//---------------------------------------------------------------------------//
const mintNFT = async (nft: any) => {
    const nftIds = [nft?.id];
    const result = await NFTMintTransaction(nftIds);
    return result;
};
//---------------------------------------------------------------------------//
