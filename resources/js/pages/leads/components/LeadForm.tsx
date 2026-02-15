import { Form } from '@inertiajs/react';
import { toast } from 'sonner';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { update } from '@/routes/leads';
import type { Lead } from '@/types/lead';

interface LeadFormProps {
    lead?: Lead;
    onClose: () => void;
}

export default function LeadForm({ lead, onClose }: LeadFormProps) {
    return (
        <Form
            {...(lead ? update.form(lead.id) : {})}
            className="space-y-4"
            onSuccess={() => {
                toast.success('Lead Updated', {
                    description:
                        'The lead information has been updated successfully.',
                });
                onClose();
            }}
        >
            {({ processing, errors }) => (
                <>
                    <Input
                        name="name"
                        defaultValue={lead?.name}
                        placeholder="Name"
                    />
                    <InputError message={errors.name} />

                    <Input
                        name="phone"
                        defaultValue={lead?.phone}
                        placeholder="Phone"
                    />
                    <InputError message={errors.phone} />

                    <Input
                        name="email"
                        defaultValue={lead?.email}
                        placeholder="Email"
                    />
                    <InputError message={errors.email} />

                    <Input
                        name="institution"
                        defaultValue={lead?.institution}
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
