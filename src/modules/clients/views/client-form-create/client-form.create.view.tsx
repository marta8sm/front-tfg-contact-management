import React from 'react'
import styles from './client-form-create.module.css'
import { ClientFormWidget } from '@/clients/widgets/client-form'

type ClientFormViewProps = {
    // query parameters
    searchParams: { [key: string]: string | string[] | undefined }
    // url parameters
    params: { [key: string]: string | undefined }
}

export function ClientFormView(props: ClientFormViewProps) {
    return (
        <div data-testid="client-form-view" className={styles.container}>
            <ClientFormWidget />
        </div>
    )
}
