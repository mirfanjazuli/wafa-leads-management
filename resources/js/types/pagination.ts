export interface Paginated<T> {
    index: any;
    links: PaginationLink[] | undefined;
    meta: { [key: string]: unknown; from: number; } | undefined;
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}
