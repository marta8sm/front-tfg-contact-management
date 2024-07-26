import React from 'react'
import styles from './contact-detail.module.css'
import { ContactDetailWidget } from '@/contacts/widgets/contact-detail'
import { ContactId } from '@/contacts/api/contact'

type ContactDetailViewProps = {
    // query parameters
    //searchParams: { [key: string]: string | string[] | undefined }
    // url parameters
    params: { contactId: ContactId }
}

export function ContactDetailView(props: ContactDetailViewProps) {
    return (
        <div data-testid="contact-detail-view" className={styles.container}>
            <ContactDetailWidget contactId={props.params.contactId} />
        </div>
    )
}
