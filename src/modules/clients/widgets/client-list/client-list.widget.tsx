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
    //Hook para redirigir
    const router = useRouter()

    //Control de role
    const { data: session } = useSession()
    const isAdmin = session?.user?.roleId === 1

    const [searchName, setSearchName] = useState('')
    const [queryName, setQueryName] = useState('')

    const { data, isError, isLoading } = useClients({
        size: 10,
        name: queryName,
    })

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        setQueryName(searchName)
    }

    if (isLoading) return <div id="loading_div">Loading...</div>
    if (isError) return <div id="error_div">Error</div>

    /*const filterName = data.filter((client) =>
        client.clientName.toLowerCase().includes(searchName.toLowerCase())
    )*/

    return (
        <div data-testid="client-list-widget" className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>CLIENTS</h1>
            </div>
            <div className={styles.buttons}>
                {isAdmin && (
                    <>
                        <button
                            onClick={() =>
                                router.push(`/clients/post-new-client`)
                            }
                            type="submit"
                            className={styles.create_button}
                        >
                            Create new client
                        </button>
                    </>
                )}
                <form className={styles.search_form} onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Search by name"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                        className={styles.search_bar}
                    />
                </form>
            </div>
            <div>
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
                        {data.map((client) => (
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
