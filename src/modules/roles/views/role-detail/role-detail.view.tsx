import React from 'react'
import styles from './role-detail.module.css'
import { RoleId } from '@/employees/api/employee'
import { RoleDetailWidget } from '@/roles/widgets/role-detail'

type RoleDetailViewProps = {
    // query parameters
    searchParams: { [key: string]: string | string[] | undefined }
    // url parameters
    params: { roleId: RoleId }
}

export function RoleDetailView(props: RoleDetailViewProps) {
    return (
        <div data-testid="role-detail-view" className={styles.container}>
            <RoleDetailWidget roleId={props.params.roleId} />
        </div>
    )
}
