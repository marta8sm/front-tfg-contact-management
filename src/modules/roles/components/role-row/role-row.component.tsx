import React from 'react'
import styles from './role-row.module.css'
import { TableCell, TableRow } from '@/common/components/ui/table'
import { AvatarFallback, AvatarRoot } from '@/common/components/ui/avatar'

export type RoleRowProps = {
    roleID: number
    roleName: string
    roleDescription?: string
    onClick: () => void //To click on every row of the table
}

export function RoleRow(props: RoleRowProps) {
    const { roleID, roleName, roleDescription } = props

    const truncatedDescription = roleDescription
        ? roleDescription.length > 150
            ? `${roleDescription.substring(0, 150)}...`
            : roleDescription
        : ''

    return (
        <TableRow
            data-testid="role-row"
            onClick={props.onClick}
            className={styles.row}
        >
            <TableCell className="p-2">
                <AvatarRoot className={styles.avatar}>
                    <AvatarFallback className={styles.fallback}>
                        {roleName[0]}
                    </AvatarFallback>
                </AvatarRoot>
            </TableCell>
            <TableCell>{roleID}</TableCell>
            <TableCell>{roleName}</TableCell>
            <TableCell id="description_cell">
                {truncatedDescription || ''}
            </TableCell>
        </TableRow>
    )
}
