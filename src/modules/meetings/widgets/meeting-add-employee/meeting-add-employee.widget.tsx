import React, { useState } from 'react'
import styles from './meeting-add-employee.module.css'
import { meetingApi, MeetingId, useMeeting } from '@/meetings/api/meeting'
import { EmployeeId, useEmployees } from '@/employees/api/employee'
import { useRouter } from 'next/navigation'
import { ClientId } from '@/clients/api/client'

export type MeetingAddEmployeeWidgetProps = {
    meetingId: MeetingId
    clientId: ClientId
}

export function MeetingAddEmployeeWidget(props: MeetingAddEmployeeWidgetProps) {
    //Hook to redirect
    const router = useRouter()

    const [selectedEmployeeId, setSelectedEmployeeId] =
        useState<EmployeeId | null>(null)

    const {
        data: employees,
        isError: isErrorEmployees,
        isLoading: isLoadingEmployees,
    } = useEmployees({
        size: 100,
    })

    const {
        data: meeting,
        isError: isErrorMeeting,
        isLoading: isLoadingMeeting,
    } = useMeeting({
        resourceId: props.meetingId,
        clientId: props.clientId,
    })

    if (isLoadingEmployees || isLoadingMeeting)
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
    if (isErrorEmployees || isErrorMeeting || !meeting)
        return (
            <div id="error_div">
                <div id="error">
                    <h3 className={styles.question}>Error</h3>
                </div>
            </div>
        )

    // To filter the employees that aren't added to the meeting yet
    const notAddedEmployees = (employees || []).filter(
        (employee) =>
            !meeting.employees?.some(
                (e) => e.employeeID === employee.employeeID
            )
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
            //alert('Employee added successfully!')
            void router.refresh()
        } else {
            alert('Failed to add employee to meeting. Please try again.')
        }
    }

    const cancel = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()

        void router.back()
    }

    return (
        <div
            data-testid="meeting-add-employee-widget"
            className={styles.container}
        >
            <div className={styles.table_header}>
                <h1 className={styles.title}>
                    ADD EMPLOYEE TO MEETING {props.meetingId}
                </h1>
            </div>
            <div className={styles.form_container}>
                <form onSubmit={submit}>
                    <select
                        id="employee"
                        className={styles.selector}
                        placeholder="Select an employee:"
                        value={selectedEmployeeId ?? ''}
                        onChange={(e) =>
                            setSelectedEmployeeId(parseInt(e.target.value))
                        }
                        required
                    >
                        <option value="" disabled>
                            Select an employee
                        </option>
                        {notAddedEmployees.map((employee) => (
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
                            onClick={cancel}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
