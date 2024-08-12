import React from 'react'
import styles from './contact-delete.module.css'
import { useRouter } from 'next/navigation'
import { useContact, contactApi, ContactId } from '@/contacts/api/contact'
import { LoadingButton } from '@/common/components/loading-button'

export type ContactDeleteWidgetProps = {
    contactId: ContactId
    clientId: number
    cancel: () => void
}

export function ContactDeleteWidget(props: ContactDeleteWidgetProps) {
    //Hook para redirigir
    const router = useRouter()

    const { data, isError, isLoading } = useContact({
        resourceId: props.contactId,
        clientId: props.clientId,
    })

    if (isLoading) return <div id="loading_div">Loading...</div>
    if (isError) return <div id="error_div">Error</div>

    const submit = async (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.preventDefault()

        const success = await contactApi.delete({
            resourceId: props.contactId,
            clientId: props.clientId,
        })

        if (success) {
            void router.back()
        }
    }

    return (
        <div data-testid="contact-delete-widget" className={styles.container}>
            <div className={styles.delete_div}>
                <h3 className={styles.question}>
                    Delete contact {data.contactName} {data.contactLastName1}?
                </h3>
            </div>
            <div className={styles.delete_buttons}>
                <button onClick={submit} type="button" className={styles.yes}>
                    Yes
                </button>
                <button
                    onClick={props.cancel}
                    type="button"
                    className={styles.no}
                >
                    No
                </button>
            </div>
        </div>
    )
}
