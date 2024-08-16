import React from 'react'
import styles from './meeting-form-update.module.css'
import { MeetingId } from '@/meetings/api/meeting'
import { MeetingFormUpdateWidget } from '@/meetings/widgets/meeting-form-update'
import { ClientId } from '@/clients/api/client'

type MeetingFormUpdateViewProps = {
    // query parameters
    searchParams: { [key: string]: string | string[] | undefined }
    // url parameters
    params: { clientId: ClientId; meetingId: MeetingId }
}

export function MeetingFormUpdateView(props: MeetingFormUpdateViewProps) {
    return (
        <div
            data-testid="meeting-form-update-view"
            className={styles.container}
        >
            <MeetingFormUpdateWidget
                meetingId={props.params.meetingId}
                clientId={props.params.clientId}
            />
        </div>
    )
}
