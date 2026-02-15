import type { PageProps } from '@inertiajs/core';
import type { Lead } from '@/types/lead';
import type { Paginated } from '../pagination';

export interface LeadsPageProps extends PageProps {
    leads: Paginated<Lead>;
    filters: {
        search?: string;
    };
}
