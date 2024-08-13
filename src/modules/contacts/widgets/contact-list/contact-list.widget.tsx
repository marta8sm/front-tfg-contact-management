import React, { useState } from 'react'
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
    //Hook to redirect
    const router = useRouter()

    const [searchParam, setSearchParam] = useState('')
    const [queryParam, setQueryParam] = useState('')

    const { data, isError, isLoading } = useContacts({
        size: 10,
        name: queryParam,
        lastname1: queryParam,
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

    const filterNameLastname = data.filter((contact) => {
        const searchWords = searchParam.toLowerCase().split(' ')

        return searchWords.every(
            (word) =>
                contact.contactName.toLowerCase().includes(word) ||
                contact.contactLastName1.toLowerCase().includes(word)
        )
    })

    return (
        <div data-testid="contact-list-widget" className={styles.container}>
            <div className={styles.title}>
                <h1>CONTACTS</h1>
            </div>

            <div className={styles.buttons}>
                <form className={styles.search_form}>
                    <input
                        type="text"
                        placeholder="Search by name or lastname"
                        value={searchParam}
                        onChange={(e) => setSearchParam(e.target.value)}
                        className={styles.search_bar}
                    />
                </form>
            </div>
            <div className={styles.table_container}>
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
                        {filterNameLastname.map((contact) => (
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
