import React from 'react'
import styles from './meeting-row.module.css'
import { MeetingId } from '@/meetings/api/meeting'
import { TableRow, TableCell } from '@/common/components/ui/table'
import { AvatarFallback, AvatarRoot } from '@/common/components/ui/avatar'

export type MeetingRowProps = {
    meetingID: MeetingId
    meetingDescription?: string
    meetingDate: string
    meetingStartTime?: string
    meetingEndTime?: string
    clientID: number
    //employees: Employee[]
    onClick: () => void //To click on every row of the table
}

export function MeetingRow(props: MeetingRowProps) {
    const {
        meetingID,
        meetingDescription,
        meetingDate,
        meetingStartTime,
        meetingEndTime,
        clientID,
    } = props

    const truncatedDescription = meetingDescription
        ? meetingDescription.length > 150
            ? `${meetingDescription.substring(0, 150)}...`
            : meetingDescription
        : ''

    return (
        <TableRow
            data-testid="meeting-row"
            onClick={props.onClick}
            className={styles.row}
        >
            <TableCell className="p-2">
                <AvatarRoot className={styles.avatar}>
                    <AvatarFallback className={styles.fallback}>
                        {meetingID}
                    </AvatarFallback>
                </AvatarRoot>
            </TableCell>
            <TableCell id="description_cell">
                {truncatedDescription || ''}
            </TableCell>
            <TableCell>{meetingDate}</TableCell>
            <TableCell>{meetingStartTime || ''}</TableCell>
            <TableCell>{meetingEndTime || ''}</TableCell>
            <TableCell>{clientID}</TableCell>
        </TableRow>
    )
}
