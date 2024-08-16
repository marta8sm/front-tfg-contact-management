import React from 'react'
import styles from './meeting-detail.module.css'
import { ClientId } from '@/clients/api/client'
import { MeetingId } from '@/meetings/api/meeting'
import { MeetingDetailWidget } from '@/meetings/widgets/meeting-detail'

type MeetingDetailViewProps = {
    // query parameters
    searchParams: { [key: string]: string | string[] | undefined }
    // url parameters
    params: { clientId: ClientId; meetingId: MeetingId }
}

export function MeetingDetailView(props: MeetingDetailViewProps) {
    return (
        <div data-testid="meeting-detail-view" className={styles.container}>
            <MeetingDetailWidget
                meetingId={props.params.meetingId}
                clientId={props.params.clientId}
            />
        </div>
    )
}
