import React, { useState } from 'react'
import styles from './employees-of-meeting.module.css'
import { useRouter } from 'next/navigation'
import { EmployeeId } from '@/employees/api/employee'
import { useMeeting } from '@/meetings/api/meeting'
import {
    TableBody,
    TableHead,
    TableHeader,
    TableRoot,
} from '@/common/components/ui/table'
import { EmployeeRow } from '@/employees/components/employee-row'
import { DeleteEmployeeFromMeetingWidget } from '@/employees/widgets/delete-employee-from-meeting'

export type EmployeesOfMeetingWidgetProps = {
    meetingID: number
    clientID: number
}

export function EmployeesOfMeetingWidget(props: EmployeesOfMeetingWidgetProps) {
    //Hook to redirect
    const router = useRouter()

    const { meetingID, clientID } = props

    const { data, isLoading, isError } = useMeeting({
        resourceId: meetingID,
        clientId: clientID,
    })

    const [showDeleteWidget, setShowDeleteWidget] = useState(false)
    const [selectedEmployeeId, setSelectedEmployeeId] =
        useState<EmployeeId | null>(null)

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

    const handleDelete = (employeeID: EmployeeId) => {
        setSelectedEmployeeId(employeeID)
        setShowDeleteWidget(true)
    }

    return (
        <div
            data-testid="employees-of-meeting-widget"
            className={styles.container}
        >
            <div className={styles.header}>
                <h1 className={styles.title}>
                    EMPLOYEES OF MEETING {meetingID}
                </h1>
            </div>
            <div className={styles.buttons}>
                <button
                    onClick={() => router.back()}
                    type="button"
                    className={styles.goback_button}
                >
                    &lt;&lt; Go back
                </button>
            </div>
            <div className={styles.table_container}>
                <TableRoot className={styles.table}>
                    <TableHeader className={styles.table_header}>
                        <tr className={styles.table_header}>
                            <TableHead></TableHead>
                            <TableHead>ID</TableHead>
                            <TableHead>DNI</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>First lastname</TableHead>
                            <TableHead>Second lastname</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role ID</TableHead>
                        </tr>
                    </TableHeader>
                    <TableBody>
                        {data.employees.map((employee) => (
                            <EmployeeRow
                                key={employee.employeeID}
                                {...employee}
                                onClick={() =>
                                    handleDelete(employee.employeeID)
                                }
                            />
                        ))}
                    </TableBody>
                </TableRoot>
                {showDeleteWidget && selectedEmployeeId !== null && (
                    <div className={styles.overlay}>
                        <DeleteEmployeeFromMeetingWidget
                            employeeId={selectedEmployeeId}
                            meetingId={meetingID}
                            submit={() => setShowDeleteWidget(false)}
                            cancel={() => setShowDeleteWidget(false)}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}
