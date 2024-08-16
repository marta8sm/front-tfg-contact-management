import React from 'react'
import styles from './meeting.module.css'
import { MeetingListWidget } from '@/meetings/widgets/meeting-list'

type MeetingViewProps = {
    // query parameters
    searchParams: { [key: string]: string | string[] | undefined }
    // url parameters
    params: { [key: string]: string | undefined }
}

export function MeetingView(props: MeetingViewProps) {
    return (
        <div data-testid="meeting-view" className={styles.container}>
            <MeetingListWidget />
        </div>
    )
}
