import React from 'react'
import styles from './meeting-add-employee.module.css'
import { MeetingId } from '@/meetings/api/meeting'
import { ClientId } from '@/clients/api/client'
import { MeetingAddEmployeeWidget } from '@/meetings/widgets/meeting-add-employee'

type MeetingAddEmployeeViewProps = {
    // query parameters
    searchParams: { [key: string]: string | string[] | undefined }
    // url parameters
    params: { clientId: ClientId; meetingId: MeetingId }
}

export function MeetingAddEmployeeView(props: MeetingAddEmployeeViewProps) {
    return (
        <div
            data-testid="meeting-add-employee-view"
            className={styles.container}
        >
            <MeetingAddEmployeeWidget
                meetingId={props.params.meetingId}
                clientId={props.params.clientId}
            />
        </div>
    )
}
