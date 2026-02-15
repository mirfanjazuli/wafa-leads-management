import { Head, usePage } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { useState } from 'react';
import DataTable from '@/components/data-table';
import { AppPagination } from '@/components/pagination';
import { Input } from '@/components/ui/input';
import { useDebouncedSearch } from '@/hooks/use-debounced-search';
import AppLayout from '@/layouts/app-layout';
import { index } from '@/routes/activity-logs';
import type { ActivityLogsPageProps } from '@/types/pages/activity-logs';
import { getActivityLogTable } from './components/ActivityLogTable';

export default function ActivityLogs() {
    const { activityLogs, filters } = usePage<ActivityLogsPageProps>().props;

    const [searchQuery, setSearchQuery] = useState(filters?.search ?? '');

    useDebouncedSearch({
        url: index.url(),
        search: searchQuery,
    });

    return (
        <AppLayout
            breadcrumbs={[{ title: 'Activity Logs', href: '/activity-logs' }]}
        >
            <Head title="Activity Logs" />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex justify-end">
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search Activity Logs (User/Action/Description)..."
                            className="pl-10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
                <DataTable
                    data={activityLogs.data}
                    columns={getActivityLogTable()}
                    meta={activityLogs.meta}
                    links={activityLogs.links}
                />
                <AppPagination meta={activityLogs.meta} />
            </div>
        </AppLayout>
    );
}
