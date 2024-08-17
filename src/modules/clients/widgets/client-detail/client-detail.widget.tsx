import React, { useState } from 'react'
import styles from './client-detail.module.css'
import { ClientId, useClient } from '@/clients/api/client'
import { useRouter } from 'next/navigation'
import { ClientDeleteWidget } from '../client-delete'
import { useSession } from 'next-auth/react'

export type ClientDetailWidgetProps = {
    clientId: ClientId
}

export function ClientDetailWidget(props: ClientDetailWidgetProps) {
    //Hook to redirect
    const router = useRouter()

    //Role control
    const { data: session } = useSession()
    const isAdmin = session?.user?.roleId === 1

    const { data, isError, isLoading } = useClient({
        resourceId: props.clientId,
    })

    const [showDeleteWidget, setShowDeleteWidget] = useState(false)

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

    return (
        <div data-testid="client-detail-widget" className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>CLIENT INFORMATION</h1>
            </div>
            <div className={styles.card_container}>
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
                        router.push(`/clients/${data.clientID}/meetings`)
                    }
                    type="submit"
                    className={styles.contacts_button}
                >
                    See meetings
                </button>
                <button
                    onClick={() =>
                        router.push(`/clients/${data.clientID}/contacts`)
                    }
                    type="submit"
                    className={styles.contacts_button}
                >
                    See contacts
                </button>
                <button
                    onClick={() =>
                        router.push(
                            `/clients/${data.clientID}/meetings/post-new-meeting`
                        )
                    }
                    type="submit"
                    className={styles.create_button}
                >
                    Create meeting
                </button>
                {isAdmin && (
                    <>
                        <button
                            onClick={() =>
                                router.push(
                                    `/clients/${data.clientID}/contacts/post-new-contact`
                                )
                            }
                            type="submit"
                            className={styles.create_button}
                        >
                            Create contact
                        </button>
                        <button
                            onClick={() =>
                                router.push(
                                    `/clients/${data.clientID}/update-client`
                                )
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
                    </>
                )}
            </div>
            {showDeleteWidget && (
                <div className={styles.overlay}>
                    <ClientDeleteWidget
                        clientId={props.clientId}
                        cancel={() => setShowDeleteWidget(false)}
                    />
                </div>
            )}
        </div>
    )
}
