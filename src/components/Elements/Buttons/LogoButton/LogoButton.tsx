import Image from 'next/image';
import Link from 'next/link';

export const LogoButton = () => {
    return (
        <>
            <Link href="/">
                <div className="flex w-48 items-center justify-center gap-4 text-3xl font-bold">
                    <div>
                        <Image src="/images/Logo.png" width={64} height={64} alt="Saturn Logo" />
                    </div>
                    <div>Saturn</div>
                </div>
            </Link>
        </>
    );
};
