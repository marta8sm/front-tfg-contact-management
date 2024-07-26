import React, { useState } from 'react'
import styles from './contact-detail.module.css'
import { ContactId, useContact } from '@/contacts/api/contact'
import { LoadingButton } from '@/common/components/loading-button'
import { useRouter } from 'next/navigation'
import { ContactDeleteWidget } from '../contact-delete'

export type ContactDetailWidgetProps = {
    contactId: ContactId
    clientId: number
}

export function ContactDetailWidget(props: ContactDetailWidgetProps) {
    //Hook para redirigir
    const router = useRouter()

    const { data, isError, isLoading } = useContact({
        resourceId: props.contactId,
        clientId: props.clientId,
    })

    const [showDeleteWidget, setShowDeleteWidget] = useState(false)

    if (isLoading)
        return (
            <div id="loading_div">
                <LoadingButton />
            </div>
        )
    if (isError) return <div id="error_div">Error</div>

    return (
        <div data-testid="contact-detail-widget" className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>CONTACT INFORMATION</h1>
            </div>
            <div className={styles.container}>
                <div className={styles.card}>
                    <div className={styles.name}>
                        <h2>{data.contactName}</h2>
                        <h2>
                            {data.contactLastName1} {data.contactLastName2}
                        </h2>
                    </div>
                    <div className={styles.attributes}>
                        <h4>
                            <b>ID:</b> {data.contactID}
                        </h4>
                        <h4>
                            <b>DNI:</b> {data.contactDNI}
                        </h4>
                        <h4>
                            <b>Name:</b> {data.contactName}
                        </h4>
                        <h4>
                            <b>First lastname:</b> {data.contactLastName1}
                        </h4>
                        <h4>
                            <b>Second lastname:</b> {data.contactLastName2}
                        </h4>
                        <h4>
                            <b>Phone:</b> {data.contactPhone}
                        </h4>
                        <h4>
                            <b>Email:</b> {data.contactEmail}
                        </h4>
                        <h4>
                            <b>Client ID:</b> {data.clientID}
                        </h4>
                    </div>
                </div>
            </div>
            <div className={styles.buttons}>
                <button
                    onClick={() =>
                        //cambiar cuando se haga
                        router.push(`/clients/${data.clientID}/update-contact`)
                    }
                    type="submit"
                    className={styles.update_button}
                >
                    Update
                </button>
                <button
                    onClick={() => setShowDeleteWidget(true)}
                    type="submit"
                    className={styles.delete_button}
                >
                    Delete
                </button>
            </div>
            {showDeleteWidget && (
                <div className={styles.overlay}>
                    <ContactDeleteWidget
                        contactId={props.contactId}
                        clientId={props.clientId}
                        cancel={() => setShowDeleteWidget(false)}
                    />
                </div>
            )}
        </div>
    )
}
