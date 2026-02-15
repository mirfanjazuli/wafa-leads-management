import { Form } from '@inertiajs/react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { destroy } from '@/routes/leads';
import type { Lead } from '@/types/lead';

interface DeleteLeadDialogProps {
    lead: Lead | null;
    onClose: () => void;
}

export default function DeleteLeadDialog({
    lead,
    onClose,
}: DeleteLeadDialogProps) {
    return (
        <Dialog open={!!lead} onOpenChange={onClose}>
            <DialogContent>
                <Form
                    {...(lead ? destroy.form(lead.id) : {})}
                    onSuccess={() => {
                        toast.success('Lead Deleted', {
                            description:
                                'The lead has been permanently removed.',
                        });
                        onClose();
                    }}
                >
                    {({ processing }) => (
                        <>
                            <DialogHeader>
                                <DialogTitle>Delete Lead</DialogTitle>
                                <DialogDescription>
                                    Are you sure you want to delete{' '}
                                    <strong>{lead?.name}</strong>? This action
                                    cannot be undone.
                                </DialogDescription>
                            </DialogHeader>

                            <DialogFooter className="mt-4 gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={onClose}
                                    disabled={processing}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    variant="destructive"
                                    disabled={processing}
                                >
                                    {processing ? 'Deleting...' : 'Delete'}
                                </Button>
                            </DialogFooter>
                        </>
                    )}
                </Form>
            </DialogContent>
        </Dialog>
    );
}
