import React from 'react'
import styles from './meeting-detail.module.css'
import {
    CardContent,
    CardDescription,
    CardHeader,
    CardRoot,
    CardTitle,
} from '@/common/components/ui/card'
import { MeetingId } from '@/meetings/api/meeting'
import { Employee } from '@/employees/api/employee'

export type MeetingDetailProps = {
    meetingID: MeetingId
    meetingDescription?: string
    meetingDate: string
    meetingStartTime?: string
    meetingEndTime?: string
    clientID: number
    employees: Employee[]
}

export function MeetingDetail(props: MeetingDetailProps) {
    const {
        meetingID,
        meetingDescription,
        meetingDate,
        meetingStartTime,
        meetingEndTime,
        clientID,
        employees,
    } = props

    return (
        <CardRoot data-testid="meeting-detail" className={styles.container}>
            <CardHeader>
                <CardTitle>
                    <CardDescription>
                        <CardContent>{meetingID}</CardContent>
                        <CardContent>{meetingDescription || ''}</CardContent>
                        <CardContent>{meetingDate}</CardContent>
                        <CardContent>{meetingStartTime || ''}</CardContent>
                        <CardContent>{meetingEndTime || ''}</CardContent>
                        <CardContent>{clientID}</CardContent>
                        <CardContent>
                            <ul>
                                {employees.map((employee) => (
                                    <li key={employee.employeeID}>
                                        {`${employee.employeeName} ${employee.employeeLastName1} (${employee.employeeEmail})`}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </CardDescription>
                </CardTitle>
            </CardHeader>
        </CardRoot>
    )
}
