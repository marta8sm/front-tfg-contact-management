import React from 'react'
import styles from './client-row.module.css'
import { TableRow, TableCell } from '@/common/components/ui/table'
import { AvatarFallback, AvatarRoot } from '@/common/components/ui/avatar'

export type ClientRowProps = {
    clientID: number
    clientName: string
    clientAddress?: string
    clientPhone?: string
    clientEmail: string
    onClick: () => void
}

export function ClientRow(props: ClientRowProps) {
    const { clientID, clientName, clientAddress, clientPhone, clientEmail } =
        props

    return (
        <TableRow
            data-testid="client-row"
            onClick={props.onClick}
            className={styles.row}
        >
            <TableCell className="p-2">
                <AvatarRoot className={styles.avatar}>
                    <AvatarFallback className={styles.fallback}>
                        {clientName[0]}
                    </AvatarFallback>
                </AvatarRoot>
            </TableCell>
            <TableCell>{clientID}</TableCell>
            <TableCell>{clientName}</TableCell>
            <TableCell>{clientAddress || ''}</TableCell>
            <TableCell>{clientPhone || ''}</TableCell>
            <TableCell>{clientEmail}</TableCell>
        </TableRow>
    )
}
