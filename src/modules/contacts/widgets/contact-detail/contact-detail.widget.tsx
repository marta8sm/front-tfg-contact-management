import React from 'react'
import styles from './contact-detail.module.css'
import { useContact } from '@/contacts/api/contact'

export type ContactDetailWidgetProps = {
    /*id: contactID
    dni: conactDNI
    name: contactName
    lastname1: contactLastname1
    lastname2: contactLastname2
    phone: contactPhone
    email: contactEmail*/
}

export function ContactDetailWidget(props: ContactDetailWidgetProps) {
    /*const { data, isError, isLoading } = useContact({
        resourceId: props.id,
    })

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error</div>*/

    return (
        <div data-testid="contact-detail-widget" className={styles.container}>
            {props.id}
        </div>
    )
}
