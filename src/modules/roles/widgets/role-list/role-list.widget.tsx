import React, { useState } from 'react'
import styles from './role-list.module.css'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import {
    TableRoot,
    TableHeader,
    TableHead,
    TableBody,
} from '@/common/components/ui/table'
import { useRoles } from '@/roles/api/role'
import { RoleRow } from '@/roles/components/role-row'

export type RoleListWidgetProps = {}

export function RoleListWidget(props: RoleListWidgetProps) {
    //Hook to redirect
    const router = useRouter()

    //Role control
    const { data: session } = useSession()
    const isAdmin = session?.user?.roleId === 1

    const [searchName, setSearchName] = useState('')
    const [queryName, setQueryName] = useState('')

    const { data, isError, isLoading } = useRoles({
        size: 10,
        name: queryName,
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

    const filterName = data.filter((role) =>
        role.roleName.toLowerCase().includes(searchName.toLowerCase())
    )

    return (
        <div data-testid="role-list-widget" className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>ROLES</h1>
            </div>
            {isAdmin && (
                <>
                    <div className={styles.buttons}>
                        <button
                            onClick={() => router.push(`/roles/post-new-role`)}
                            type="submit"
                            className={styles.create_button}
                        >
                            Create new role
                        </button>
                        <form className={styles.search_form}>
                            <input
                                type="text"
                                placeholder="Search by name"
                                value={searchName}
                                onChange={(e) => setSearchName(e.target.value)}
                                className={styles.search_bar}
                            />
                        </form>
                    </div>
                </>
            )}
            {!isAdmin && (
                <>
                    <div className={styles.buttons_no_admin}>
                        <form className={styles.search_form_no_admin}>
                            <input
                                type="text"
                                placeholder="Search by name"
                                value={searchName}
                                onChange={(e) => setSearchName(e.target.value)}
                                className={styles.search_bar_no_admin}
                            />
                        </form>
                    </div>
                </>
            )}
            <div className={styles.table_container}>
                <TableRoot className={styles.table}>
                    <TableHeader className={styles.table_header}>
                        <tr className={styles.table_header}>
                            <TableHead></TableHead>
                            <TableHead>ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Description</TableHead>
                        </tr>
                    </TableHeader>
                    <TableBody>
                        {filterName.map((role) => (
                            <RoleRow
                                key={role.roleID}
                                {...role}
                                onClick={() =>
                                    router.push(`/roles/${role.roleID}`)
                                }
                            />
                        ))}
                    </TableBody>
                </TableRoot>
            </div>
        </div>
    )
}
