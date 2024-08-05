import React from 'react'
import styles from './contact-detail.module.css'
import { ContactDetailWidget } from '@/contacts/widgets/contact-detail'
import { ClientId, ContactId } from '@/contacts/api/contact'

type ContactDetailViewProps = {
    // query parameters
    //searchParams: { [key: string]: string | string[] | undefined }
    // url parameters
    params: { clientId: ClientId; contactId: ContactId }
}

export function ContactDetailView(props: ContactDetailViewProps) {
    return (
        <div data-testid="contact-detail-view" className={styles.container}>
            <ContactDetailWidget
                contactId={props.params.contactId}
                clientId={props.params.clientId}
            />
        </div>
    )
}
