import { WalletButton } from '@/components/Elements/Buttons/WalletButtons/WalletButton';

export const Navbar = () => {
    return (
        <>
            <div className="h-20"></div>
            <div className="drop-shadow-black-sharp fixed top-0 flex h-20 w-full items-center bg-space-900 px-4 text-white">
                <div>Hello</div>
                <div>Hello</div>
                <div>Hello</div>
                <div>Hello</div>
                <div className="grow"></div>
                <div>
                    <WalletButton />
                </div>
            </div>
        </>
    );
};
