import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import type { Lead } from '@/types/lead';
import LeadForm from './LeadForm';

interface UpdateLeadDialogProps {
    lead: Lead | null;
    onClose: () => void;
}

export default function UpdateLeadDialog({
    lead,
    onClose,
}: UpdateLeadDialogProps) {
    return (
        <Dialog open={!!lead} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Lead</DialogTitle>
                </DialogHeader>
                {lead && <LeadForm lead={lead} onClose={onClose} />}
            </DialogContent>
        </Dialog>
    );
}
