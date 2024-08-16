import React from 'react'
import styles from './meeting-form-create.module.css'
import { ClientId } from '@/clients/api/client'
import { MeetingFormCreateWidget } from '@/meetings/widgets/meeting-form-create'

type MeetingFormCreateViewProps = {
    // query parameters
    searchParams: { [key: string]: string | string[] | undefined }
    // url parameters
    params: { clientId: ClientId }
}

export function MeetingFormCreateView(props: MeetingFormCreateViewProps) {
    return (
        <div
            data-testid="meeting-form-create-view"
            className={styles.container}
        >
            <MeetingFormCreateWidget clientId={props.params.clientId} />
        </div>
    )
}
