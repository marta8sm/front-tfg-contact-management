import React, { useState } from 'react'
import styles from './meeting-detail.module.css'
import { MeetingId, useMeeting } from '@/meetings/api/meeting'
import { ClientId } from '@/clients/api/client'
import { useRouter } from 'next/navigation'
import { MeetingDeleteWidget } from '../meeting-delete'

export type MeetingDetailWidgetProps = {
    meetingId: MeetingId
    clientId: ClientId
}

export function MeetingDetailWidget(props: MeetingDetailWidgetProps) {
    //Hook to redirect
    const router = useRouter()

    //Role control
    //const { data: session } = useSession()
    //const isAdmin = session?.user?.roleId === 1

    const { data, isError, isLoading } = useMeeting({
        resourceId: props.meetingId,
        clientId: props.clientId,
    })

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

    const convertToHHMM = (time?: string): string => {
        if (!time) return 'N/A'
        return time.slice(0, 5)
    }

    const meetingStartTimeFormatted = convertToHHMM(data.meetingStartTime)
    const meetingEndTimeFormatted = convertToHHMM(data.meetingEndTime)

    return (
        <div data-testid="meeting-detail-widget" className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>MEETING INFORMATION</h1>
            </div>
            <div className={styles.card_container}>
                <div className={styles.card}>
                    <div className={styles.name}>
                        <h2>MEETING WITH CLIENT {data.clientID}</h2>
                    </div>
                    <div className={styles.attributes}>
                        <h4>
                            <b>ID:</b> {data.meetingID}
                        </h4>
                        <h4>
                            <b>Description:</b> {data.meetingDescription}
                        </h4>
                        <h4>
                            <b>Date:</b> {data.meetingDate}
                        </h4>
                        <h4>
                            <b>Start time:</b> {meetingStartTimeFormatted}
                        </h4>
                        <h4>
                            <b>End time:</b> {meetingEndTimeFormatted}
                        </h4>
                        <h4>
                            <b>Client ID:</b> {data.clientID}
                        </h4>
                        <h4>
                            <b>Employees:</b>
                            <ul className={styles.list}>
                                {data.employees.length > 0 ? (
                                    data.employees.map((employee, id) => (
                                        <li key={id}>
                                            {employee.employeeName}{' '}
                                            {employee.employeeLastName1} (
                                            {employee.employeeEmail})
                                        </li>
                                    ))
                                ) : (
                                    <li>No employees added</li>
                                )}
                            </ul>
                        </h4>
                    </div>
                </div>
            </div>
            <div className={styles.buttons}>
                <button
                    onClick={() =>
                        router.push(
                            `/clients/${data.clientID}/meetings/${data.meetingID}/add-employee`
                        )
                    }
                    type="submit"
                    className={styles.add_employees_button}
                >
                    Add employee
                </button>
                <button
                    onClick={() =>
                        router.push(
                            `/clients/${data.clientID}/meetings/${data.meetingID}/update-meeting`
                        )
                    }
                    type="submit"
                    className={styles.update_button}
                >
                    Update
                </button>
                <button
                    onClick={() =>
                        router.push(
                            `/clients/${data.clientID}/meetings/${data.meetingID}/delete-employee`
                        )
                    }
                    type="submit"
                    className={styles.delete_employees_button}
                >
                    Delete employee
                </button>
                <button
                    onClick={() => setShowDeleteWidget(true)}
                    type="submit"
                    className={styles.delete_button}
                >
                    Delete
                </button>
            </div>
            {showDeleteWidget && (
                <div className={styles.overlay}>
                    <MeetingDeleteWidget
                        meetingId={props.meetingId}
                        clientId={props.clientId}
                        cancel={() => setShowDeleteWidget(false)}
                    />
                </div>
            )}
        </div>
    )
}
