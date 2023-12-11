'use client';

import { LogoButton } from '@/components/Elements/Buttons/LogoButton/LogoButton';
import { NavbarButton } from '@/components/Elements/Buttons/NavbarButton/NavbarButton';
import { WalletButton } from '@/components/Elements/Buttons/WalletButton/WalletButton';
import { usePathname } from 'next/navigation';

export const Navbar = () => {
    const pathname = usePathname();
    const isNFTProjectPage = pathname === '/nft-project';
    const isUpgradeProjectPage = pathname === '/upgrade-project';
    const isCustodyWalletPage = pathname === '/custody-wallet';

    return (
        <>
            <div className="h-20"></div>
            <div className="fixed top-0 flex h-20 w-full items-center gap-16 bg-space-900 px-4 text-white drop-shadow-black-sharp">
                <div>
                    <LogoButton />
                </div>
                <div className="grow"></div>
                <NavbarButton name="Mint NFTs" link="/nft-project" isActive={isNFTProjectPage} />
                <NavbarButton name="Upgrade NFTs" link="/upgrade-project" isActive={isUpgradeProjectPage} />
                <NavbarButton name="Custody Wallets" link="/custody-wallet" isActive={isCustodyWalletPage} />
                <div className="grow"></div>
                <div>
                    <WalletButton />
                </div>
            </div>
        </>
    );
};
