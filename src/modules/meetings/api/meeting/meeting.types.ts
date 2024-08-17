import { ClientId } from '@/clients/api/client'
import { Employee, EmployeeId } from '@/employees/api/employee'
import type { Pagination } from '@/hookey'

export type Meeting = {
    meetingID: MeetingId
    meetingDescription: string
    meetingDate: string
    meetingStartTime?: string
    meetingEndTime?: string
    clientID: ClientId
    employees: Employee[]
}

export type MeetingId = number

export type MeetingApiResult = Meeting

export type MeetingPaginatedApiResult = Meeting[]

export type MeetingListApiParams = Pagination.UsePaginatedQueryParams<{
    date?: string
    description?: string
    clientId?: ClientId
    employeeId?: EmployeeId
}>

export type MeetingGetApiParams = {
    resourceId: MeetingId
    clientId: ClientId
}

export type MeetingCreateApiParams = {
    newResource: Omit<Omit<Meeting, 'meetingId'>, 'clientId'>
    clientId: ClientId
}

export type MeetingUpdateApiParams = {
    updatedResource: Omit<Omit<Meeting, 'meetingId'>, 'clientId'>
    resourceId: MeetingId
    clientId: ClientId
}

export type AddEmployeeToMeetingApiParams = {
    resourceId: MeetingId
    employeeId: EmployeeId
}

export type MeetingDeleteApiParams = {
    resourceId: MeetingId
    clientId: ClientId
}

export type DeleteEmployeeFromMeetingApiParams = {
    resourceId: MeetingId
    employeeId: EmployeeId
}
