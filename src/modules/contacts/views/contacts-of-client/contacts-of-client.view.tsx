import React from 'react'
import styles from './contacts-of-client.module.css'
import { ClientId } from '@/clients/api/client'
import { ContactListOfClientWidget } from '@/contacts/widgets/contact-list-of-client'

type ContactsOfClientViewProps = {
    // query parameters
    searchParams: { [key: string]: string | string[] | undefined }
    // url parameters
    params: { clientId: ClientId }
}

export function ContactsOfClientView(props: ContactsOfClientViewProps) {
    return (
        <div data-testid="contact-view" className={styles.container}>
            <ContactListOfClientWidget clientId={props.params.clientId} />
        </div>
    )
}
