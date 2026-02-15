import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';

interface Props {
    meta: {
        current_page: number;
        last_page: number;
        links: { url: string | null; label: string; active: boolean }[];
        from: number;
        to: number;
        total: number;
    };
}

export function AppPagination({ meta }: Props) {
    if (meta.last_page <= 1) return null;

    const prevUrl = meta.links.find((l) => l.label.includes('Previous'))?.url;
    const nextUrl = meta.links.find((l) => l.label.includes('Next'))?.url;

    return (
        <div className="flex flex-col items-center justify-between gap-4 px-2 py-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
                Showing{' '}
                <span className="font-medium text-foreground">{meta.from}</span>{' '}
                to{' '}
                <span className="font-medium text-foreground">{meta.to}</span>{' '}
                of{' '}
                <span className="font-medium text-foreground">
                    {meta.total}
                </span>{' '}
                leads
            </p>

            <Pagination className="mx-0 w-auto">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href={prevUrl || '#'}
                            className={
                                !prevUrl ? 'pointer-events-none opacity-50' : ''
                            }
                        />
                    </PaginationItem>

                    {meta.links.map((link, i) => {
                        if (
                            link.label.includes('Previous') ||
                            link.label.includes('Next')
                        )
                            return null;

                        if (link.label === '...') {
                            return (
                                <PaginationItem key={i}>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            );
                        }

                        return (
                            <PaginationItem key={i}>
                                <PaginationLink
                                    href={link.url || '#'}
                                    isActive={link.active}
                                >
                                    {link.label}
                                </PaginationLink>
                            </PaginationItem>
                        );
                    })}

                    <PaginationItem>
                        <PaginationNext
                            href={nextUrl || '#'}
                            className={
                                !nextUrl ? 'pointer-events-none opacity-50' : ''
                            }
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
