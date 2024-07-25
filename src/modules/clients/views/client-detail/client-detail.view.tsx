import React from 'react'
import styles from './client-detail.module.css'
import { ClientDetailWidget } from '@/clients/widgets/client-detail'
import { ClientId } from '@/clients/api/client'

type ClientDetailViewProps = {
    // query parameters
    //searchParams: { [key: string]: string | string[] | undefined }
    // url parameters
    params: { clientId: ClientId }
}

export function ClientDetailView(props: ClientDetailViewProps) {
    return (
        <div data-testid="client-detail-view" className={styles.container}>
            <ClientDetailWidget clientId={props.params.clientId} />
        </div>
    )
}
