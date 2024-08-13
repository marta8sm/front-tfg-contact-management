import React from 'react'
import styles from './employee-detail.module.css'
import {
    CardRoot,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from '@/common/components/ui/card'

export type EmployeeDetailProps = {
    employeeID: number
    employeeDNI: number
    employeeName: string
    employeeLastName1: string
    employeeLastName2?: string
    employeePhone: string
    employeeEmail: string
    employeePassword: string
    roleID: number
}

export function EmployeeDetail(props: EmployeeDetailProps) {
    const {
        employeeID,
        employeeDNI,
        employeeName,
        employeeLastName1,
        employeeLastName2,
        employeePhone,
        employeeEmail,
        employeePassword,
        roleID,
    } = props

    return (
        <CardRoot data-testid="employee-detail" className={styles.container}>
            <CardHeader>
                <CardTitle>
                    <CardDescription>
                        <CardContent>{employeeID}</CardContent>
                        <CardContent>{employeeDNI}</CardContent>
                        <CardContent>{employeeName}</CardContent>
                        <CardContent>{employeeLastName1}</CardContent>
                        <CardContent>{employeeLastName2 || ''}</CardContent>
                        <CardContent>{employeePhone}</CardContent>
                        <CardContent>{employeeEmail}</CardContent>
                        <CardContent>{employeePassword}</CardContent>
                        <CardContent>{roleID}</CardContent>
                    </CardDescription>
                </CardTitle>
            </CardHeader>
        </CardRoot>
    )
}
