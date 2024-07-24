import React from 'react'
import styles from './client-list.module.css'
import { ClientRow } from '@/clients/components/client-row'
import {
    TableRoot,
    TableHeader,
    TableBody,
    TableHead,
} from '@/common/components/ui/table'
import { useClients } from '@/clients/api/client'
import { useRouter } from 'next/navigation'
import { LoadingButton } from '@/common/components/loading-button'

export type ClientListWidgetProps = {}

export function ClientListWidget(props: ClientListWidgetProps) {
    //Hook para redirigir
    const router = useRouter()

    const { data, isError, isLoading } = useClients({ size: 10 })

    if (isLoading)
        return (
            <div id="loading_div">
                <LoadingButton />
            </div>
        )
    if (isError) return <div id="error_div">Error</div>

    return (
        <div data-testid="client-list-widget" className={styles.container}>
            <div className={styles.title}>
                <h1>CLIENTS</h1>
            </div>
            <div>
                <TableRoot className={styles.table}>
                    <TableHeader className={styles.table_header}>
                        <tr className={styles.table_header}>
                            <TableHead></TableHead>
                            <TableHead>ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Address</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Email</TableHead>
                        </tr>
                    </TableHeader>
                    <TableBody>
                        {data.map((client) => (
                            <ClientRow
                                key={client.clientID}
                                {...client}
                                onClick={() =>
                                    router.push(`/clients/${client.clientID}`)
                                }
                            />
                        ))}
                    </TableBody>
                </TableRoot>
            </div>
        </div>
    )
}
