import clsx from 'clsx';
import Link from 'next/link';

export const NavbarButton = ({ name, link, active }: any) => {
    return (
        <>
            <Link href={link} className="h-full">
                <div
                    className={clsx(
                        'flex h-full items-center rounded-lg px-4 text-xl font-bold',
                        active ? 'bg-space-300' : 'hover:bg-space-500'
                    )}
                >
                    {name}
                </div>
            </Link>
        </>
    );
};
