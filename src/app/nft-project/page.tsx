'use client';

import { mutateAddNFT, mutateUpdateNFT } from '@/api/GraphQL/NFT/mutation';
import { mutateAddNFTProject } from '@/api/GraphQL/NFTProject/mutation';
import { setAPIKey } from '@/api/authentication';
import { APIKeyInput } from '@/components/Elements/Inputs/APIKeyInput';
import { Spinner } from '@/components/Elements/Spinner';
import { useIsConnected } from '@/hooks/Cardano/wallet.hooks';
import { AddNFTInput } from '@/types/Models/NFT/GraphQL/AddNFT/AddNFTInput';
import { UpdateNFTInput } from '@/types/Models/NFT/GraphQL/UpdateNFT/UpdateNFTInput';
import { ReferenceScriptComponent } from '@/types/Transactions/ReferenceScriptTransaction/CreateReferenceScriptTransaction/CreateReferenceScriptV2TransactionInput';
import { NFTMintTransaction } from '@/utils/Transaction/NFTMintBurnUpdateTransaction/Mint/NFTMintTransaction';
import { ReferenceScriptV2Transaction } from '@/utils/Transaction/ReferenceScriptTransaction/ReferenceScriptV2/ReferenceScriptV2Transaction';
import clsx from 'clsx';
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
                            'flex h-20 w-80 items-center justify-center rounded-xl text-3xl font-bold text-white drop-shadow-black-sharp transition-all duration-100',
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
    try {
        const apiKey = (document.getElementById(`api-key`) as HTMLInputElement)?.value;
        setAPIKey(apiKey);

        const nftProject = await createNFTProject();
        const nft = await createNFT(nftProject);

        // Deploy contract transaction only needs to happen once per NFT Project.
        // After the contract is deployed you can mint as many NFTs as you want without calling this deploy function again
        await deployContract(nftProject?.plutus_script);

        // Mint NFT
        const result = await mintNFT(nft);
        return result;
    } catch (error) {
        return null;
    }
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
    const nftId = addNFT?.nfts?.[0]?.id;

    const updateNFTInput: UpdateNFTInput = {
        nftId: nftId,
        assetName: 'test',
        name: 'test',
        image: '',
        jsonProperties: '{ "blob": "cute" }',
    };
    const updatedNFT = await mutateUpdateNFT(updateNFTInput);
    const nft = updatedNFT?.nft;
    return nft;
};
//---------------------------------------------------------------------------//

//---------------------------------------------------------------------------//
// Deploy Contract functions
//---------------------------------------------------------------------------//
const deployContract = async (plutusScript: any) => {
    const components: ReferenceScriptComponent[] = [
        {
            plutusScriptId: plutusScript?.id,
        },
    ];

    const result = await ReferenceScriptV2Transaction(components);
    return result;
};
//---------------------------------------------------------------------------//

//---------------------------------------------------------------------------//
// Mint functions
//---------------------------------------------------------------------------//
const mintNFT = async (nft: any) => {
    const nftIds = [nft?.id];
    const result = await NFTMintTransaction(nftIds);

    console.info('Minted NFTs with Ids: ', nftIds);
    return result;
};
//---------------------------------------------------------------------------//
