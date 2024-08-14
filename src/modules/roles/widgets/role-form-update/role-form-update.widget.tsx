import React from 'react'
import styles from './role-form-update.module.css'
import { roleApi, RoleId, useRole } from '@/roles/api/role'
import { useRouter } from 'next/navigation'

export type RoleFormUpdateWidgetProps = {
    roleId: RoleId
}

export function RoleFormUpdateWidget(props: RoleFormUpdateWidgetProps) {
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

    const submit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const roleName = (
            event.currentTarget.elements.namedItem(
                'roleName'
            ) as HTMLInputElement
        ).value
        const roleDescription = (
            event.currentTarget.elements.namedItem(
                'roleDescription'
            ) as HTMLInputElement
        ).value

        const success = await roleApi.update({
            updatedResource: {
                roleName: roleName,
                roleDescription: roleDescription,
            },
            resourceId: props.roleId,
        })

        if (success) {
            void router.push(`/roles/${props.roleId}`)
        }
    }

    const cancel = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()

        void router.back()
    }

    return (
        <div data-testid="role-form-update-widget" className={styles.container}>
            <div className={styles.table_header}>
                <h1 className={styles.title}>UPDATE ROLE</h1>
            </div>
            <div className={styles.form_container}>
                <form onSubmit={submit} className={styles.form}>
                    <div>
                        <label id="roleName" className={styles.form_label}>
                            Name *
                        </label>
                        <input
                            type="text"
                            id="roleName"
                            name="roleName"
                            defaultValue={data.roleName}
                            className={styles.field}
                            required
                        />
                    </div>
                    <div>
                        <label
                            id="roleDescription"
                            className={styles.form_label}
                        >
                            Description (max 300 characters)
                        </label>
                        <textarea
                            id="roleDescription"
                            name="roleDescription"
                            defaultValue={data.roleDescription}
                            className={styles.field}
                            rows={4}
                        ></textarea>
                    </div>
                    <div className={styles.buttons}>
                        <button type="submit" className={styles.submit_button}>
                            Submit
                        </button>
                        <button
                            type="submit"
                            onClick={cancel}
                            className={styles.cancel_button}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
