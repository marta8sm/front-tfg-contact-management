import React from 'react'
import styles from './employee-detail.module.css'
import { EmployeeId } from '@/employees/api/employee'
import { EmployeeDetailWidget } from '@/employees/widgets/employee-detail'

type EmployeeDetailViewProps = {
    // query parameters
    searchParams: { [key: string]: string | string[] | undefined }
    // url parameters
    params: { employeeId: EmployeeId }
}

export function EmployeeDetailView(props: EmployeeDetailViewProps) {
    return (
        <div data-testid="employee-detail-view" className={styles.container}>
            <EmployeeDetailWidget employeeId={props.params.employeeId} />
        </div>
    )
}
