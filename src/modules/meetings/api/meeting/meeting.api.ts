import { ApiContext, DEFAULT_API_CONTEXT } from '@/common/providers/api-context'
import {
    AddEmployeeToMeetingApiParams,
    DeleteEmployeeFromMeetingApiParams,
    MeetingApiResult,
    MeetingCreateApiParams,
    MeetingDeleteApiParams,
    MeetingGetApiParams,
    MeetingId,
    MeetingListApiParams,
    MeetingPaginatedApiResult,
    MeetingUpdateApiParams,
} from './meeting.types'
import { ClientId } from '@/clients/api/client'
import { EmployeeId } from '@/employees/api/employee'

export const meetingApiProto = (
    baseUrl: string = process.env.NEXT_PUBLIC_API_ENDPOINT || '/api',
    defaultApiContext = DEFAULT_API_CONTEXT
) => {
    const endpointUrl = `${baseUrl}/meetings`
    const endpointUrlClient = `${baseUrl}/clients`

    type UrlParams = {
        resourceId?: MeetingId
        clientId?: ClientId
        employeeId?: EmployeeId
    }
    const endpoint = (
        urlParams: UrlParams,
        queryParams: Record<string, string>
    ) => {
        const queryParamString = new URLSearchParams(queryParams).toString()

        return `${endpointUrl}?${queryParamString}`
    }
    const endpointClient = (
        urlParams: UrlParams,
        queryParams: Record<string, string>
    ) => {
        const queryParamString = new URLSearchParams(queryParams).toString()

        return `${endpointUrlClient}?${queryParamString}`
    }
    const endpointMeetingsOfClient = (
        urlParams: UrlParams,
        queryParams: Record<string, string>
    ) => {
        const queryParamString = new URLSearchParams(queryParams).toString()
        const clientIdParam =
            urlParams.clientId === undefined ? '' : `/${urlParams.clientId}`

        return `${endpointUrlClient}${clientIdParam}/meetings?${queryParamString}`
    }
    const endpointMeeting = (
        urlParams: UrlParams,
        queryParams: Record<string, string>
    ) => {
        const queryParamString = new URLSearchParams(queryParams).toString()
        const resourceIdParam =
            urlParams.resourceId === undefined ? '' : `/${urlParams.resourceId}`
        const clientIdParam =
            urlParams.clientId === undefined ? '' : `/${urlParams.clientId}`

        return `${endpointUrlClient}${clientIdParam}/meetings${resourceIdParam}?${queryParamString}`
    }
    const endpointMeetingEmployee = (
        urlParams: UrlParams,
        queryParams: Record<string, string>
    ) => {
        const queryParamString = new URLSearchParams(queryParams).toString()
        const resourceIdParam =
            urlParams.resourceId === undefined ? '' : `/${urlParams.resourceId}`
        const employeeIdParam =
            urlParams.employeeId === undefined ? '' : `/${urlParams.employeeId}`

        return `${endpointUrl}${resourceIdParam}/employees${employeeIdParam}?${queryParamString}`
    }
    const endpointMeetingsOfEmployee = (
        urlParams: UrlParams,
        queryParams: Record<string, string>
    ) => {
        const queryParamString = new URLSearchParams(queryParams).toString()
        const employeeIdParam =
            urlParams.employeeId === undefined ? '' : `/${urlParams.employeeId}`

        return `${endpointUrl}/employees${employeeIdParam}?${queryParamString}`
    }

    return {
        async list(
            this: ApiContext,
            { page, size, ...otherQueryParams }: MeetingListApiParams
        ): Promise<MeetingPaginatedApiResult> {
            const urlParams: UrlParams = {}
            const queryParams = {
                //page: `${page}`,
                //size: `${size}`,
                limit: `${size}`,
                offset: `${Math.max((page - 1) * size, 0)}`,
                ...otherQueryParams,
            }
            const url = endpoint(urlParams, queryParams)
            console.debug(
                `Listing Meeting with page: ${page}, size: ${size}`,
                `on url: ${url}`
            )

            const response = await this.client.get(url)

            // TODO: Add code handle the response if needed

            return response.data as MeetingPaginatedApiResult
        },
        async listByClient(
            this: ApiContext,
            { page, size, clientId, ...otherQueryParams }: MeetingListApiParams
        ): Promise<MeetingPaginatedApiResult> {
            const urlParams: UrlParams = { clientId }
            const queryParams = {
                //page: `${page}`,
                //size: `${size}`,
                limit: `${size}`,
                offset: `${Math.max((page - 1) * size, 0)}`,
                name,
                ...otherQueryParams,
            }
            const url = endpointMeetingsOfClient(urlParams, queryParams)
            console.debug(
                `Listing Meeting with page: ${page}, size: ${size}`,
                `on url: ${url}`
            )

            const response = await this.client.get(url)

            // TODO: Add code handle the response if needed

            return response.data as MeetingPaginatedApiResult
        },
        async listMeetingsOfEmployee(
            this: ApiContext,
            {
                page,
                size,
                employeeId,
                ...otherQueryParams
            }: MeetingListApiParams
        ): Promise<MeetingPaginatedApiResult> {
            const urlParams: UrlParams = { employeeId }
            const queryParams = {
                //page: `${page}`,
                //size: `${size}`,
                limit: `${size}`,
                offset: `${Math.max((page - 1) * size, 0)}`,
                name,
                ...otherQueryParams,
            }
            const url = endpointMeetingsOfEmployee(urlParams, queryParams)
            console.debug(
                `Listing Meeting with page: ${page}, size: ${size}`,
                `on url: ${url}`
            )

            const response = await this.client.get(url)

            // TODO: Add code handle the response if needed

            return response.data as MeetingPaginatedApiResult
        },
        async delete(
            this: ApiContext,
            { resourceId, clientId, ...queryParams }: MeetingDeleteApiParams
        ): Promise<boolean> {
            const urlParams: UrlParams = { resourceId, clientId }
            const url = endpointMeeting(urlParams, queryParams)
            console.debug(
                `Deleting Meeting with id:`,
                resourceId,
                `on url: ${url}`
            )

            const response = await this.client.delete(url)

            return response.status >= 200 && response.status < 300
        },
        async deleteEmployeeFromMeeting(
            this: ApiContext,
            {
                resourceId,
                employeeId,
                ...queryParams
            }: DeleteEmployeeFromMeetingApiParams
        ): Promise<boolean> {
            const urlParams: UrlParams = { resourceId, employeeId }
            const url = endpointMeetingEmployee(urlParams, queryParams)
            console.debug(
                `Deleting employee `,
                employeeId,
                ` from Meeting with id:`,
                resourceId,
                `on url: ${url}`
            )

            const response = await this.client.delete(url)

            return response.status >= 200 && response.status < 300
        },
        async create(
            this: ApiContext,
            { newResource, clientId, ...queryParams }: MeetingCreateApiParams
        ): Promise<boolean> {
            const urlParams: UrlParams = { clientId }
            const url = endpointMeetingsOfClient(urlParams, queryParams)
            console.debug(
                `Creating Meeting resource:`,
                newResource,
                `on url: ${url}`
            )
            const response = await this.client.post(url, newResource)

            return response.status >= 200 && response.status < 300
        },
        async update(
            this: ApiContext,
            {
                updatedResource,
                resourceId,
                clientId,
                ...queryParams
            }: MeetingUpdateApiParams
        ): Promise<boolean> {
            const urlParams: UrlParams = {
                resourceId,
                clientId,
            }
            const url = endpointMeeting(urlParams, queryParams)
            console.debug(
                `updating Meeting resource:`,
                updatedResource,
                `on url: ${url}`
            )
            const response = await this.client.put(url, updatedResource)

            return response.status >= 200 && response.status < 300
        },
        async addEmployeeToMeeting(
            this: ApiContext,
            {
                resourceId,
                employeeId,
                ...queryParams
            }: AddEmployeeToMeetingApiParams
        ): Promise<boolean> {
            const urlParams: UrlParams = {
                resourceId,
                employeeId,
            }
            const url = endpointMeetingEmployee(urlParams, queryParams)
            console.debug(
                `adding employee ${employeeId} to meeting ${resourceId} `,
                `on url: ${url}`
            )
            const response = await this.client.put(url)

            return response.status >= 200 && response.status < 300
        },
        async get(
            this: ApiContext,
            { resourceId, clientId, ...queryParams }: MeetingGetApiParams
        ): Promise<MeetingApiResult> {
            const urlParams: UrlParams = {
                resourceId,
                clientId,
            }
            const url = endpointMeeting(urlParams, queryParams)
            console.debug(
                `Getting Meeting with id:`,
                resourceId,
                `on url: ${url}`
            )

            const response = await this.client.get(url)

            // TODO: Add code handle the response if needed

            return response.data as MeetingApiResult
        },
        ...defaultApiContext,
    }
}

export const meetingApi = meetingApiProto()
