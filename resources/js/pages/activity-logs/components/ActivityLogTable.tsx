export function getActivityLogTable() {
    return [
        { label: 'User', key: 'name' },
        { label: 'Action', key: 'action' },
        { label: 'Description', key: 'description' },
        { label: 'IP Address', key: 'ip_address' },
        {
            label: 'Date',
            key: 'created_at',
            render: (log: { created_at: string | number | Date }) =>
                new Date(log.created_at).toLocaleString(),
        },
    ];
}
