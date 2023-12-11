'use client';

import { mutateAddCustodialWallet } from '@/api/GraphQL/CustodyWallet/mutation';
import { mutateAddNFT, mutateUpdateNFT } from '@/api/GraphQL/NFT/mutation';
import { mutateAddNFTProject } from '@/api/GraphQL/NFTProject/mutation';
import { setAPIKey } from '@/api/authentication';
import { APIKeyInput } from '@/components/Elements/Inputs/APIKeyInput';
import { Spinner } from '@/components/Elements/Spinner';
import { useIsConnected } from '@/hooks/Cardano/wallet.hooks';
import { AddCustodialWalletInput } from '@/types/Models/CustodyWallet/GraphQL/AddCustodialWallet/AddCustodialWalletInput';
import clsx from 'clsx';
import { useState } from 'react';

const CustodyWalletPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { data: isConnected } = useIsConnected();

    return (
        <>
            <div className="flex h-120 w-full flex-col items-center justify-center gap-12">
                <APIKeyInput />
                <div className="flex w-full justify-center gap-6">
                    <div
                        onClick={async () => {
                            if (!isConnected) return;

                            setIsLoading(true);
                            await createCustodyWallet();
                            setIsLoading(false);
                        }}
                        className={clsx(
                            'flex h-20 w-80 items-center justify-center rounded-xl text-2xl font-bold text-white drop-shadow-black-sharp transition-all duration-100',
                            isConnected ? 'cursor-pointer bg-blue-600 hover:bg-blue-500 active:bg-blue-400' : 'bg-gray-600'
                        )}
                    >
                        {isLoading ? <Spinner /> : 'Create Custody Wallet'}
                    </div>
                </div>
            </div>
        </>
    );
};

export default CustodyWalletPage;

//---------------------------------------------------------------------------//
// Full Create And Mint
//---------------------------------------------------------------------------//
const createCustodyWallet = async () => {
    try {
        const apiKey = (document.getElementById(`api-key`) as HTMLInputElement)?.value;
        setAPIKey(apiKey);

        const input: AddCustodialWalletInput = {};
        const custodialWallet = await mutateAddCustodialWallet(input);
        console.log('address', custodialWallet?.address);
        return null;
    } catch (error) {
        return null;
    }
};
//---------------------------------------------------------------------------//
