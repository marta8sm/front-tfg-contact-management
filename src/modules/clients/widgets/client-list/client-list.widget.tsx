import React, { useState } from 'react'
import styles from './client-list.module.css'
import { ClientRow } from '@/clients/components/client-row'
import {
    TableRoot,
    TableHeader,
    TableBody,
    TableHead,
} from '@/common/components/ui/table'
import { useClients } from '@/clients/api/client'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

export type ClientListWidgetProps = {}

export function ClientListWidget(props: ClientListWidgetProps) {
    //Hook to redirect
    const router = useRouter()

    //Role control
    const { data: session } = useSession()
    const isAdmin = session?.user?.roleId === 1

    const [searchName, setSearchName] = useState('')
    const [queryName, setQueryName] = useState('')

    const { data, isError, isLoading } = useClients({
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

    const filterName = data.filter((client) =>
        client.clientName.toLowerCase().includes(searchName.toLowerCase())
    )

    return (
        <div data-testid="client-list-widget" className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>CLIENTS</h1>
            </div>
            {isAdmin && (
                <>
                    <div className={styles.buttons}>
                        <button
                            onClick={() =>
                                router.push(`/clients/post-new-client`)
                            }
                            type="submit"
                            className={styles.create_button}
                        >
                            Create new client
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
                            <TableHead>Address</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Email</TableHead>
                        </tr>
                    </TableHeader>
                    <TableBody>
                        {filterName.map((client) => (
                            <ClientRow
                                key={client.clientID}
                                {...client}
                                onClick={() =>
                                    router.push(`/clients/${client.clientID}`)
                                }
                            />
                        ))}
                    </TableBody>
                </TableRoot>
            </div>
        </div>
    )
}
