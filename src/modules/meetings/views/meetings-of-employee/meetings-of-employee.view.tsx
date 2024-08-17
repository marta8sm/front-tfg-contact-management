import React from 'react'
import styles from './meetings-of-employee.module.css'
import { MeetingsOfEmployeeWidget } from '@/meetings/widgets/meetings-of-employee'
import { EmployeeId } from '@/employees/api/employee'

type MeetingsOfEmployeeViewProps = {
    // query parameters
    searchParams: { [key: string]: string | string[] | undefined }
    // url parameters
    params: { employeeId: EmployeeId }
}

export function MeetingsOfEmployeeView(props: MeetingsOfEmployeeViewProps) {
    return (
        <div
            data-testid="meetings-of-employee-view"
            className={styles.container}
        >
            <MeetingsOfEmployeeWidget employeeId={props.params.employeeId} />
        </div>
    )
}
