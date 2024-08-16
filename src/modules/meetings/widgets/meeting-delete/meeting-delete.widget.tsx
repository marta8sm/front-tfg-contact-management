import React from 'react'
import styles from './meeting-delete.module.css'
import { useRouter } from 'next/navigation'
import { meetingApi, MeetingId, useMeeting } from '@/meetings/api/meeting'

export type MeetingDeleteWidgetProps = {
    meetingId: MeetingId
    clientId: number
    cancel: () => void
}

export function MeetingDeleteWidget(props: MeetingDeleteWidgetProps) {
    //Hook to redirect
    const router = useRouter()

    const { data, isError, isLoading } = useMeeting({
        resourceId: props.meetingId,
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

        const success = await meetingApi.delete({
            resourceId: props.meetingId,
            clientId: props.clientId,
        })

        if (success) {
            void router.back()
        }
    }

    return (
        <div data-testid="meeting-delete-widget" className={styles.container}>
            <div className={styles.delete_div}>
                <h3 className={styles.question}>
                    Delete meeting with ID {data.meetingID} on{' '}
                    {data.meetingDate}?
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
