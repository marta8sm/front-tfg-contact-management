import React from 'react'
import styles from './client-delete.module.css'
import { useRouter } from 'next/navigation'
import { useClient, clientApi, ClientId } from '@/clients/api/client'
import { LoadingButton } from '@/common/components/loading-button'

export type ClientDeleteWidgetProps = {
    clientId: ClientId
    cancel: () => void
}

export function ClientDeleteWidget(props: ClientDeleteWidgetProps) {
    //Hook para redirigir
    const router = useRouter()

    const { data, isError, isLoading } = useClient({
        resourceId: props.clientId,
    })

    if (isLoading)
        return (
            <div id="loading_div">
                <LoadingButton />
            </div>
        )
    if (isError) return <div id="error_div">Error</div>

    const submit = async (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.preventDefault()

        const success = await clientApi.delete({
            resourceId: props.clientId,
        })

        if (success) {
            void router.push(`/clients`)
        }
    }

    return (
        <div data-testid="client-delete-widget" className={styles.container}>
            <div className={styles.delete_div}>
                <h3 className={styles.question}>
                    Delete client {data.clientName}?
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
