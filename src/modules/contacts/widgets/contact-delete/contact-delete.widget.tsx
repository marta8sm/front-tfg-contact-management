import React from 'react'
import styles from './contact-delete.module.css'
import { useRouter } from 'next/navigation'
import { useContact, contactApi, ContactId } from '@/contacts/api/contact'

export type ContactDeleteWidgetProps = {
    contactId: ContactId
    clientId: number
    cancel: () => void
}

export function ContactDeleteWidget(props: ContactDeleteWidgetProps) {
    //Hook to redirect
    const router = useRouter()

    const { data, isError, isLoading } = useContact({
        resourceId: props.contactId,
        clientId: props.clientId,
    })

    if (isLoading)
        return (
            <div id="loading_div">
                <div id="loader">
                    <svg
                        className="animate-spin h-5 w-5 mr-3 ..."
                        viewBox="0 0 24 24"
                    ></svg>
                </div>
            </div>
        )
    if (isError)
        return (
            <div id="error_div">
                <div id="error">
                    <h3 className={styles.question}>Error</h3>
                </div>
            </div>
        )

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
