import React from 'react'
import styles from './employee-delete.module.css'
import { employeeApi, EmployeeId, useEmployee } from '@/employees/api/employee'
import { useRouter } from 'next/navigation'

export type EmployeeDeleteWidgetProps = {
    employeeId: EmployeeId
    cancel: () => void
}

export function EmployeeDeleteWidget(props: EmployeeDeleteWidgetProps) {
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

    const submit = async (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.preventDefault()

        const success = await employeeApi.delete({
            resourceId: props.employeeId,
        })

        if (success) {
            void router.back()
        }
    }

    return (
        <div data-testid="employee-delete-widget" className={styles.container}>
            <div className={styles.delete_div}>
                <h3 className={styles.question}>
                    Delete employee {data.employeeName} {data.employeeLastName1}
                    ?
                </h3>
            </div>
            <div className={styles.delete_buttons}>
                <button onClick={submit} type="button" className={styles.yes}>
                    Yes
                </button>
                <button
                    onClick={props.cancel}
                    type="button"
                    className={styles.no}
                >
                    No
                </button>
            </div>
        </div>
    )
}
