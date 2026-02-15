import { Head, usePage } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { useState, useMemo } from 'react';
import DataTable from '@/components/data-table';
import { AppPagination } from '@/components/pagination';
import { Input } from '@/components/ui/input';
import { useDebouncedSearch } from '@/hooks/use-debounced-search';
import AppLayout from '@/layouts/app-layout';
import { index } from '@/routes/leads';
import type { BreadcrumbItem } from '@/types';
import type { Lead } from '@/types/lead';
import type { LeadsPageProps } from '@/types/pages/leads';
import DeleteLeadDialog from './components/DeleteLeadDialog';
import { getLeadTable } from './components/LeadTable';
import UpdateLeadDialog from './components/UpdateLeadDialog';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Leads', href: '/leads' }];

export default function Leads() {
    const { leads, filters } = usePage<LeadsPageProps>().props;

    const [searchQuery, setSearchQuery] = useState(filters?.search ?? '');
    const [editingLead, setEditingLead] = useState<Lead | null>(null);
    const [deletingLead, setDeletingLead] = useState<Lead | null>(null);

    useDebouncedSearch({
        url: index.url(),
        search: searchQuery,
    });

    const columns = useMemo(
        () =>
            getLeadTable({
                onEdit: setEditingLead,
                onDelete: setDeletingLead,
            }),
        [],
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Leads" />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex justify-end">
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search Leads (Name/Email/Institution)..."
                            className="pl-10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
                <DataTable
                    data={leads.data}
                    columns={columns}
                    meta={leads.meta}
                    links={leads.links}
                />
                <AppPagination meta={leads.meta} />
                <UpdateLeadDialog
                    lead={editingLead}
                    onClose={() => setEditingLead(null)}
                />
                <DeleteLeadDialog
                    lead={deletingLead}
                    onClose={() => setDeletingLead(null)}
                />
            </div>
        </AppLayout>
    );
}
