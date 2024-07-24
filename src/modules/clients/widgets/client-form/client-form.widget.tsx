import React from 'react'
import styles from './client-form.module.css'
import { clientApi } from '@/clients/api/client'

export type ClientFormWidgetProps = {}

export function ClientFormWidget(props: ClientFormWidgetProps) {
    const submit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const clientName = (
            event.currentTarget.elements.namedItem(
                'clientName'
            ) as HTMLInputElement
        ).value
        const clientAddress = (
            event.currentTarget.elements.namedItem(
                'clientAddress'
            ) as HTMLInputElement
        ).value
        const clientPhone = (
            event.currentTarget.elements.namedItem(
                'clientPhone'
            ) as HTMLInputElement
        ).value
        const clientEmail = (
            event.currentTarget.elements.namedItem(
                'clientEmail'
            ) as HTMLInputElement
        ).value

        const success = await clientApi.create({
            newResource: {
                clientName: clientName,
                clientAddress: clientAddress,
                clientPhone: clientPhone,
                clientEmail: clientEmail,
            },
        })
    }

    return (
        <div data-testid="client-form-widget" className={styles.container}>
            <div className={styles.table_header}>
                <h1 className={styles.title}>CREATE NEW CLIENT</h1>
            </div>
            <div className={styles.form_container}>
                <form onSubmit={submit} className={styles.form}>
                    <div className={styles.field_separation}>
                        <label id="clientName" className={styles.form_label}>
                            Name *
                        </label>
                        <input
                            type="text"
                            id="clientName"
                            name="clientName"
                            className={styles.field}
                            required
                        ></input>
                    </div>
                    <div className={styles.field_separation}>
                        <label id="clientAddress" className={styles.form_label}>
                            Address
                        </label>
                        <input
                            type="text"
                            id="clientAddress"
                            name="clientAddress"
                            className={styles.field}
                        ></input>
                    </div>
                    <div className={styles.field_separation}>
                        <label id="clientPhone" className={styles.form_label}>
                            Phone *
                        </label>
                        <input
                            type="tel"
                            id="clientPhone"
                            name="clientPhone"
                            className={styles.field}
                            required
                        ></input>
                    </div>
                    <div className={styles.field_separation}>
                        <label id="clientEmail" className={styles.form_label}>
                            Email *
                        </label>
                        <input
                            type="email"
                            id="clientEmail"
                            name="clientEmail"
                            className={styles.field}
                            required
                        ></input>
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
