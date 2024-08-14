import React from 'react'
import styles from './employee-row.module.css'
import { TableRow, TableCell } from '@/common/components/ui/table'
import { AvatarFallback, AvatarRoot } from '@/common/components/ui/avatar'

export type EmployeeRowProps = {
    employeeID: number
    employeeDNI: number
    employeeName: string
    employeeLastName1: string
    employeeLastName2?: string
    employeePhone: string
    employeeEmail: string
    roleID?: number
    onClick: () => void //To click on every row of the table
}

export function EmployeeRow(props: EmployeeRowProps) {
    const {
        employeeID,
        employeeDNI,
        employeeName,
        employeeLastName1,
        employeeLastName2,
        employeePhone,
        employeeEmail,
        roleID,
    } = props

    return (
        <TableRow
            data-testid="employee-row"
            onClick={props.onClick}
            className={styles.row}
        >
            <TableCell className="p-2">
                <AvatarRoot className={styles.avatar}>
                    <AvatarFallback className={styles.fallback}>
                        {employeeName[0]}
                        {employeeLastName1[0]}
                    </AvatarFallback>
                </AvatarRoot>
            </TableCell>
            <TableCell>{employeeID}</TableCell>
            <TableCell>{employeeDNI}</TableCell>
            <TableCell>{employeeName}</TableCell>
            <TableCell>{employeeLastName1}</TableCell>
            <TableCell>{employeeLastName2 || ''}</TableCell>
            <TableCell>{employeePhone}</TableCell>
            <TableCell>{employeeEmail}</TableCell>
            <TableCell>{roleID || ''}</TableCell>
        </TableRow>
    )
}
