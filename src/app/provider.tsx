'use client';

import { AreKeysEqual, localStoragePersistor, queryClient } from '@/hooks/default';
import { DehydrateOptions, QueryKey } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';

// Persist Options
const persistQueries: QueryKey[] = [];
const dehydrateOptions: DehydrateOptions = {
    shouldDehydrateQuery: ({ queryKey }) => {
        for (const key of persistQueries) {
            if (AreKeysEqual(queryKey, key)) return true;
        }
        return false;
    },
};
const persistOptions = {
    persister: localStoragePersistor,
    hydrateOptions: {},
    dehydrateOptions: dehydrateOptions,
};

export default function Provider({ children }: any) {
    return (
        <PersistQueryClientProvider client={queryClient} persistOptions={persistOptions}>
            {children}
            <ReactQueryDevtools initialIsOpen={true} />
        </PersistQueryClientProvider>
    );
}
