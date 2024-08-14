import React from 'react'
import styles from './employee-form-create.module.css'
import { EmployeeFormCreateWidget } from '@/employees/widgets/employee-form-create'

type EmployeeFormCreateViewProps = {
    // query parameters
    searchParams: { [key: string]: string | string[] | undefined }
    // url parameters
    params: { [key: string]: string | undefined }
}

export function EmployeeFormCreateView(props: EmployeeFormCreateViewProps) {
    return (
        <div
            data-testid="employee-form-create-view"
            className={styles.container}
        >
            <EmployeeFormCreateWidget />
        </div>
    )
}
