import { ApiContext, DEFAULT_API_CONTEXT } from '@/common/providers/api-context'
import {
    EmployeeApiResult,
    EmployeeCreateApiParams,
    EmployeeDeleteApiParams,
    EmployeeGetApiParams,
    EmployeeId,
    EmployeeListApiParams,
    EmployeePaginatedApiResult,
    EmployeeUpdateApiParams,
} from './employee.types'

export const employeeApiProto = (
    baseUrl: string = process.env.NEXT_PUBLIC_API_ENDPOINT || '',
    defaultApiContext = DEFAULT_API_CONTEXT
) => {
    const endpointUrl = `${baseUrl}/employees`
    const endpointAdminUrl = `${baseUrl}/admin/employees`
    const endpointRegisterUrl = `${baseUrl}/auth/register`

    type UrlParams = { resourceId?: EmployeeId }
    const endpoint = (
        urlParams: UrlParams,
        queryParams: Record<string, string>
    ) => {
        const queryParamString = new URLSearchParams(queryParams).toString()

        return `${endpointUrl}?${queryParamString}`
    }
    const endpointEmployee = (
        urlParams: UrlParams,
        queryParams: Record<string, string>
    ) => {
        const queryParamString = new URLSearchParams(queryParams).toString()
        const resourceIdParam =
            urlParams.resourceId === undefined ? '' : `/${urlParams.resourceId}`

        return `${endpointUrl}${resourceIdParam}?${queryParamString}`
    }
    const endpointAdmin = (
        urlParams: UrlParams,
        queryParams: Record<string, string>
    ) => {
        const queryParamString = new URLSearchParams(queryParams).toString()
        const resourceIdParam =
            urlParams.resourceId === undefined ? '' : `/${urlParams.resourceId}`

        return `${endpointAdminUrl}${resourceIdParam}?${queryParamString}`
    }
    const endpointRegister = (
        urlParams: UrlParams,
        queryParams: Record<string, string>
    ) => {
        const queryParamString = new URLSearchParams(queryParams).toString()

        return `${endpointRegisterUrl}?${queryParamString}`
    }

    return {
        async list(
            this: ApiContext,
            { page, size, ...otherQueryParams }: EmployeeListApiParams
        ): Promise<EmployeePaginatedApiResult> {
            const urlParams: UrlParams = {}
            const queryParams = {
                //page: `${page}`,
                //size: `${size}`,
                limit: `${size}`,
                offset: `${Math.max((page - 1) * size, 0)}`,
                name,
                ...otherQueryParams,
            }
            const url = endpoint(urlParams, queryParams)
            console.debug(
                `Listing Employee with page: ${page}, size: ${size}`,
                `on url: ${url}`
            )

            const response = await this.client.get(url)

            // TODO: Add code handle the response if needed

            return response.data as EmployeePaginatedApiResult
        },
        async delete(
            this: ApiContext,
            { resourceId, ...queryParams }: EmployeeDeleteApiParams
        ): Promise<boolean> {
            const urlParams: UrlParams = { resourceId }
            const url = endpointAdmin(urlParams, queryParams)
            console.debug(
                `Deleting Employee with id:`,
                resourceId,
                `on url: ${url}`
            )

            const response = await this.client.delete(url)

            return response.status >= 200 && response.status < 300
        },
        async create(
            this: ApiContext,
            { newResource, ...queryParams }: EmployeeCreateApiParams
        ): Promise<boolean> {
            const urlParams: UrlParams = {}
            const url = endpointRegister(urlParams, queryParams)
            console.debug(
                `Creating Employee resource:`,
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
                ...queryParams
            }: EmployeeUpdateApiParams
        ): Promise<boolean> {
            const urlParams: UrlParams = {
                resourceId,
            }
            const url = endpointAdmin(urlParams, queryParams)
            console.debug(
                `updating Employee resource:`,
                updatedResource,
                `on url: ${url}`
            )
            const response = await this.client.put(url, updatedResource)

            return response.status >= 200 && response.status < 300
        },
        async get(
            this: ApiContext,
            { resourceId, ...queryParams }: EmployeeGetApiParams
        ): Promise<EmployeeApiResult> {
            const urlParams: UrlParams = {
                resourceId,
            }
            const url = endpointEmployee(urlParams, queryParams)
            console.debug(
                `Getting Employee with id:`,
                resourceId,
                `on url: ${url}`
            )

            const response = await this.client.get(url)

            // TODO: Add code handle the response if needed

            return response.data as EmployeeApiResult
        },
        ...defaultApiContext,
    }
}

export const employeeApi = employeeApiProto()
