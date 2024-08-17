import React, { useState } from 'react'
import styles from './meetings-of-employee.module.css'
import { EmployeeId } from '@/employees/api/employee'
import { useRouter } from 'next/navigation'
import { useMeetingsOfEmployee } from '@/meetings/api/meeting'
import DatePicker from 'react-datepicker'
import {
    TableRoot,
    TableHeader,
    TableHead,
    TableBody,
} from '@/common/components/ui/table'
import { MeetingRow } from '@/meetings/components/meeting-row'

export type MeetingsOfEmployeeWidgetProps = {
    employeeId: EmployeeId
}
export function MeetingsOfEmployeeWidget(props: MeetingsOfEmployeeWidgetProps) {
    //Hook to redirect
    const router = useRouter()

    const [searchParam, setSearchParam] = useState('')
    const [dateParam, setDateParam] = useState<Date | null>(null)

    const handleDateChange = (date: Date | null) => {
        if (date) {
            const adjustedDate = new Date(
                date.getTime() - date.getTimezoneOffset() * 60000
            )
            setDateParam(adjustedDate)
        } else {
            setDateParam(null)
        }
    }

    const { employeeId } = props

    const { data, isError, isLoading } = useMeetingsOfEmployee({
        size: 10,
        employeeId,
        description: searchParam,
        date: dateParam ? dateParam.toISOString().split('T')[0] : '',
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

    if (data.length === 0) {
        return (
            <div id="no_meetings">
                <h3 className={styles.no_meetings}>
                    No meetings associated with this employee
                </h3>
            </div>
        )
    }

    return (
        <div
            data-testid="meetings-of-employee-widget"
            className={styles.container}
        >
            <div className={styles.title}>
                <h1>MEETINGS OF EMPLOYEE {employeeId}</h1>
            </div>
            <div className={styles.buttons}>
                <button
                    onClick={() => router.back()}
                    type="button"
                    className={styles.goback_button}
                >
                    &lt;&lt; Go back
                </button>
                <form className={styles.search_form}>
                    <input
                        type="text"
                        placeholder="Search by description"
                        value={searchParam}
                        onChange={(e) => setSearchParam(e.target.value)}
                        className={styles.search_bar}
                    />
                    <DatePicker
                        placeholderText="Search by date"
                        selected={dateParam}
                        onChange={handleDateChange}
                        dateFormat="yyyy-MM-dd"
                        className={styles.date_picker}
                        popperClassName="custom-calendar-popper"
                        calendarClassName="custom-calendar"
                        shouldCloseOnSelect={true}
                        // Desactivamos el comportamiento móvil nativo
                        onFocus={(e) => e.target.blur()}
                    />
                </form>
            </div>
            <div className={styles.table_container}>
                <TableRoot className={styles.table}>
                    <TableHeader className={styles.table_header}>
                        <tr className={styles.table_header}>
                            <TableHead>ID</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Start time</TableHead>
                            <TableHead>End time</TableHead>
                            <TableHead>Client ID</TableHead>
                        </tr>
                    </TableHeader>
                    <TableBody>
                        {data.map((meeting) => (
                            <MeetingRow
                                key={meeting.meetingID}
                                {...meeting}
                                onClick={() =>
                                    router.push(
                                        `/clients/${meeting.clientID}/meetings/${meeting.meetingID}`
                                    )
                                }
                            />
                        ))}
                    </TableBody>
                </TableRoot>
            </div>
        </div>
    )
}
