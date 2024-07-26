import React from 'react'
import styles from './contact-detail.module.css'
import {
    CardContent,
    CardDescription,
    CardHeader,
    CardRoot,
    CardTitle,
} from '@/common/components/ui/card'

export type ContactDetailProps = {
    contactID: number
    contactDNI: number
    contactName: string
    contactLastName1: string
    contactLastName2?: string
    contactPhone?: string
    contactEmail: string
    clientID: number
}

export function ContactDetail(props: ContactDetailProps) {
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
        <CardRoot data-testid="contact-detail" className={styles.container}>
            <CardHeader>
                <CardTitle>
                    <CardDescription>
                        <CardContent>{contactID}</CardContent>
                        <CardContent>{contactDNI}</CardContent>
                        <CardContent>{contactName}</CardContent>
                        <CardContent>{contactLastName1}</CardContent>
                        <CardContent>{contactLastName2 || ''}</CardContent>
                        <CardContent>{contactPhone || ''}</CardContent>
                        <CardContent>{contactEmail}</CardContent>
                        <CardContent>{clientID}</CardContent>
                    </CardDescription>
                </CardTitle>
            </CardHeader>
        </CardRoot>
    )
}
