import React from 'react'
import styles from './contact-list-of-client.module.css'
import { ContactRow } from '@/contacts/components/contact-row'
import {
    TableRoot,
    TableHeader,
    TableBody,
    TableHead,
} from '@/common/components/ui/table'
import { useContactsOfClient } from '@/contacts/api/contact'
import { useRouter } from 'next/navigation'
import { LoadingButton } from '@/common/components/loading-button'
import { ClientId } from '@/clients/api/client'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

export type ContactListOfClientWidgetProps = {
    clientId: ClientId
}
/*const mock_data: ContactRowProps[] = [
    {
        id: 1,
        dni: 78946,
        name: 'Marta',
        lastname1: 'Sanchez',
        lastname2: 'Marcos',
        phone: '+34 600112233',
        email: 'marta@uxcale.com',
    },
    {
        id: 2,
        dni: 7894,
        name: 'Mario',
        lastname1: 'Sanchez',
        phone: '+34 60011223',
        email: 'mario@uxcale.com',
    },
    {
        id: 3,
        dni: 7846,
        name: 'Noe',
        lastname1: 'Garcia',
        lastname2: 'Marcos',
        phone: '+34 60012233',
        email: 'noe@uxcale.com',
    },
    {
        id: 4,
        dni: 746,
        name: 'Sergio',
        lastname1: 'Arroyo',
        lastname2: 'Rodriguez',
        phone: '+34 60011233',
        email: 'sergio@uxcale.com',
    },
]*/

export function ContactListOfClientWidget(
    props: ContactListOfClientWidgetProps
) {
    //Hook para redirigir
    const router = useRouter()

    //Control de role
    const { data: session } = useSession()
    const isAdmin = session?.user?.roleId === 1

    const { clientId } = props

    const { data, isError, isLoading } = useContactsOfClient({
        size: 10,
        clientId,
    })

    if (isLoading) return <div id="loading_div">Loading...</div>
    if (isError) return <div id="error_div">Error</div>

    return (
        <div data-testid="contact-list-widget" className={styles.container}>
            <div className={styles.title}>
                <h1>CONTACTS OF CLIENT {clientId}</h1>
            </div>
            <div className={styles.buttons}>
                <button
                    onClick={() => router.back()}
                    type="button"
                    className={styles.goback_button}
                >
                    &lt;&lt; GO BACK
                </button>
                {isAdmin && (
                    <>
                        <button
                            onClick={() =>
                                router.push(
                                    `/clients/${clientId}/contacts/post-new-contact`
                                )
                            }
                            type="submit"
                            className={styles.create_button}
                        >
                            Create contact
                        </button>
                    </>
                )}
            </div>
            <div>
                <TableRoot className={styles.table}>
                    <TableHeader className={styles.table_header}>
                        <tr className={styles.table_header}>
                            <TableHead></TableHead>
                            <TableHead>ID</TableHead>
                            <TableHead>DNI</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>First lastname</TableHead>
                            <TableHead>Second lastname</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Client ID</TableHead>
                        </tr>
                    </TableHeader>
                    <TableBody>
                        {data.map((contact) => (
                            <ContactRow
                                key={contact.contactID}
                                {...contact}
                                onClick={() =>
                                    router.push(
                                        `/clients/${contact.clientID}/contacts/${contact.contactID}`
                                    )
                                }
                            />
                        ))}
                    </TableBody>
                </TableRoot>
            </div>
        </div>
    )
}
