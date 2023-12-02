import clsx from 'clsx';
import Link from 'next/link';

export const NavbarButton = ({ name, link, isActive }: any) => {
    return (
        <>
            <Link href={link} className="h-full">
                <div
                    className={clsx(
                        'flex h-full items-center rounded-lg px-4 text-xl font-bold',
                        isActive ? 'bg-space-400' : 'hover:bg-space-500'
                    )}
                >
                    {name}
                </div>
            </Link>
        </>
    );
};
