import React, { useState } from 'react'
import styles from './meeting-list-of-client.module.css'
import { ClientId } from '@/clients/api/client'
import { useRouter } from 'next/navigation'
import { useMeetingsOfClient } from '@/meetings/api/meeting'
import DatePicker from 'react-datepicker'
import {
    TableRoot,
    TableHeader,
    TableHead,
    TableBody,
} from '@/common/components/ui/table'
import { MeetingRow } from '@/meetings/components/meeting-row'

export type MeetingListOfClientWidgetProps = {
    clientId: ClientId
}

export function MeetingListOfClientWidget(
    props: MeetingListOfClientWidgetProps
) {
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

    const { clientId } = props

    const { data, isError, isLoading } = useMeetingsOfClient({
        size: 10,
        clientId,
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

    return (
        <div
            data-testid="meeting-list-of-client-widget"
            className={styles.container}
        >
            <div className={styles.title}>
                <h1>MEETINGS OF CLIENT {clientId}</h1>
            </div>
            <div className={styles.buttons}>
                <button
                    onClick={() => router.back()}
                    type="button"
                    className={styles.goback_button}
                >
                    &lt;&lt; Go back
                </button>
                <button
                    onClick={() =>
                        router.push(
                            `/clients/${clientId}/meetings/post-new-meeting`
                        )
                    }
                    type="submit"
                    className={styles.create_button}
                >
                    Create meeting
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
