import React from 'react'
import styles from './client-detail.module.css'
import { ClientId, useClient } from '@/clients/api/client'
import { LoadingButton } from '@/common/components/loading-button'
import { useRouter } from 'next/navigation'

export type ClientDetailWidgetProps = {
    clientId: ClientId
}

export function ClientDetailWidget(props: ClientDetailWidgetProps) {
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

    return (
        <div data-testid="client-detail-widget" className={styles.container}>
            <div className={styles.container}>
                <div className={styles.card}>
                    <div className={styles.name}>
                        <h2>{data.clientName}</h2>
                    </div>
                    <div className={styles.attributes}>
                        <h4>
                            <b>ID:</b> {data.clientID}
                        </h4>
                        <h4>
                            <b>Name:</b> {data.clientName}
                        </h4>
                        <h4>
                            <b>Address:</b> {data.clientAddress}
                        </h4>
                        <h4>
                            <b>Phone:</b> {data.clientPhone}
                        </h4>
                        <h4>
                            <b>Email:</b> {data.clientEmail}
                        </h4>
                    </div>
                </div>
            </div>
            <div className={styles.buttons}>
                <button
                    onClick={() =>
                        router.push(`/clients/${data.clientID}/update-client`)
                    }
                    type="submit"
                    className={styles.update_button}
                >
                    Update
                </button>
                <button
                    onClick={() => router.push('/contacts')}
                    type="submit"
                    className={styles.delete_button}
                >
                    Delete
                </button>
            </div>
        </div>
    )
}
