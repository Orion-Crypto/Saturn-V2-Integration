'use client';

import { Wallets, connect, disconnect } from '@/components/Elements/Buttons/WalletButton/walletUtils';
import { Spinner } from '@/components/Elements/Spinner';
import { useGetConnectedWallet, useIsConnected } from '@/hooks/Cardano/wallet.hooks';
import { BASE_NFT_KEY } from '@/hooks/Models/nft.hook';
import { queryClient } from '@/hooks/default';
import { truncateAddress } from '@/utils/Cardano/address';
import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';

export const WalletButton = () => {
    const { data: isConnected, isLoading: isConnectedLoading, isFetching: isConnectedFetching }: any = useIsConnected();
    const { data: connectedWallet }: any = useGetConnectedWallet();
    const image = Wallets?.[connectedWallet?.walletType]?.image;

    const [showWallets, setShowWallets] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    let walletText = truncateAddress(connectedWallet?.address);

    const onMouseEnterIcon = () => setShowWallets(true);
    const onMouseLeaveIcon = () => setShowWallets(false);
    const onMouseEnterConnect = () => setShowWallets(true);
    const onMouseLeaveConnect = () => setShowWallets(false);

    return (
        <>
            {isConnected ? (
                <ConnectedWallet
                    image={image}
                    onMouseEnterIcon={onMouseEnterIcon}
                    onMouseLeaveIcon={onMouseLeaveIcon}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    isConnectedLoading={isConnectedLoading}
                    isConnectedFetching={isConnectedFetching}
                    walletText={walletText}
                    showWallets={showWallets}
                    setShowWallets={setShowWallets}
                />
            ) : (
                <UnconnectedWallet
                    onMouseEnterConnect={onMouseEnterConnect}
                    onMouseLeaveConnect={onMouseLeaveConnect}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    isConnectedLoading={isConnectedLoading}
                    showWallets={showWallets}
                    setShowWallets={setShowWallets}
                />
            )}
        </>
    );
};

const ConnectedWallet = ({
    image,
    onMouseEnterIcon,
    onMouseLeaveIcon,
    isLoading,
    setIsLoading,
    isConnectedLoading,
    isConnectedFetching,
    walletText,
    showWallets,
    setShowWallets,
}: any) => {
    return (
        <>
            <div className="relative" onMouseLeave={onMouseLeaveIcon}>
                <div
                    className={clsx(
                        'flex h-12 w-40 justify-start rounded-lg border border-lightspace-300 bg-space-600 font-bold text-white',
                        'lg:h-14 lg:w-52'
                    )}
                >
                    <div
                        onMouseEnter={onMouseEnterIcon}
                        className={clsx(
                            'flex w-24 justify-center gap-1.5 rounded-l-lg border-r border-lightspace-300 p-2',
                            'hover:bg-space-400',
                            'active:bg-space-200'
                        )}
                    >
                        <div className="flex items-center justify-center">
                            <Image
                                src={image ? image : '/images/wallets/Nami.png'}
                                alt="Selected Crypto Wallet Logo"
                                width={64}
                                height={64}
                                priority={true}
                            />
                        </div>
                        <div className="flex items-center justify-center">
                            <Image
                                src={'/images/icons/arrow-down-lightspace-50.png'}
                                alt={'Wallet Button Down Arrow'}
                                className={'flex items-center'}
                                width={16}
                                height={16}
                                priority
                            />
                        </div>
                    </div>
                    <div
                        className={clsx(
                            'flex w-full select-none items-center justify-center rounded-r-lg text-center text-sm',
                            'hover:bg-space-400',
                            'active:bg-space-200',
                            'md:text-sm',
                            'lg:text-lg'
                        )}
                    >
                        {isLoading || isConnectedLoading || isConnectedFetching ? <Spinner /> : walletText}
                    </div>
                </div>
                {showWallets && <WalletLineDropdown setIsLoading={setIsLoading} setShowWallets={setShowWallets} />}
            </div>
        </>
    );
};

const UnconnectedWallet = ({
    onMouseEnterConnect,
    onMouseLeaveConnect,
    isLoading,
    setIsLoading,
    isConnectedLoading,
    showWallets,
    setShowWallets,
}: any) => {
    return (
        <>
            <div className="relative" onMouseEnter={onMouseEnterConnect} onMouseLeave={onMouseLeaveConnect}>
                <div
                    className={clsx(
                        'flex h-12 w-40 cursor-pointer items-center justify-center rounded-lg bg-yellow-300 py-3 text-sm font-extrabold text-space-800',
                        'lg:h-14 lg:w-52 lg:text-xl'
                    )}
                >
                    {isLoading || isConnectedLoading ? <Spinner color="black" /> : 'Connect Wallet'}
                </div>
                {showWallets && <WalletLineDropdown setIsLoading={setIsLoading} setShowWallets={setShowWallets} />}
            </div>
        </>
    );
};

const WalletLineDropdown = ({ setIsLoading, setShowWallets }: any) => {
    const { refetch } = useIsConnected();
    const multiRefetch = () => {
        refetch();
        queryClient.invalidateQueries({ queryKey: [BASE_NFT_KEY] }); // This is for reloading the wormhole page on connect
    };

    const walletKeys = Object.keys(Wallets);
    return (
        <div className="absolute right-0">
            <div className="mt-2"></div>
            <div className="rounded-lg border border-lightspace-300">
                {walletKeys?.map((walletKey: any, i: any) => {
                    const wallet: any = Wallets[walletKey];
                    const firstWallet = i === 0;
                    return (
                        <div
                            key={i}
                            onClick={async () => {
                                await connect(wallet.walletType, setIsLoading, multiRefetch);
                                setShowWallets(false);
                            }}
                            className={clsx(
                                'flex w-72 cursor-pointer justify-start border-b border-lightspace-300 bg-space-600 font-bold text-white ',
                                'hover:bg-space-400',
                                'active:bg-space-200',
                                firstWallet ? 'rounded-t-lg' : ''
                            )}
                        >
                            <div className={clsx('flex h-full w-16 justify-center rounded-l-lg border-r border-lightspace-300 py-2')}>
                                <Image src={wallet.image} alt={wallet.name} width={40} height={40} priority={true} />
                            </div>
                            <div
                                className={clsx(
                                    'flex w-56 items-center justify-start rounded-r-lg px-4 text-xl',
                                    'hover:bg-space-400',
                                    'active:bg-space-200'
                                )}
                            >
                                {wallet.name}
                            </div>
                        </div>
                    );
                })}
                <div
                    onClick={async () => {
                        await disconnect(setIsLoading, multiRefetch);
                        setShowWallets(false);
                    }}
                    className={clsx(
                        'flex w-72 cursor-pointer justify-start rounded-b-lg border-lightspace-300 bg-space-600 font-bold text-white ',
                        'hover:bg-space-400',
                        'active:bg-space-200'
                    )}
                >
                    <div
                        className={clsx(
                            'flex h-12 w-72 items-center justify-center rounded-r-lg px-4 text-xl',
                            'hover:bg-space-400',
                            'active:bg-space-200'
                        )}
                    >
                        {'Disconnect'}
                    </div>
                </div>
            </div>
        </div>
    );
};
