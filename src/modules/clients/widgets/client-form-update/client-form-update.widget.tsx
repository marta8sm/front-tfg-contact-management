import React from 'react'
import styles from './client-form-update.module.css'
import { clientApi, ClientId, useClient } from '@/clients/api/client'
import { useRouter } from 'next/navigation'
import { LoadingButton } from '@/common/components/loading-button'

export type ClientFormWidgetProps = {
    clientId: ClientId
}

export function ClientFormUpdateWidget(props: ClientFormWidgetProps) {
    //Hook to redirect
    const router = useRouter()

    const { data, isError, isLoading } = useClient({
        resourceId: props.clientId,
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

    const submit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const clientName = (
            event.currentTarget.elements.namedItem(
                'clientName'
            ) as HTMLInputElement
        ).value
        const clientAddress = (
            event.currentTarget.elements.namedItem(
                'clientAddress'
            ) as HTMLInputElement
        ).value
        const clientPhone = (
            event.currentTarget.elements.namedItem(
                'clientPhone'
            ) as HTMLInputElement
        ).value
        const clientEmail = (
            event.currentTarget.elements.namedItem(
                'clientEmail'
            ) as HTMLInputElement
        ).value

        const success = await clientApi.update({
            updatedResource: {
                clientName: clientName,
                clientAddress: clientAddress,
                clientPhone: clientPhone,
                clientEmail: clientEmail,
            },
            resourceId: props.clientId,
        })

        if (success) {
            void router.push(`/clients/${props.clientId}`)
        }
    }

    const cancel = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()

        void router.push(`/clients/${props.clientId}`)
    }

    return (
        <div data-testid="client-form-widget" className={styles.container}>
            <div className={styles.table_header}>
                <h1 className={styles.title}>UPDATE CLIENT</h1>
            </div>
            <div className={styles.form_container}>
                <form onSubmit={submit} className={styles.form}>
                    <div>
                        <label id="clientName" className={styles.form_label}>
                            Name *
                        </label>
                        <input
                            type="text"
                            id="clientName"
                            name="clientName"
                            defaultValue={data.clientName}
                            className={`${styles.field} capitalize`}
                            required
                        />
                    </div>
                    <div>
                        <label id="clientAddress" className={styles.form_label}>
                            Address
                        </label>
                        <input
                            type="text"
                            id="clientAddress"
                            name="clientAddress"
                            defaultValue={data.clientAddress}
                            className={`${styles.field} capitalize`}
                        ></input>
                    </div>
                    <div>
                        <label id="clientPhone" className={styles.form_label}>
                            Phone *
                        </label>
                        <input
                            type="tel"
                            id="clientPhone"
                            name="clientPhone"
                            defaultValue={data.clientPhone}
                            className={styles.field}
                            required
                        ></input>
                    </div>
                    <div>
                        <label id="clientEmail" className={styles.form_label}>
                            Email *
                        </label>
                        <input
                            type="email"
                            id="clientEmail"
                            name="clientEmail"
                            defaultValue={data.clientEmail}
                            className={styles.field}
                            required
                        ></input>
                    </div>
                    <div className={styles.buttons}>
                        <button type="submit" className={styles.submit_button}>
                            Submit
                        </button>
                        <button
                            type="submit"
                            onClick={cancel}
                            className={styles.cancel_button}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
