import React, { useState } from 'react'
import styles from './role-detail.module.css'
import { RoleId } from '@/employees/api/employee'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useRole } from '@/roles/api/role'
import { RoleDeleteWidget } from '../role-delete'

export type RoleDetailWidgetProps = {
    roleId: RoleId
}

export function RoleDetailWidget(props: RoleDetailWidgetProps) {
    //Hook to redirect
    const router = useRouter()

    //Role control
    const { data: session } = useSession()
    const isAdmin = session?.user?.roleId === 1

    const { data, isError, isLoading } = useRole({
        resourceId: props.roleId,
    })

    const [showDeleteWidget, setShowDeleteWidget] = useState(false)

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

    return (
        <div data-testid="role-detail-widget" className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>ROLE INFORMATION</h1>
            </div>
            <div className={styles.card_container}>
                <div className={styles.card}>
                    <div className={styles.name}>
                        <h2>{data.roleName}</h2>
                    </div>
                    <div className={styles.attributes}>
                        <h4>
                            <b>ID:</b> {data.roleID}
                        </h4>
                        <h4>
                            <b>Name:</b> {data.roleName}
                        </h4>
                        <h4>
                            <b>Description:</b> {data.roleDescription}
                        </h4>
                    </div>
                </div>
            </div>
            <div className={styles.buttons}>
                {isAdmin && (
                    <>
                        <button
                            onClick={() =>
                                router.push(`/roles/${data.roleID}/update-role`)
                            }
                            type="submit"
                            className={styles.update_button}
                        >
                            Update
                        </button>
                        <button
                            onClick={() => setShowDeleteWidget(true)}
                            type="submit"
                            className={styles.delete_button}
                        >
                            Delete
                        </button>
                    </>
                )}
            </div>
            {showDeleteWidget && (
                <div className={styles.overlay}>
                    <RoleDeleteWidget
                        roleId={props.roleId}
                        cancel={() => setShowDeleteWidget(false)}
                    />
                </div>
            )}
        </div>
    )
}
