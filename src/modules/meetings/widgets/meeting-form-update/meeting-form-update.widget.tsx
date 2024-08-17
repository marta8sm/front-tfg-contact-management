import React, { useState } from 'react'
import styles from './meeting-form-update.module.css'
import { meetingApi, MeetingId, useMeeting } from '@/meetings/api/meeting'
import { ClientId } from '@/clients/api/client'
import { useRouter } from 'next/navigation'

export type MeetingFormUpdateWidgetProps = {
    meetingId: MeetingId
    clientId: ClientId
}

export function MeetingFormUpdateWidget(props: MeetingFormUpdateWidgetProps) {
    //Hook to redirect
    const router = useRouter()

    const [error, setError] = useState<string | null>(null)

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

    const convertToHHMM = (time: string): string => {
        return time.slice(0, 5)
    }

    const submit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        setError(null)

        const meetingDescription = (
            event.currentTarget.elements.namedItem(
                'meetingDescription'
            ) as HTMLInputElement
        ).value
        const meetingDate = (
            event.currentTarget.elements.namedItem(
                'meetingDate'
            ) as HTMLInputElement
        ).value
        const meetingStartTime = (
            event.currentTarget.elements.namedItem(
                'meetingStartTime'
            ) as HTMLInputElement
        ).value
        const meetingEndTime = (
            event.currentTarget.elements.namedItem(
                'meetingEndTime'
            ) as HTMLInputElement
        ).value

        const today = new Date().toISOString().split('T')[0]

        if (meetingDate < today) {
            setError('The meeting date cannot be in the past.')
            return
        }

        if (meetingEndTime <= meetingStartTime) {
            setError('The meeting end time must be after the start time.')
            return
        }

        const meetingStartTimeFormatted = convertToHHMM(meetingStartTime)
        const meetingEndTimeFormatted = convertToHHMM(meetingEndTime)

        const success = await meetingApi.update({
            updatedResource: {
                meetingDescription: meetingDescription,
                meetingDate: meetingDate,
                meetingStartTime: meetingStartTimeFormatted,
                meetingEndTime: meetingEndTimeFormatted,
            },
            resourceId: props.meetingId,
            clientId: props.clientId,
        })

        if (success) {
            void router.push(
                `/clients/${props.clientId}/meetings/${props.meetingId}`
            )
        } else {
            setError(
                'There was an error creating the meeting. Please try again.'
            )
        }
    }

    const cancel = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()

        void router.push(
            `/clients/${props.clientId}/meetings/${props.meetingId}`
        )
    }

    return (
        <div
            data-testid="meeting-form-update-widget"
            className={styles.container}
        >
            <div className={styles.table_header}>
                <h1 className={styles.title}>UPDATE MEETING</h1>
            </div>
            <div className={styles.form_container}>
                <form onSubmit={submit} className={styles.form}>
                    <div>
                        <label
                            id="meetingDescription"
                            className={styles.form_label}
                        >
                            Description
                        </label>
                        <textarea
                            id="meetingDescription"
                            name="meetingDescription"
                            defaultValue={data.meetingDescription}
                            className={styles.field}
                            rows={4}
                        />
                    </div>
                    <div>
                        <label id="meetingDate" className={styles.form_label}>
                            Date * (yyyy-mm-dd)
                        </label>
                        <input
                            type="date"
                            id="meetingDate"
                            name="meetingDate"
                            defaultValue={data.meetingDate}
                            className={styles.field}
                            required
                        />
                    </div>
                    <div>
                        <label
                            id="meetingStartTime"
                            className={styles.form_label}
                        >
                            Meeting start time * (hh:mm)
                        </label>
                        <input
                            type="time"
                            id="meetingStartTime"
                            name="meetingStartTime"
                            defaultValue={convertToHHMM(
                                data.meetingStartTime || ''
                            )}
                            className={styles.field}
                            required
                        />
                    </div>
                    <div>
                        <label
                            id="meetingEndTime"
                            className={styles.form_label}
                        >
                            Meeting end time * (hh:mm)
                        </label>
                        <input
                            type="time"
                            id="meetingEndTime"
                            name="meetingEndTime"
                            defaultValue={convertToHHMM(
                                data.meetingEndTime || ''
                            )}
                            className={styles.field}
                            required
                        />
                    </div>
                    <div className={styles.buttons}>
                        <button type="submit" className={styles.submit_button}>
                            Submit
                        </button>
                        <button
                            type="button"
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
