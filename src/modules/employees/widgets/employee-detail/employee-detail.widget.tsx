import React, { useState } from 'react'
import styles from './employee-detail.module.css'
import { EmployeeId, useEmployee } from '@/employees/api/employee'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { EmployeeDeleteWidget } from '../employee-delete'
import { useMeetingsOfEmployee } from '@/meetings/api/meeting'

export type EmployeeDetailWidgetProps = {
    employeeId: EmployeeId
}

export function EmployeeDetailWidget(props: EmployeeDetailWidgetProps) {
    //Hook to redirect
    const router = useRouter()

    //Role control
    const { data: session } = useSession()
    const isAdmin = session?.user?.roleId === 1

    const { data, isError, isLoading } = useEmployee({
        resourceId: props.employeeId,
    })

    const { data: meetingsData, isLoading: meetingsLoading } =
        useMeetingsOfEmployee({
            size: 100,
            employeeId: props.employeeId,
        })

    const hasMeetings = meetingsData && meetingsData.length > 0

    const [showDeleteWidget, setShowDeleteWidget] = useState(false)

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

    return (
        <div data-testid="employee-detail-widget" className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>EMPLOYEE INFORMATION</h1>
            </div>
            <div className={styles.card_container}>
                <div className={styles.card}>
                    <div className={styles.name}>
                        <h2>{data.employeeName}</h2>
                        <h2>
                            {data.employeeLastName1} {data.employeeLastName2}
                        </h2>
                    </div>
                    <div className={styles.attributes}>
                        <h4>
                            <b>ID:</b> {data.employeeID}
                        </h4>
                        <h4>
                            <b>DNI:</b> {data.employeeDNI}
                        </h4>
                        <h4>
                            <b>Name:</b> {data.employeeName}
                        </h4>
                        <h4>
                            <b>First lastname:</b> {data.employeeLastName1}
                        </h4>
                        <h4>
                            <b>Second lastname:</b> {data.employeeLastName2}
                        </h4>
                        <h4>
                            <b>Phone:</b> {data.employeePhone}
                        </h4>
                        <h4>
                            <b>Email:</b> {data.employeeEmail}
                        </h4>
                        <h4>
                            <b>Password:</b> {data.employeePassword}
                        </h4>
                        <h4>
                            <b>Role ID:</b> {data.roleID}
                        </h4>
                    </div>
                </div>
            </div>
            <div className={styles.buttons}>
                {hasMeetings ? (
                    <button
                        onClick={() =>
                            router.push(
                                `/meetings/employees/${data.employeeID}`
                            )
                        }
                        type="submit"
                        className={styles.meetings_button}
                    >
                        See meetings
                    </button>
                ) : (
                    <button
                        type="button"
                        className={styles.no_meetings_button}
                        disabled
                    >
                        No meetings
                    </button>
                )}
                {isAdmin && (
                    <>
                        <button
                            onClick={() =>
                                router.push(
                                    `/employees/${data.employeeID}/update-employee`
                                )
                            }
                            type="submit"
                            className={styles.update_button}
                        >
                            Update
                        </button>
                        <button
                            onClick={() => setShowDeleteWidget(true)}
                            type="submit"
                            className={styles.delete_button}
                        >
                            Delete
                        </button>
                    </>
                )}
            </div>
            {showDeleteWidget && (
                <div className={styles.overlay}>
                    <EmployeeDeleteWidget
                        employeeId={props.employeeId}
                        cancel={() => setShowDeleteWidget(false)}
                    />
                </div>
            )}
        </div>
    )
}
