import React from 'react'
import styles from './role-detail.module.css'
import {
    CardRoot,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from '@/common/components/ui/card'

export type RoleDetailProps = {
    roleID: number
    roleName: string
    roleDescription?: string
}

export function RoleDetail(props: RoleDetailProps) {
    const { roleID, roleName, roleDescription } = props

    return (
        <CardRoot data-testid="role-detail" className={styles.container}>
            <CardHeader>
                <CardTitle>
                    <CardDescription>
                        <CardContent>{roleID}</CardContent>
                        <CardContent>{roleName}</CardContent>
                        <CardContent>{roleDescription || ''}</CardContent>
                    </CardDescription>
                </CardTitle>
            </CardHeader>
        </CardRoot>
    )
}
