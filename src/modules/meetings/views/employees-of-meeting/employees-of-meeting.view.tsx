import React from 'react'
import styles from './employees-of-meeting.module.css'
import { EmployeesOfMeetingWidget } from '@/meetings/widgets/employees-of-meeting'
import { MeetingId } from '@/meetings/api/meeting'
import { ClientId } from '@/clients/api/client'

type EmployeesOfMeetingViewProps = {
    // query parameters
    searchParams: { [key: string]: string | string[] | undefined }
    // url parameters
    params: { meetingId: MeetingId; clientId: ClientId }
}

export function EmployeesOfMeetingView(props: EmployeesOfMeetingViewProps) {
    return (
        <div
            data-testid="employees-of-meeting-view"
            className={styles.container}
        >
            <EmployeesOfMeetingWidget
                meetingID={props.params.meetingId}
                clientID={props.params.clientId}
            />
        </div>
    )
}
