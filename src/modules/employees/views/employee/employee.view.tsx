import React from 'react'
import styles from './employee.module.css'
import { EmployeeListWidget } from '@/employees/widgets/employee-list'

type EmployeeViewProps = {
    // query parameters
    searchParams: { [key: string]: string | string[] | undefined }
    // url parameters
    params: { [key: string]: string | undefined }
}

export function EmployeeView(props: EmployeeViewProps) {
    return (
        <div data-testid="employee-view" className={styles.container}>
            <EmployeeListWidget />
        </div>
    )
}
