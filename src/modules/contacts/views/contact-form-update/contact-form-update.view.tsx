import React from 'react'
import styles from './contact-form-update.module.css'
import { ClientId, ContactId } from '@/contacts/api/contact'
import { ContactFormUpdateWidget } from '@/contacts/widgets/contact-form-update'

type ContactFormUpdateViewProps = {
    // query parameters
    searchParams: { [key: string]: string | string[] | undefined }
    // url parameters
    params: { clientId: ClientId; contactId: ContactId }
}

export function ContactFormUpdateView(props: ContactFormUpdateViewProps) {
    return (
        <div data-testid="contact-form-view" className={styles.container}>
            <ContactFormUpdateWidget
                contactId={props.params.contactId}
                clientId={props.params.clientId}
            />
        </div>
    )
}
