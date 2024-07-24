import React from 'react'
import styles from './client-form-update.module.css'
import { ClientFormUpdateWidget } from '@/clients/widgets/client-form-update'
import { ClientId } from '@/clients/api/client'

type ClientFormViewProps = {
    // query parameters
    searchParams: { [key: string]: string | string[] | undefined }
    // url parameters
    params: { clientId: ClientId }
}

export function ClientFormView(props: ClientFormViewProps) {
    return (
        <div data-testid="client-form-view" className={styles.container}>
            <ClientFormUpdateWidget clientId={props.params.clientId} />
        </div>
    )
}
