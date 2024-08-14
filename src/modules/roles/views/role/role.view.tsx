import React from 'react'
import styles from './role.module.css'
import { RoleListWidget } from '@/roles/widgets/role-list'

type RoleViewProps = {
    // query parameters
    searchParams: { [key: string]: string | string[] | undefined }
    // url parameters
    params: { [key: string]: string | undefined }
}

export function RoleView(props: RoleViewProps) {
    return (
        <div data-testid="role-view" className={styles.container}>
            <RoleListWidget />
        </div>
    )
}
