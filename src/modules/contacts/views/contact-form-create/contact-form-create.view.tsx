import React from 'react'
import styles from './contact-form-create.module.css'
import { ClientId } from '@/contacts/api/contact'
import { ContactFormCreateWidget } from '@/contacts/widgets/contact-form-create'

type ContactFormCreateViewProps = {
    // query parameters
    searchParams: { [key: string]: string | string[] | undefined }
    // url parameters
    params: { clientId: ClientId }
}

export function ContactFormCreateView(props: ContactFormCreateViewProps) {
    return (
        <div
            data-testid="contact-form-create-view"
            className={styles.container}
        >
            <ContactFormCreateWidget clientId={props.params.clientId} />
        </div>
    )
}
