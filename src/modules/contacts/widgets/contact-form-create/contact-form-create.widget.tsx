import React from 'react'
import styles from './contact-form-create.module.css'
import { useRouter } from 'next/navigation'
import { ClientId, contactApi } from '@/contacts/api/contact'

export type ContactFormCreateWidgetProps = {
    clientId: ClientId
}

export function ContactFormCreateWidget(props: ContactFormCreateWidgetProps) {
    //Hook to redirect
    const router = useRouter()

    const submit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const contactDNIString = event.currentTarget.elements.namedItem(
            'contactDNI'
        ) as HTMLInputElement
        const contactDNI = Number(contactDNIString.value)
        const contactName = (
            event.currentTarget.elements.namedItem(
                'contactName'
            ) as HTMLInputElement
        ).value
        const contactLastName1 = (
            event.currentTarget.elements.namedItem(
                'contactLastName1'
            ) as HTMLInputElement
        ).value
        const contactLastName2 = (
            event.currentTarget.elements.namedItem(
                'contactLastName2'
            ) as HTMLInputElement
        ).value
        const contactPhone = (
            event.currentTarget.elements.namedItem(
                'contactPhone'
            ) as HTMLInputElement
        ).value
        const contactEmail = (
            event.currentTarget.elements.namedItem(
                'contactEmail'
            ) as HTMLInputElement
        ).value

        const success = await contactApi.create({
            newResource: {
                contactDNI: contactDNI,
                contactName: contactName,
                contactLastName1: contactLastName1,
                contactLastName2: contactLastName2,
                contactPhone: contactPhone,
                contactEmail: contactEmail,
            },
            clientId: props.clientId,
        })

        if (success) {
            void router.push(`/clients/${props.clientId}/contacts`)
        }
    }

    const cancel = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()

        void router.back()
    }

    return (
        <div
            data-testid="contact-form-create-widget"
            className={styles.container}
        >
            <div className={styles.table_header}>
                <h1 className={styles.title}>CREATE NEW CONTACT</h1>
            </div>
            <div className={styles.form_container}>
                <form onSubmit={submit} className={styles.form}>
                    <div>
                        <label id="contactDNI" className={styles.form_label}>
                            DNI *
                        </label>
                        <input
                            type="number"
                            id="contactDNI"
                            name="contactDNI"
                            className={styles.field}
                            required
                        />
                    </div>
                    <div>
                        <label id="contactName" className={styles.form_label}>
                            Name *
                        </label>
                        <input
                            type="text"
                            id="contactName"
                            name="contactName"
                            className={`${styles.field} capitalize`}
                            required
                        />
                    </div>
                    <div>
                        <label
                            id="contactLastName1"
                            className={styles.form_label}
                        >
                            First lastname *
                        </label>
                        <input
                            type="text"
                            id="contactLastName1"
                            name="contactLastName1"
                            className={`${styles.field} capitalize`}
                            required
                        />
                    </div>
                    <div>
                        <label
                            id="contactLastName2"
                            className={styles.form_label}
                        >
                            Second lastname
                        </label>
                        <input
                            type="text"
                            id="contactLastName2"
                            name="contactLastName2"
                            className={`${styles.field} capitalize`}
                        />
                    </div>
                    <div>
                        <label id="contactPhone" className={styles.form_label}>
                            Phone *
                        </label>
                        <input
                            type="tel"
                            id="contactPhone"
                            name="contactPhone"
                            className={styles.field}
                            required
                        ></input>
                    </div>
                    <div>
                        <label id="contactEmail" className={styles.form_label}>
                            Email *
                        </label>
                        <input
                            type="email"
                            id="contactEmail"
                            name="contactEmail"
                            className={styles.field}
                            required
                        ></input>
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
