import React from 'react'
import styles from './role-form-create.module.css'
import { RoleFormCreateWidget } from '@/roles/widgets/role-form-create'

type RoleFormCreateViewProps = {
    // query parameters
    searchParams: { [key: string]: string | string[] | undefined }
    // url parameters
    params: { [key: string]: string | undefined }
}

export function RoleFormCreateView(props: RoleFormCreateViewProps) {
    return (
        <div data-testid="role-form-create-view" className={styles.container}>
            <RoleFormCreateWidget />
        </div>
    )
}
