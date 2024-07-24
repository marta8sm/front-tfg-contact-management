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
    {
        id: 5,
        dni: 76548946,
        name: 'Toni',
        lastname1: 'Rodero',
        lastname2: 'Marcos',
        phone: '+34 600112237',
        email: 'toni@uxcale.com',
    },
    {
        id: 6,
        dni: 789446,
        name: 'Fer',
        lastname1: 'Blanco',
        phone: '+34 60112233',
        email: 'fer@uxcale.com',
    },
    {
        id: 7,
        dni: 786456446,
        name: 'Jorge',
        lastname1: 'Arias',
        phone: '+34 601123',
        email: 'jorge@uxcale.com',
    },
    {
        id: 8,
        dni: 7894422226,
        name: 'Ana',
        lastname1: 'Marcos',
        phone: '+34 60112283',
        email: 'ana@uxcale.com',
    },
    {
        id: 9,
        dni: 789445646,
        name: 'Carmen',
        lastname1: 'Fuentes',
        phone: '+34 60112733',
        email: 'carmen@uxcale.com',
    },
    {
        id: 10,
        dni: 78946546,
        name: 'Vero',
        lastname1: 'Hernandez',
        phone: '+34 60192233',
        email: 'vero@uxcale.com',
    },
]*/

export function ContactListWidget(props: ContactListWidgetProps) {
    const { data, isError, isLoading } = useContacts({ size: 10 })

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error</div>

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
                            <ContactRow key={contact.contactID} {...contact} />
                        ))}
                    </TableBody>
                </TableRoot>
            </div>
        </div>
    )
}
