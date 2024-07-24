import React from 'react'
import styles from './client.module.css'
import { ClientListWidget } from '@/clients/widgets/client-list'

type ClientViewProps = {
    // query parameters
    searchParams: { [key: string]: string | string[] | undefined }
    // url parameters
    params: { [key: string]: string | undefined }
}

export function ClientView(props: ClientViewProps) {
    return (
        <div data-testid="client-view" className={styles.container}>
            <ClientListWidget />
        </div>
    )
}
