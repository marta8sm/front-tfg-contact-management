import React from 'react'
import styles from './role-form-create.module.css'
import { useRouter } from 'next/navigation'
import { roleApi } from '@/roles/api/role'

export type RoleFormCreateWidgetProps = {}

export function RoleFormCreateWidget(props: RoleFormCreateWidgetProps) {
    //Hook to redirect
    const router = useRouter()

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

        const success = await roleApi.create({
            newResource: {
                roleName: roleName,
                roleDescription: roleDescription,
            },
        })

        if (success) {
            void router.push(`/roles`)
        }
    }

    const cancel = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()

        void router.back()
    }

    return (
        <div data-testid="role-form-create-widget" className={styles.container}>
            <div className={styles.table_header}>
                <h1 className={styles.title}>CREATE NEW ROLE</h1>
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
                            className={styles.field}
                            rows={4}
                        />
                    </div>
                    <div className={styles.buttons}>
                        <button type="submit" className={styles.submit_button}>
                            Submit
                        </button>
                        <button
                            type="button"
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
