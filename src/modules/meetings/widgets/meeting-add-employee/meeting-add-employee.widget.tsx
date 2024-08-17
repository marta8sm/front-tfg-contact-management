import React, { useState } from 'react'
import styles from './meeting-add-employee.module.css'
import { meetingApi, MeetingId, useMeeting } from '@/meetings/api/meeting'
import { Employee, EmployeeId, useEmployees } from '@/employees/api/employee'
import { useRouter } from 'next/navigation'
import { ClientId } from '@/clients/api/client'

export type MeetingAddEmployeeWidgetProps = {
    meetingId: MeetingId
    clientId: ClientId
}

export function MeetingAddEmployeeWidget(props: MeetingAddEmployeeWidgetProps) {
    //Hook to redirect
    const router = useRouter()

    const [error, setError] = useState<string | null>(null)
    const [selectedEmployeeId, setSelectedEmployeeId] =
        useState<EmployeeId | null>(null)

    const { data, isError, isLoading } = useEmployees({
        size: 100,
    })

    /*if (isLoadingEmployee)
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
    if (isErrorEmployee)
        return (
            <div id="error_div">
                <div id="error">
                    <h3 className={styles.question}>Error</h3>
                </div>
            </div>
        )

    const { data, isError, isLoading } = useMeeting({
        resourceId: props.meetingId,
        clientId: props.clientId,
    })*/

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

        if (!selectedEmployeeId) {
            alert('Please select an employee')
            return
        }

        const success = await meetingApi.addEmployeeToMeeting({
            resourceId: props.meetingId,
            employeeId: selectedEmployeeId,
        })

        if (success) {
            alert('Employee added successfully!')
            router.push(
                `/clients/${props.clientId}/meetings/${props.meetingId}`
            )
        } else {
            alert('Failed to add employee to meeting. Please try again.')
        }
    }

    const cancel = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()

        void router.push(
            `/clients/${props.clientId}/meetings/${props.meetingId}`
        )
    }

    return (
        <div
            data-testid="meeting-add-employee-widget"
            className={styles.container}
        >
            <div className={styles.table_header}>
                <h1 className={styles.title}>ADD EMPLOYEE TO MEETING</h1>
            </div>
            <div className={styles.form_container}>
                <form onSubmit={submit}>
                    <label htmlFor="employee">Select an employee:</label>
                    <select
                        id="employee"
                        value={selectedEmployeeId ?? ''}
                        onChange={(e) =>
                            setSelectedEmployeeId(parseInt(e.target.value))
                        }
                        required
                    >
                        <option value="" disabled>
                            Select an employee
                        </option>
                        {data.map((employee) => (
                            <option
                                key={employee.employeeID}
                                value={employee.employeeID}
                            >
                                {employee.employeeName}{' '}
                                {employee.employeeLastName1}
                                {' ('}
                                {employee.employeeEmail}
                                {')'}
                            </option>
                        ))}
                    </select>
                    <div className={styles.buttons}>
                        <button type="submit" className={styles.submit_button}>
                            Submit
                        </button>
                        <button
                            type="button"
                            className={styles.cancel_button}
                            onClick={() =>
                                router.push(
                                    `/clients/${props.clientId}/meetings/${props.meetingId}`
                                )
                            }
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
