import React from 'react'
import styles from './employee-form-create.module.css'
import { useRouter } from 'next/navigation'
import { employeeApi } from '@/employees/api/employee'

export type EmployeeFormCreateWidgetProps = {}

export function EmployeeFormCreateWidget(props: EmployeeFormCreateWidgetProps) {
    //Hook to redirect
    const router = useRouter()

    const submit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const employeeDNIString = event.currentTarget.elements.namedItem(
            'employeeDNI'
        ) as HTMLInputElement
        const employeeDNI = Number(employeeDNIString.value)
        const employeeName = (
            event.currentTarget.elements.namedItem(
                'employeeName'
            ) as HTMLInputElement
        ).value
        const employeeLastName1 = (
            event.currentTarget.elements.namedItem(
                'employeeLastName1'
            ) as HTMLInputElement
        ).value
        const employeeLastName2 = (
            event.currentTarget.elements.namedItem(
                'employeeLastName2'
            ) as HTMLInputElement
        ).value
        const employeePhone = (
            event.currentTarget.elements.namedItem(
                'employeePhone'
            ) as HTMLInputElement
        ).value
        const employeeEmail = (
            event.currentTarget.elements.namedItem(
                'employeeEmail'
            ) as HTMLInputElement
        ).value
        const employeePassword = (
            event.currentTarget.elements.namedItem(
                'employeePassword'
            ) as HTMLInputElement
        ).value
        const roleIDString = event.currentTarget.elements.namedItem(
            'roleId'
        ) as HTMLInputElement
        const roleID = Number(roleIDString.value)

        const success = await employeeApi.create({
            newResource: {
                employeeDNI: employeeDNI,
                employeeName: employeeName,
                employeeLastName1: employeeLastName1,
                employeeLastName2: employeeLastName2,
                employeePhone: employeePhone,
                employeeEmail: employeeEmail,
                employeePassword: employeePassword,
                roleID: roleID,
            },
        })

        if (success) {
            void router.push(`/employees`)
        }
    }

    const cancel = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()

        void router.back()
    }

    return (
        <div
            data-testid="employee-form-create-widget"
            className={styles.container}
        >
            <div className={styles.table_header}>
                <h1 className={styles.title}>CREATE NEW EMPLOYEE</h1>
            </div>
            <div className={styles.form_container}>
                <form onSubmit={submit} className={styles.form}>
                    <div>
                        <label id="employeeDNI" className={styles.form_label}>
                            DNI *
                        </label>
                        <input
                            type="number"
                            id="employeeDNI"
                            name="employeeDNI"
                            className={styles.field}
                            required
                        />
                    </div>
                    <div>
                        <label id="employeeName" className={styles.form_label}>
                            Name *
                        </label>
                        <input
                            type="text"
                            id="employeeName"
                            name="employeeName"
                            className={`${styles.field} capitalize`}
                            required
                        />
                    </div>
                    <div>
                        <label
                            id="employeeLastName1"
                            className={styles.form_label}
                        >
                            First lastname *
                        </label>
                        <input
                            type="text"
                            id="employeeLastName1"
                            name="employeeLastName1"
                            className={`${styles.field} capitalize`}
                            required
                        />
                    </div>
                    <div>
                        <label
                            id="employeeLastName2"
                            className={styles.form_label}
                        >
                            Second lastname
                        </label>
                        <input
                            type="text"
                            id="employeeLastName2"
                            name="employeeLastName2"
                            className={`${styles.field} capitalize`}
                        />
                    </div>
                    <div>
                        <label id="employeePhone" className={styles.form_label}>
                            Phone *
                        </label>
                        <input
                            type="tel"
                            id="employeePhone"
                            name="employeePhone"
                            className={styles.field}
                            required
                        ></input>
                    </div>
                    <div>
                        <label id="employeeEmail" className={styles.form_label}>
                            Email *
                        </label>
                        <input
                            type="email"
                            id="employeeEmail"
                            name="employeeEmail"
                            className={styles.field}
                            required
                        ></input>
                    </div>
                    <div>
                        <label
                            id="employeePassword"
                            className={styles.form_label}
                        >
                            Password *
                        </label>
                        <input
                            type="text"
                            id="employeePassword"
                            name="employeePassword"
                            className={styles.field}
                            required
                        ></input>
                    </div>
                    <div>
                        <label id="roleId" className={styles.form_label}>
                            Role ID
                        </label>
                        <input
                            type="number"
                            id="roleId"
                            name="roleId"
                            className={styles.field}
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
