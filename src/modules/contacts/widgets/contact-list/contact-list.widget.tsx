import React from 'react'
import styles from './contact-list.module.css'
import { ContactRow } from '@/contacts/components/contact-row'
import {
    TableRoot,
    TableHeader,
    TableBody,
    TableHead,
} from '@/common/components/ui/table'
import { useContacts } from '@/contacts/api/contact'
import { useRouter } from 'next/navigation'
import { LoadingButton } from '@/common/components/loading-button'

export type ContactListWidgetProps = {}
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

export function ContactListWidget(props: ContactListWidgetProps) {
    //Hook para redirigir
    const router = useRouter()

    const { data, isError, isLoading } = useContacts({ size: 10 })

    if (isLoading) return <div id="loading_div">Loading...</div>
    if (isError) return <div id="error_div">Error</div>

    return (
        <div data-testid="contact-list-widget" className={styles.container}>
            <div className={styles.title}>
                <h1>CONTACTS</h1>
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
