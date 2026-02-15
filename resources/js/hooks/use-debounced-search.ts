import { router } from '@inertiajs/react';
import { useEffect, useRef } from 'react';

type QueryValue = string | number | boolean | undefined;

interface UseDebouncedSearchProps {
    url: string;
    search: string;
    delay?: number;
    additionalParams?: Record<string, QueryValue>;
}

export function useDebouncedSearch({
    url,
    search,
    delay = 500,
    additionalParams = {},
}: UseDebouncedSearchProps) {
    const previousSearch = useRef<string | null>(null);

    useEffect(() => {
        if (previousSearch.current === null) {
            previousSearch.current = search;
            return;
        }

        if (previousSearch.current === search) return;

        const timeout = setTimeout(() => {
            const params: Record<string, QueryValue> = {
                ...additionalParams,
            };

            if (search.trim() !== '') {
                params.search = search;
            }

            router.get(url, params, {
                preserveState: true,
                replace: true,
                preserveScroll: true,
            });

            previousSearch.current = search;
        }, delay);

        return () => clearTimeout(timeout);
    }, [additionalParams, delay, search, url]);
}
