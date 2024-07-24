import React from 'react'
import styles from './contact-row.module.css'
import { TableRow, TableCell } from '@/common/components/ui/table'
import { AvatarFallback, AvatarRoot } from '@/common/components/ui/avatar'

export type ContactRowProps = {
    contactID: number
    contactDNI: number
    contactName: string
    contactLastName1: string
    contactLastName2?: string
    contactPhone?: string
    contactEmail: string
    clientID: number
}

export function ContactRow(props: ContactRowProps) {
    const {
        contactID,
        contactDNI,
        contactName,
        contactLastName1,
        contactLastName2,
        contactPhone,
        contactEmail,
        clientID,
    } = props

    return (
        <TableRow data-testid="contact-row" className={styles.container}>
            <TableCell className="p-2">
                <AvatarRoot className="w-10 h-10">
                    <AvatarFallback className={styles.fallback}>
                        {contactName[0]}
                        {contactLastName1[0]}
                    </AvatarFallback>
                </AvatarRoot>
            </TableCell>
            <TableCell>{contactID}</TableCell>
            <TableCell>{contactDNI}</TableCell>
            <TableCell>{contactName}</TableCell>
            <TableCell>{contactLastName1}</TableCell>
            <TableCell>{contactLastName2 || ''}</TableCell>
            <TableCell>{contactPhone || ''}</TableCell>
            <TableCell>{contactEmail}</TableCell>
            <TableCell>{clientID}</TableCell>
        </TableRow>
    )
}
