import React, { useEffect, useState } from 'react'
import styles from './meeting-list.module.css'
import {
    TableRoot,
    TableHeader,
    TableBody,
    TableHead,
} from '@/common/components/ui/table'
import { useRouter } from 'next/navigation'
import { useMeetings } from '@/meetings/api/meeting'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { MeetingRow } from '@/meetings/components/meeting-row'

export type MeetingListWidgetProps = {}

export function MeetingListWidget(props: MeetingListWidgetProps) {
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

    const { data, isError, isLoading } = useMeetings({
        size: 10,
        description: searchParam,
        date: dateParam ? dateParam.toISOString().split('T')[0] : '',
    })

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [searchParam])

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

    /*const filterDateDescription = data.filter((meeting) => {
        const matchDescription = meeting.meetingDescription
            .toLowerCase()
            .includes(searchParam.toLowerCase())

        const matchDate = dateParam
            ? dateParam.toISOString().split('T')[0] === meeting.meetingDate
            : true

        return matchDescription && matchDate
    })*/

    return (
        <div data-testid="meeting-list-widget" className={styles.container}>
            <div className={styles.title}>
                <h1>MEETINGS</h1>
            </div>
            <div className={styles.buttons}>
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
                        selected={dateParam} // <-- Valor seleccionado
                        onChange={handleDateChange} // <-- Manejador de cambios
                        dateFormat="yyyy-MM-dd" // <-- Formato de la fecha
                        className={styles.date_picker} // <-- Clase de estilos para el DatePicker
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
