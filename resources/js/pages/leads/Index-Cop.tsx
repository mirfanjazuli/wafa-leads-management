import { Form, Head, router, usePage } from '@inertiajs/react';
import { MoreVertical, Pencil, Search, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import DataTable from '@/components/data-table';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { index, update } from '@/routes/leads';
import type { BreadcrumbItem } from '@/types';
import type { Lead } from '@/types/lead';
import type { LeadsPageProps } from '@/types/pages/leads';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Leads', href: '/leads' }];

// Pindahkan ini ke atas file, sebelum `export default function Index()`
function EditForm({ lead, onClose }: { lead: Lead; onClose: () => void }) {
    return (
        <Form
            {...update.form(lead.id)}
            className="space-y-4"
            onSuccess={() => onClose()}
        >
            {({ processing, errors }) => (
                <>
                    <Input
                        name="name"
                        defaultValue={lead.name}
                        placeholder="Name"
                    />
                    <InputError message={errors.name} />

                    <Input
                        name="phone"
                        defaultValue={lead.phone}
                        placeholder="Phone"
                    />
                    <InputError message={errors.phone} />

                    <Input
                        name="email"
                        defaultValue={lead.email}
                        placeholder="Email"
                    />
                    <InputError message={errors.email} />

                    <Input
                        name="institution"
                        defaultValue={lead.institution}
                        placeholder="Institution"
                    />
                    <InputError message={errors.institution} />

                    <div className="flex justify-end gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>

                        <Button type="submit" disabled={processing}>
                            Save
                        </Button>
                    </div>
                </>
            )}
        </Form>
    );
}

export default function Index() {
    const { leads, filters } = usePage<LeadsPageProps>().props;

    const [search, setSearch] = useState(filters?.search ?? '');

    useEffect(() => {
        const delay = setTimeout(() => {
            router.get(
                index.url(),
                { search },
                {
                    preserveState: true,
                    replace: true,
                    preserveScroll: true,
                },
            );
        }, 500);

        return () => clearTimeout(delay);
    }, [search]);

    const [openEdit, setOpenEdit] = useState(false);
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

    const [openDelete, setOpenDelete] = useState(false);
    const [selectedLeadToDelete, setSelectedLeadToDelete] =
        useState<Lead | null>(null);

    const columns = [
        { label: 'Name', key: 'name' },
        { label: 'Phone', key: 'phone' },
        {
            label: 'Email',
            key: 'email',
            render: (lead: Lead) => (
                <a
                    href={`mailto:${lead.email}`}
                    className="hover:text-blue-600 hover:underline"
                >
                    {lead.email}
                </a>
            ),
        },
        { label: 'Institution', key: 'institution' },
        {
            label: 'Actions',
            key: 'actions',
            render: (lead: Lead) => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="rounded p-2 hover:bg-muted">
                            <MoreVertical className="h-4 w-4" />
                        </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                        {/* EDIT */}
                        <DropdownMenuItem
                            onClick={() => {
                                setSelectedLead(lead);
                                setOpenEdit(true);
                            }}
                        >
                            <Pencil className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                            Edit
                        </DropdownMenuItem>

                        {/* DELETE */}
                        <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => {
                                setSelectedLeadToDelete(lead);
                                setOpenDelete(true);
                            }}
                        >
                            <Trash className="text-danger mr-2 h-3.5 w-3.5" />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Leads" />

            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-end">
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Cari Mitra (Nama/Email/Lembaga)..."
                            className="pl-10"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <DataTable
                    data={leads.data}
                    columns={columns}
                    meta={leads.meta}
                    links={leads.links}
                />

                <Dialog open={openEdit} onOpenChange={setOpenEdit}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Lead</DialogTitle>
                        </DialogHeader>

                        {selectedLead && (
                            <EditForm
                                lead={selectedLead}
                                onClose={() => setOpenEdit(false)}
                            />
                        )}
                    </DialogContent>
                </Dialog>

                <Dialog open={openDelete} onOpenChange={setOpenDelete}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Hapus Lead</DialogTitle>
                        </DialogHeader>

                        {selectedLeadToDelete && (
                            <div className="space-y-4">
                                <p>
                                    Apakah Anda yakin ingin menghapus{' '}
                                    <strong>{selectedLeadToDelete.name}</strong>
                                    ?
                                </p>
                                <div className="flex justify-end gap-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setOpenDelete(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        onClick={() => {
                                            router.delete(
                                                `/leads/${selectedLeadToDelete.id}`,
                                                {
                                                    preserveScroll: true,
                                                    onSuccess: () =>
                                                        setOpenDelete(false),
                                                },
                                            );
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
