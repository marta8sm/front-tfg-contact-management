import React from 'react'
import styles from './role-delete.module.css'
import { roleApi, RoleId, useRole } from '@/roles/api/role'
import { useRouter } from 'next/navigation'
import { employeeApi } from '@/employees/api/employee'

export type RoleDeleteWidgetProps = {
    roleId: RoleId
    cancel: () => void
}

export function RoleDeleteWidget(props: RoleDeleteWidgetProps) {
    //Hook to redirect
    const router = useRouter()

    const { data, isError, isLoading } = useRole({
        resourceId: props.roleId,
    })

    if (isLoading)
        return (
            <div id="loading_div">
                <div id="loader">
                    <svg
                        className="animate-spin h-5 w-5 mr-3 ..."
                        viewBox="0 0 24 24"
                    ></svg>
                </div>
            </div>
        )
    if (isError)
        return (
            <div id="error_div">
                <div id="error">
                    <h3 className={styles.question}>Error</h3>
                </div>
            </div>
        )

    const submit = async (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.preventDefault()

        const success = await roleApi.delete({
            resourceId: props.roleId,
        })

        if (success) {
            void router.back()
        }
    }

    return (
        <div data-testid="role-delete-widget" className={styles.container}>
            <div className={styles.delete_div}>
                <h3 className={styles.question}>
                    Delete role {data.roleName}?
                </h3>
            </div>
            <div className={styles.delete_buttons}>
                <button onClick={submit} type="button" className={styles.yes}>
                    Yes
                </button>
                <button
                    onClick={props.cancel}
                    type="button"
                    className={styles.no}
                >
                    No
                </button>
            </div>
        </div>
    )
}
