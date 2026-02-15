import { Form, Head, usePage, Link } from '@inertiajs/react';
import { toast } from 'sonner';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { dashboard, login } from '@/routes';
import { store } from '@/routes/leads';

export default function Landing() {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Daftar Mitra" />

            <div className="min-h-screen lg:grid lg:grid-cols-2">
                <div className="relative hidden lg:block">
                    <img
                        src="/assets/images/mengaji.jpg"
                        alt="Hero Image"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                </div>

                <div className="flex min-h-screen flex-col bg-[#FDFDFC] p-6 lg:min-h-0 dark:bg-[#0a0a0a]">
                    <div className="flex justify-end">
                        {auth?.user ? (
                            <Link
                                href={dashboard()}
                                className="rounded-md border px-5 py-1.5 text-sm transition hover:bg-gray-100 dark:hover:bg-neutral-800"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <Link
                                href={login()}
                                className="rounded-md border px-5 py-1.5 text-sm transition hover:bg-gray-100 dark:hover:bg-neutral-800"
                            >
                                Portal Admin
                            </Link>
                        )}
                    </div>
                    <div className="flex flex-1 items-center justify-center py-12">
                        <div className="w-full max-w-md space-y-6">
                            <div className="space-y-2 text-center">
                                <h1 className="text-2xl font-semibold">
                                    Daftar Sebagai Mitra
                                </h1>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Isi data berikut untuk menjadi calon mitra.
                                </p>
                            </div>
                            <Form
                                {...store.form()}
                                className="flex flex-col gap-6"
                                onSuccess={() => {
                                    toast.success('Registered', {
                                        description:
                                            'Your registration has been submitted successfully.',
                                    });
                                }}
                            >
                                {({ processing, errors }) => (
                                    <>
                                        <div className="grid gap-6">
                                            <div className="grid gap-2">
                                                <Label htmlFor="name">
                                                    Nama Lengkap
                                                </Label>
                                                <Input
                                                    id="name"
                                                    name="name"
                                                    required
                                                    autoFocus
                                                    placeholder="Masukkan nama lengkap"
                                                />
                                                <InputError
                                                    message={errors.name}
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="phone">
                                                    Nomor WhatsApp
                                                </Label>
                                                <Input
                                                    id="phone"
                                                    name="phone"
                                                    type="tel"
                                                    required
                                                    placeholder="Contoh: 08123456789"
                                                />
                                                <InputError
                                                    message={errors.phone}
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="email">
                                                    Email
                                                </Label>
                                                <Input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    required
                                                    placeholder="email@contoh.com"
                                                />
                                                <InputError
                                                    message={errors.email}
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="institution">
                                                    Nama Lembaga
                                                </Label>
                                                <Input
                                                    id="institution"
                                                    name="institution"
                                                    required
                                                    placeholder="Contoh: Wafa Indonesia"
                                                />
                                                <InputError
                                                    message={errors.institution}
                                                />
                                            </div>

                                            <Button
                                                type="submit"
                                                className="mt-4 w-full"
                                                disabled={processing}
                                            >
                                                {processing && <Spinner />}
                                                Daftar
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
