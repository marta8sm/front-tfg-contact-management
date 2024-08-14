import { ApiContext, DEFAULT_API_CONTEXT } from '@/common/providers/api-context'
import {
    RoleApiResult,
    RoleCreateApiParams,
    RoleDeleteApiParams,
    RoleGetApiParams,
    RoleId,
    RoleListApiParams,
    RolePaginatedApiResult,
    RoleUpdateApiParams,
} from './role.types'

export const roleApiProto = (
    baseUrl: string = process.env.NEXT_PUBLIC_API_ENDPOINT || '',
    defaultApiContext = DEFAULT_API_CONTEXT
) => {
    const endpointUrl = `${baseUrl}/roles`
    const endpointAdminUrl = `${baseUrl}/admin/roles`

    type UrlParams = { resourceId?: RoleId }
    const endpoint = (
        urlParams: UrlParams,
        queryParams: Record<string, string>
    ) => {
        const queryParamString = new URLSearchParams(queryParams).toString()

        return `${endpointUrl}?${queryParamString}`
    }
    const endpointRole = (
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

    return {
        async list(
            this: ApiContext,
            { page, size, ...otherQueryParams }: RoleListApiParams
        ): Promise<RolePaginatedApiResult> {
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
                `Listing Role with page: ${page}, size: ${size}`,
                `on url: ${url}`
            )

            const response = await this.client.get(url)

            // TODO: Add code handle the response if needed

            return response.data as RolePaginatedApiResult
        },
        async delete(
            this: ApiContext,
            { resourceId, ...queryParams }: RoleDeleteApiParams
        ): Promise<boolean> {
            const urlParams: UrlParams = { resourceId }
            const url = endpointAdmin(urlParams, queryParams)
            console.debug(
                `Deleting Role with id:`,
                resourceId,
                `on url: ${url}`
            )

            const response = await this.client.delete(url)

            return response.status >= 200 && response.status < 300
        },
        async create(
            this: ApiContext,
            { newResource, ...queryParams }: RoleCreateApiParams
        ): Promise<boolean> {
            const urlParams: UrlParams = {}
            const url = endpointAdmin(urlParams, queryParams)
            console.debug(
                `Creating Role resource:`,
                newResource,
                `on url: ${url}`
            )
            const response = await this.client.post(url, newResource)

            return response.status >= 200 && response.status < 300
        },
        async update(
            this: ApiContext,
            { updatedResource, resourceId, ...queryParams }: RoleUpdateApiParams
        ): Promise<boolean> {
            const urlParams: UrlParams = {
                resourceId,
            }
            const url = endpointAdmin(urlParams, queryParams)
            console.debug(
                `updating Role resource:`,
                updatedResource,
                `on url: ${url}`
            )
            const response = await this.client.put(url, updatedResource)

            return response.status >= 200 && response.status < 300
        },
        async get(
            this: ApiContext,
            { resourceId, ...queryParams }: RoleGetApiParams
        ): Promise<RoleApiResult> {
            const urlParams: UrlParams = {
                resourceId,
            }
            const url = endpointRole(urlParams, queryParams)
            console.debug(`Getting Role with id:`, resourceId, `on url: ${url}`)

            const response = await this.client.get(url)

            return response.data as RoleApiResult
        },
        ...defaultApiContext,
    }
}

export const roleApi = roleApiProto()
