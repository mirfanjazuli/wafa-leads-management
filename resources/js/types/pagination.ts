export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface Paginated<T> {
    index: number | unknown;
    links: PaginationLink[] | undefined;
    meta:
        | {
              from: number;
              to: number;
              path: string;
              [key: string]: unknown;
          }
        | undefined;
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}
