import React from 'react'
import styles from './meetings-of-client.module.css'
import { MeetingListOfClientWidget } from '@/meetings/widgets/meeting-list-of-client'
import { ClientId } from '@/clients/api/client'

type MeetingsOfClientViewProps = {
    // query parameters
    searchParams: { [key: string]: string | string[] | undefined }
    // url parameters
    params: { clientId: ClientId }
}

export function MeetingsOfClientView(props: MeetingsOfClientViewProps) {
    return (
        <div data-testid="meetings-of-client-view" className={styles.container}>
            <MeetingListOfClientWidget clientId={props.params.clientId} />
        </div>
    )
}
