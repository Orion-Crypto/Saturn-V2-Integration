import Link from 'next/link';

export const APIKeyInput = () => {
    return (
        <>
            <div className="flex flex-col gap-2">
                <Link href={'https://docs.saturnnft.io/docs/api-documentation'} target="_blank" className="text-white hover:text-blue-400">
                    <label className="cursor-pointer text-xl font-bold ">API Key</label>
                </Link>
                <input
                    id="api-key"
                    name="api-key"
                    className="flex w-120 rounded-xl bg-lightspace-300 p-4 font-bold text-white focus:border-0 focus:ring-4 focus:ring-lightspace-100"
                />
            </div>
        </>
    );
};
