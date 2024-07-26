import React from 'react'
import styles from './contact.module.css'
import { ContactListWidget } from '@/contacts/widgets/contact-list'
import { ClientId } from '@/clients/api/client'

type ContactViewProps = {
    // query parameters
    searchParams: { [key: string]: string | string[] | undefined }
    // url parameters
    params: { clientId?: ClientId }
}

export function ContactView(props: ContactViewProps) {
    return (
        <div data-testid="contact-view" className={styles.container}>
            <ContactListWidget clientId={props.params.clientId} />
        </div>
    )
}
