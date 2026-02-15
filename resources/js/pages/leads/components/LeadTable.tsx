import { Pencil, MoreVertical, Trash } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Lead } from '@/types/lead';

interface LeadColumnsProps {
    onEdit: (lead: Lead) => void;
    onDelete: (lead: Lead) => void;
}

export function getLeadTable({ onEdit, onDelete }: LeadColumnsProps) {
    return [
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
                        <button className="rounded p-1 hover:bg-muted">
                            <MoreVertical className="h-4 w-4" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEdit(lead)}>
                            <Pencil className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => onDelete(lead)}
                        >
                            <Trash className="mr-2 h-3.5 w-3.5 text-red-600" />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        },
    ];
}
