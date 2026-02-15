import { Head } from '@inertiajs/react';
import { Users, Activity, UserPlus, Clock } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
];

interface DashboardProps {
    stats: {
        total_leads: number;
        new_leads: number;
        total_logs: number;
    };
    recent_logs: {
        id: number;
        user: string;
        action: string;
        description: string;
        time: string;
    }[];
}

export default function Dashboard({ stats, recent_logs }: DashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex flex-1 flex-col gap-6 p-6">
                <div className="grid gap-4 md:grid-cols-3">
                    <StatCard
                        title="Total Leads"
                        value={stats.total_leads}
                        icon={<Users className="h-5 w-5 text-indigo-600" />}
                    />
                    <StatCard
                        title="Leads Hari Ini"
                        value={stats.new_leads}
                        icon={<UserPlus className="h-5 w-5 text-emerald-600" />}
                    />
                    <StatCard
                        title="Total Aktivitas"
                        value={stats.total_logs}
                        icon={<Activity className="h-5 w-5 text-amber-600" />}
                    />
                </div>

                <div className="rounded-xl border border-sidebar-border bg-card shadow-sm">
                    <div className="flex items-center justify-between border-b p-4">
                        <h3 className="leading-none font-semibold tracking-tight">
                            Aktivitas Terbaru
                        </h3>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="p-0">
                        {recent_logs.length > 0 ? (
                            <div className="divide-y divide-sidebar-border/50">
                                {recent_logs.map((log) => (
                                    <div
                                        key={log.id}
                                        className="flex items-center gap-4 p-4 transition-colors hover:bg-muted/50"
                                    >
                                        <div className="flex flex-1 flex-col">
                                            <p className="text-sm leading-none font-medium">
                                                {log.description}
                                            </p>
                                            <p className="mt-1 text-xs text-muted-foreground">
                                                {log.time} • {log.action}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-8 text-center text-sm text-muted-foreground">
                                Belum ada aktivitas tercatat.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

function StatCard({
    title,
    value,
    icon,
}: {
    title: string;
    value: number;
    icon: React.ReactNode;
}) {
    return (
        <div className="flex items-center justify-between rounded-xl border border-sidebar-border bg-card p-6 shadow-sm">
            <div>
                <p className="text-sm font-medium text-muted-foreground">
                    {title}
                </p>
                <h4 className="mt-2 text-2xl font-bold">
                    {value.toLocaleString()}
                </h4>
            </div>
            <div className="rounded-lg bg-muted p-3">{icon}</div>
        </div>
    );
}
