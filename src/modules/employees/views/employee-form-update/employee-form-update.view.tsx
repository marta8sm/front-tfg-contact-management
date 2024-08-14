import React from 'react'
import styles from './employee-form-update.module.css'
import { EmployeeFormUpdateWidget } from '@/employees/widgets/employee-form-update'
import { EmployeeId } from '@/employees/api/employee'

type EmployeeFormUpdateViewProps = {
    // query parameters
    searchParams: { [key: string]: string | string[] | undefined }
    // url parameters
    params: { employeeId: EmployeeId }
}

export function EmployeeFormUpdateView(props: EmployeeFormUpdateViewProps) {
    return (
        <div
            data-testid="employee-form-update-view"
            className={styles.container}
        >
            <EmployeeFormUpdateWidget employeeId={props.params.employeeId} />
        </div>
    )
}
