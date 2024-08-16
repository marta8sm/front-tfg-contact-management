import React from 'react'
import styles from './contact.module.css'
import { ContactListWidget } from '@/contacts/widgets/contact-list'

type ContactViewProps = {
    // query parameters
    searchParams: { [key: string]: string | string[] | undefined }
    // url parameters
    params: { [key: string]: string | undefined }
}

export function ContactView(props: ContactViewProps) {
    return (
        <div data-testid="contact-view" className={styles.container}>
            <ContactListWidget />
        </div>
    )
}
