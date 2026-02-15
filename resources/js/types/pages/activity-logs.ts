import type { PageProps } from '@inertiajs/core';
import type { ActivityLog } from '../activity-log';
import type { Paginated } from '../pagination';

export interface ActivityLogsPageProps extends PageProps {
    activityLogs: Paginated<ActivityLog>;
    filters: {
        search?: string;
    };
}
