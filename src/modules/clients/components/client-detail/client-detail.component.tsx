import React from 'react'
import styles from './client-detail.module.css'
import {
    CardContent,
    CardDescription,
    CardHeader,
    CardRoot,
    CardTitle,
} from '@/common/components/ui/card'

export type ClientDetailProps = {
    clientID: number
    clientName: string
    clientAddress?: string
    clientPhone?: string
    clientEmail: string
}

export function ClientDetail(props: ClientDetailProps) {
    const { clientID, clientName, clientAddress, clientPhone, clientEmail } =
        props

    return (
        <CardRoot data-testid="client-detail" className={styles.container}>
            <CardHeader>
                <CardTitle>
                    <CardDescription>
                        <CardContent>{clientID}</CardContent>
                        <CardContent>{clientName}</CardContent>
                        <CardContent>{clientAddress || ''}</CardContent>
                        <CardContent>{clientPhone || ''}</CardContent>
                        <CardContent>{clientEmail}</CardContent>
                    </CardDescription>
                </CardTitle>
            </CardHeader>
        </CardRoot>
    )
}
