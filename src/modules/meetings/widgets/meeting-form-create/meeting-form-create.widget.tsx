import React from 'react'
import styles from './meeting-form-create.module.css'
import { ClientId } from '@/clients/api/client'
import { useRouter } from 'next/navigation'
import { meetingApi } from '@/meetings/api/meeting'

export type MeetingFormCreateWidgetProps = {
    clientId: ClientId
}

export function MeetingFormCreateWidget(props: MeetingFormCreateWidgetProps) {
    //Hook to redirect
    const router = useRouter()

    const submit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

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

        const success = await meetingApi.create({
            newResource: {
                meetingDescription: meetingDescription,
                meetingDate: meetingDate,
                meetingStartTime: meetingStartTime,
                meetingEndTime: meetingEndTime,
            },
            clientId: props.clientId,
        })

        if (success) {
            void router.push(`/meetings`)
        }
    }

    const cancel = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()

        void router.back()
    }

    return (
        <div
            data-testid="meeting-form-create-widget"
            className={styles.container}
        >
            <div className={styles.table_header}>
                <h1 className={styles.title}>CREATE NEW MEETING</h1>
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
