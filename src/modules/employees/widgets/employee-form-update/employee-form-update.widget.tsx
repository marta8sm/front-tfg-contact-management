import React from 'react'
import styles from './employee-form-update.module.css'
import { employeeApi, EmployeeId, useEmployee } from '@/employees/api/employee'
import { useRouter } from 'next/navigation'

export type EmployeeFormUpdateWidgetProps = {
    employeeId: EmployeeId
}

export function EmployeeFormUpdateWidget(props: EmployeeFormUpdateWidgetProps) {
    //Hook to redirect
    const router = useRouter()

    const { data, isError, isLoading } = useEmployee({
        resourceId: props.employeeId,
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

        const success = await employeeApi.update({
            updatedResource: {
                employeeDNI: employeeDNI,
                employeeName: employeeName,
                employeeLastName1: employeeLastName1,
                employeeLastName2: employeeLastName2,
                employeePhone: employeePhone,
                employeeEmail: employeeEmail,
                employeePassword: employeePassword,
                roleID: roleID,
            },
            resourceId: props.employeeId,
        })

        if (success) {
            void router.push(`/employees/${props.employeeId}`)
        }
    }

    const cancel = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()

        void router.push(`/employees/${props.employeeId}`)
    }

    return (
        <div
            data-testid="employee-form-update-widget"
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
                            defaultValue={data.employeeDNI}
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
                            defaultValue={data.employeeName}
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
                            defaultValue={data.employeeLastName1}
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
                            defaultValue={data.employeeLastName2}
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
                            defaultValue={data.employeePhone}
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
                            defaultValue={data.employeeEmail}
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
                            defaultValue={data.employeePassword}
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
                            defaultValue={data.roleID}
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
