import { mutateAddNFT, mutateUpdateNFT } from '@/api/GraphQL/NFT/mutation';
import { mutateAddNFTProject } from '@/api/GraphQL/NFTProject/mutation';
import { AddNFTInput } from '@/types/Models/NFT/GraphQL/AddNFT/AddNFTInput';
import { UpdateNFTInput } from '@/types/Models/NFT/GraphQL/UpdateNFT/UpdateNFTInput';
import { NFTMintTransaction } from '@/utils/Transaction/NFTMintBurnUpdateTransaction/Mint/NFTMintTransaction';
import clsx from 'clsx';
import { Update } from 'lucid-cardano/types/src/core/libs/cardano_multiplatform_lib/cardano_multiplatform_lib.generated';

const NFTProjectPage = () => {
    return (
        <>
            <div className="flex h-120 w-full flex-col items-center justify-center gap-12">
                <div className="flex flex-col gap-2">
                    <label className="text-xl font-bold text-white">API Key</label>
                    <input id="api-key" name="api-key" className="w-120 rounded-xl border-0 bg-lightspace-300 p-4 text-white ring-0" />
                </div>
                <div>
                    <div
                        className={clsx(
                            'flex cursor-pointer rounded-xl px-24 py-6 text-3xl font-bold text-white drop-shadow-black-sharp transition-all duration-100',
                            'bg-blue-600 hover:bg-blue-500 active:bg-blue-400'
                        )}
                    >
                        Mint NFT
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
