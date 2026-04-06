import { Form, Head, usePage, Link } from '@inertiajs/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
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
            <Head title="Pendaftaran Mitra  " />

            <div className="flex min-h-screen bg-white dark:bg-[#080808]">
                {/* --- Sisi Kiri: Brand Identity --- */}
                <div className="relative hidden w-[42%] flex-col justify-between overflow-hidden bg-[#121212] p-12 lg:flex">
                    {/* Visual Overlay */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src="/assets/images/mengaji.jpg"
                            alt="Background"
                            className="h-full w-full object-cover opacity-30 grayscale-50"
                        />
                        {/* Purple Gradient Overlay */}
                        <div className="absolute inset-0 bg-linear-to-br from-black via-transparent to-black/80" />
                    </div>

                    <div className="relative z-10">
                        {/* <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-white shadow-lg shadow-violet-500/20">
                                <span className="text-xl font-bold text-white italic">
                                    W
                                </span>
                            </div>
                            <span className="text-xl font-bold tracking-tighter text-white">
                                WAFA INDONESIA
                            </span>
                        </div> */}
                        <img
                            src="/assets/images/wafa-logo.png"
                            alt=""
                            width={100}
                            height={100}
                        />
                    </div>

                    <div className="relative z-10 max-w-sm space-y-6">
                        <h1 className="text-5xl leading-tight font-extrabold tracking-tight text-white">
                            Cetak Generasi{' '}
                            <span className="text-[#742045]">Qurani</span>{' '}
                            Sekarang.
                        </h1>
                        <p className="text-lg leading-relaxed text-gray-300">
                            Bergabunglah dengan ribuan lembaga yang telah
                            menggunakan standarisasi kurikulum Wafa.
                        </p>

                        <div className="space-y-4 pt-6">
                            {[
                                'Kurikulum Berstandar ISO',
                                'Sertifikasi Pengajar Internasional',
                                'Ekosistem Digital Terintegrasi',
                            ].map((text) => (
                                <div
                                    key={text}
                                    className="group flex items-center gap-3"
                                >
                                    <div className="flex h-6 w-6 items-center justify-center rounded-full border border-violet-500/30 bg-[#742045] transition-colors group-hover:bg-[#5a1836]">
                                        <CheckCircle2 className="h-4 w-4 text-white" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-200">
                                        {text}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative z-10 flex items-center gap-6 text-xs font-medium tracking-widest text-gray-500 uppercase">
                        <span>EST. 2012</span>
                        <span className="h-px w-8 bg-gray-800" />
                        <span>Mitra Strategis</span>
                    </div>
                </div>

                {/* --- Sisi Kanan: Form Pendaftaran --- */}
                <div className="flex flex-1 flex-col">
                    <nav className="flex items-center justify-between p-8 lg:justify-end">
                        <div className="font-black tracking-tighter lg:hidden dark:text-white">
                            WAFA.
                        </div>
                        <Link
                            href={auth?.user ? dashboard() : login()}
                            className="group flex items-center gap-2 text-[13px] font-semibold text-gray-400 transition-colors hover:text-[#742045] dark:hover:text-[#742045]"
                        >
                            {auth?.user ? 'DASHBOARD' : 'PORTAL ADMIN'}
                            <div className="rounded-full bg-gray-100 p-1 transition-colors group-hover:bg-violet-100 dark:bg-neutral-900 dark:group-hover:bg-violet-900/30">
                                <ArrowRight className="h-3 w-3" />
                            </div>
                        </Link>
                    </nav>

                    <div className="flex flex-1 items-center justify-center px-6 pb-20">
                        <div className="w-full max-w-95">
                            <div className="mb-10 space-y-3">
                                <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    Registrasi Mitra
                                </h2>
                                <p className="text-[15px] leading-relaxed text-gray-500 dark:text-gray-400">
                                    Daftarkan lembaga Anda untuk mendapatkan
                                    konsultasi gratis dengan tim kurikulum kami.
                                </p>
                            </div>

                            <Form
                                {...store.form()}
                                className="space-y-6"
                                onSuccess={() => {
                                    toast.success('Berhasil Terkirim', {
                                        description:
                                            'Mohon tunggu kabar dari kami melalui WhatsApp.',
                                    });
                                }}
                            >
                                {({ processing, errors }) => (
                                    <>
                                        <div className="space-y-4">
                                            <div className="space-y-1.5">
                                                <Label
                                                    htmlFor="name"
                                                    className="ml-1 text-[12px] font-bold tracking-wider text-gray-500 uppercase dark:text-gray-400"
                                                >
                                                    Nama Penanggung Jawab
                                                </Label>
                                                <Input
                                                    id="name"
                                                    name="name"
                                                    className="h-12 border-gray-200 bg-gray-50/30 px-4 ring-offset-0 transition-all focus:border-violet-500 focus:ring-4 focus:ring-violet-500/5 dark:border-neutral-800 dark:bg-neutral-900/50"
                                                    placeholder="Nama lengkap"
                                                    required
                                                />
                                                <InputError
                                                    message={errors.name}
                                                />
                                            </div>

                                            <div className="space-y-1.5">
                                                <Label
                                                    htmlFor="phone"
                                                    className="ml-1 text-[12px] font-bold tracking-wider text-gray-500 uppercase dark:text-gray-400"
                                                >
                                                    WhatsApp
                                                </Label>
                                                <Input
                                                    id="phone"
                                                    name="phone"
                                                    type="tel"
                                                    className="h-12 border-gray-200 bg-gray-50/30 px-4 ring-offset-0 transition-all focus:border-violet-500 focus:ring-4 focus:ring-violet-500/5 dark:border-neutral-800 dark:bg-neutral-900/50"
                                                    placeholder="08xxxxxxxxxx"
                                                    required
                                                />
                                                <InputError
                                                    message={errors.phone}
                                                />
                                            </div>

                                            <div className="space-y-1.5">
                                                <Label
                                                    htmlFor="email"
                                                    className="ml-1 text-[12px] font-bold tracking-wider text-gray-500 uppercase dark:text-gray-400"
                                                >
                                                    Email Instansi
                                                </Label>
                                                <Input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    className="h-12 border-gray-200 bg-gray-50/30 px-4 ring-offset-0 transition-all focus:border-violet-500 focus:ring-4 focus:ring-violet-500/5 dark:border-neutral-800 dark:bg-neutral-900/50"
                                                    placeholder="example@wafa.id"
                                                    required
                                                />
                                                <InputError
                                                    message={errors.email}
                                                />
                                            </div>

                                            <div className="space-y-1.5">
                                                <Label
                                                    htmlFor="institution"
                                                    className="ml-1 text-[12px] font-bold tracking-wider text-gray-500 uppercase dark:text-gray-400"
                                                >
                                                    Nama Lembaga
                                                </Label>
                                                <Input
                                                    id="institution"
                                                    name="institution"
                                                    className="h-12 border-gray-200 bg-gray-50/30 px-4 ring-offset-0 transition-all focus:border-violet-500 focus:ring-4 focus:ring-violet-500/5 dark:border-neutral-800 dark:bg-neutral-900/50"
                                                    placeholder="Contoh: SDIT Wafa Utama"
                                                    required
                                                />
                                                <InputError
                                                    message={errors.institution}
                                                />
                                            </div>
                                        </div>

                                        <Button
                                            type="submit"
                                            className="w-full bg-[#742045] text-sm tracking-wide text-white transition-all hover:bg-[#5a1836]"
                                            disabled={processing}
                                        >
                                            {processing ? (
                                                <Spinner className="mr-2 h-4 w-4 border-white/30 border-t-white" />
                                            ) : null}
                                            Mulai Bergabung
                                        </Button>
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
