import { router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

type Column<T> = {
    label: string;
    key: keyof T | string;
    render?: (row: T) => React.ReactNode;
};

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type DataTableProps<T> = {
    data: T[];
    columns: Column<T>[];
    meta?: {
        from: number;
        [key: string]: unknown;
    };
    links?: PaginationLink[];
};

export default function DataTable<T extends { id: string | number }>({
    data,
    columns,
    meta,
    links,
}: DataTableProps<T>) {
    return (
        <div className="space-y-4">
            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader className="bg-muted/50">
                        <TableRow>
                            <TableHead className="w-14 px-4 py-3 text-sm">
                                No.
                            </TableHead>

                            {columns.map((col) => (
                                <TableHead
                                    key={col.key.toString()}
                                    className="px-4 py-3 text-sm"
                                >
                                    {col.label}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {data.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length + 1}
                                    className="h-24 px-4 py-3 text-center text-sm text-muted-foreground"
                                >
                                    No results found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((row, index) => (
                                <TableRow
                                    key={row.id}
                                    className="transition-colors hover:bg-muted/40"
                                >
                                    <TableCell className="px-4 py-3 align-middle text-sm font-medium">
                                        {(meta?.from ?? 1) + index}
                                    </TableCell>

                                    {columns.map((col) => (
                                        <TableCell
                                            key={col.key.toString()}
                                            className="px-4 py-3 align-middle text-sm"
                                        >
                                            {col.render
                                                ? col.render(row)
                                                : (row[
                                                      col.key as keyof T
                                                  ] as React.ReactNode)}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {links && links.length > 3 && (
                <div className="flex items-center justify-end space-x-2">
                    {links.map((link, i) => (
                        <Button
                            key={i}
                            variant={link.active ? 'default' : 'outline'}
                            size="sm"
                            disabled={!link.url || link.active}
                            onClick={() =>
                                link.url &&
                                router.visit(link.url, { preserveScroll: true })
                            }
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
