import React from 'react'
import styles from './role-form-update.module.css'
import { RoleId } from '@/roles/api/role'
import { RoleFormUpdateWidget } from '@/roles/widgets/role-form-update'

type RoleFormUpdateViewProps = {
    // query parameters
    searchParams: { [key: string]: string | string[] | undefined }
    // url parameters
    params: { roleId: RoleId }
}

export function RoleFormUpdateView(props: RoleFormUpdateViewProps) {
    return (
        <div data-testid="role-form-update-view" className={styles.container}>
            <RoleFormUpdateWidget roleId={props.params.roleId} />
        </div>
    )
}
