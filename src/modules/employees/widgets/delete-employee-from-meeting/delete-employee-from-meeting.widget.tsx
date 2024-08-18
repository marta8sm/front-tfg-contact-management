import React from 'react'
import styles from './delete-employee-from-meeting.module.css'
import { EmployeeId, useEmployee } from '@/employees/api/employee'
import { useRouter } from 'next/navigation'
import { meetingApi, MeetingId } from '@/meetings/api/meeting'

export type DeleteEmployeeFromMeetingWidgetProps = {
    employeeId: EmployeeId
    meetingId: MeetingId
    cancel: () => void
}

export function DeleteEmployeeFromMeetingWidget(
    props: DeleteEmployeeFromMeetingWidgetProps
) {
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

        const success = await meetingApi.deleteEmployeeFromMeeting({
            resourceId: props.meetingId,
            employeeId: props.employeeId,
        })

        if (success) {
            void router.refresh()
        }
    }

    return (
        <div
            data-testid="delete-employee-from-meeting-widget"
            className={styles.container}
        >
            <div className={styles.delete_div}>
                <h3 className={styles.question}>
                    Delete employee {data.employeeName} {data.employeeLastName1}{' '}
                    from this meeting?
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
